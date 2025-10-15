import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; // sem fallback em prod

export function getUserIdFromRequest(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    const err: any = new Error("Token não encontrado");
    err.status = 401;
    throw err;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      sub?: string;
      id?: string;
      email?: string;
    };
    const userId = decoded.sub || decoded.id; // << chave aqui
    if (!userId) {
      const err: any = new Error("Token inválido (sem id/sub)");
      err.status = 401;
      throw err;
    }
    return userId;
  } catch {
    const err: any = new Error("Token inválido/expirado");
    err.status = 401;
    throw err;
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);

    // GET: listar favoritos com dados do curso
    const favoritos = await prisma.favorito.findMany({
      where: { usuarioId: userId },
      include: {
        curso: {
          include: {
            categoria: true,
            // << ajuste aqui: navegar pela pivô
            instrutores: {
              include: {
                instrutor: { select: { id: true, nome: true } },
              },
            },
            _count: {
              select: {
                usuarioCursos: true,
                avaliacoes: true,
              },
            },
          },
        },
      },
      orderBy: { data: "desc" }, // seu campo no Favorito
    });

    return NextResponse.json({ data: favoritos });
  } catch (err: any) {
    const status = err?.status ?? 500;
    return NextResponse.json(
      { error: err?.message ?? "Erro interno do servidor" },
      { status }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    const { cursoId } = await request.json();
    if (!cursoId) {
      return NextResponse.json(
        { error: "ID do curso é obrigatório" },
        { status: 400 }
      );
    }

    const whereComposite = {
      usuarioId_cursoId: { usuarioId: userId, cursoId },
    };

    const existente = await prisma.favorito.findUnique({
      where: whereComposite,
      include: {
        curso: {
          include: {
            categoria: true,
            instrutores: {
              include: { instrutor: { select: { id: true, nome: true } } },
            },
            _count: { select: { usuarioCursos: true, avaliacoes: true } },
          },
        },
      },
    });

    if (existente) {
      await prisma.favorito.delete({ where: whereComposite });
      return NextResponse.json({ action: "removed", favorito: existente });
    }

    const novo = await prisma.favorito.create({
      data: {
        usuario: { connect: { id: userId } },
        curso: { connect: { id: cursoId } },
      },
      include: {
        curso: {
          include: {
            categoria: true,
            instrutores: {
              include: { instrutor: { select: { id: true, nome: true } } },
            },
            _count: { select: { usuarioCursos: true, avaliacoes: true } },
          },
        },
      },
    });

    return NextResponse.json({ action: "added", favorito: novo });
  } catch (err: any) {
    const status = err?.status ?? 500;
    return NextResponse.json(
      { error: err?.message ?? "Erro interno do servidor" },
      { status }
    );
  }
}
