import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; aulaId: string } }
) {
  try {
    const { id: cursoId, aulaId } = params;

    // Verificar token de autenticação
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Token de autenticação não encontrado" },
        { status: 401 }
      );
    }

    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string };
      userId = decoded.sub;
    } catch (error) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 401 }
      );
    }

    // Verificar se o usuário tem acesso ao curso
    const usuarioCurso = await prisma.usuarioCurso.findFirst({
      where: {
        usuarioId: userId,
        cursoId: cursoId,
      },
    });

    if (!usuarioCurso) {
      return NextResponse.json(
        { error: "Você não tem acesso a este curso" },
        { status: 403 }
      );
    }

    // Buscar dados da aula específica
    const aula = await prisma.aula.findFirst({
      where: {
        id: aulaId,
        modulo: {
          cursoId: cursoId,
        },
      },
      include: {
        arquivos: true,
        modulo: {
          include: {
            curso: {
              include: {
                categoria: true,
                instrutor: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
                modulos: {
                  orderBy: { ordem: "asc" },
                  include: {
                    aulas: {
                      orderBy: { ordem: "asc" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!aula) {
      return NextResponse.json(
        { error: "Aula não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      aula,
      curso: aula.modulo.curso,
      usuarioCurso,
    });
  } catch (error) {
    console.error("Erro ao buscar aula:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
