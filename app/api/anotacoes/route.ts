import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

async function getUserFromToken(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    throw new Error("Token nao encontrado");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded.id;
  } catch {
    throw new Error("Token invalido");
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request);
    const { searchParams } = new URL(request.url);
    const cursoId = searchParams.get("cursoId");
    const aulaId = searchParams.get("aulaId");

    const anotacoes = await prisma.anotacao.findMany({
      where: {
        usuarioId: userId,
        ...(cursoId ? { cursoId } : {}),
        ...(aulaId ? { aulaId } : {}),
      },
      include: {
        curso: {
          select: {
            id: true,
            titulo: true,
            categoria: {
              select: {
                nome: true,
              },
            },
          },
        },
        aula: {
          select: {
            id: true,
            titulo: true,
          },
        },
      },
      orderBy: { dataCriacao: "desc" },
    });

    return NextResponse.json({ data: anotacoes });
  } catch (error) {
    console.error("Erro ao buscar anotacoes:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request);
    const { titulo, conteudo, cursoId, aulaId, cor, corTexto } =
      await request.json();

    if (!titulo || !conteudo || !cursoId) {
      return NextResponse.json(
        { error: "Campos obrigatorios: titulo, conteudo, cursoId" },
        { status: 400 }
      );
    }

    const novaAnotacao = await prisma.anotacao.create({
      data: {
        titulo,
        conteudo,
        cursoId,
        aulaId: aulaId || null,
        usuarioId: userId,
        cor: cor || "bg-blue-100",
        corTexto: corTexto || "text-blue-800",
      },
      include: {
        curso: {
          select: {
            id: true,
            titulo: true,
            categoria: {
              select: {
                nome: true,
              },
            },
          },
        },
        aula: {
          select: {
            id: true,
            titulo: true,
          },
        },
      },
    });

    return NextResponse.json({ data: novaAnotacao });
  } catch (error) {
    console.error("Erro ao criar anotacao:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

