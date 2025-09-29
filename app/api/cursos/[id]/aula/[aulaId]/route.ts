import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; aulaId: string }> }
) {
  try {
    const { id: cursoId, aulaId } = await params;

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
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        sub: string;
      };
      userId = decoded.sub;
    } catch (error) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
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

    // Buscar aula com suas relações corretas
    const aula = await prisma.aula.findUnique({
      where: { id: aulaId },
      include: {
        aulaModulos: {
          include: {
            modulo: {
              include: {
                cursoModulos: {
                  where: { cursoId: cursoId },
                  include: {
                    curso: {
                      include: {
                        categoria: true,
                        instrutores: {
                          include: {
                            instrutor: {
                              select: {
                                id: true,
                                nome: true,
                                bio: true,
                                avatar: true,
                                redesSociais: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        arquivos: true,
      },
    });

    if (!aula) {
      return NextResponse.json(
        { error: "Aula não encontrada" },
        { status: 404 }
      );
    }

    // Verificar se a aula pertence ao curso
    const pertenceAoCurso = aula.aulaModulos.some((am) =>
      am.modulo.cursoModulos.some((cm) => cm.cursoId === cursoId)
    );

    if (!pertenceAoCurso) {
      return NextResponse.json(
        { error: "Esta aula não pertence ao curso especificado" },
        { status: 403 }
      );
    }

    // Buscar o curso completo com módulos e aulas ordenados
    const curso = await prisma.curso.findUnique({
      where: { id: cursoId },
      include: {
        categoria: true,
        instrutores: {
          include: {
            instrutor: {
              select: {
                id: true,
                nome: true,
                bio: true,
                avatar: true,
                redesSociais: true,
              },
            },
          },
        },
        cursoModulos: {
          include: {
            modulo: {
              include: {
                aulaModulos: {
                  include: {
                    aula: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Ordenar módulos e aulas
    if (curso?.cursoModulos) {
      curso.cursoModulos.sort(
        (a, b) => (a.modulo?.ordem || 0) - (b.modulo?.ordem || 0)
      );

      curso.cursoModulos.forEach((cm) => {
        if (cm.modulo?.aulaModulos) {
          cm.modulo.aulaModulos.sort(
            (a, b) => (a.aula?.ordem || 0) - (b.aula?.ordem || 0)
          );
        }
      });
    }

    // Buscar progresso da aula atual
    const progressoAula = await prisma.usuarioCursoAula.findFirst({
      where: {
        usuarioCursoId: usuarioCurso.id,
        aulaId: aulaId,
      },
    });

    return NextResponse.json({
      aula,
      curso,
      usuarioCurso,
      progressoAula: progressoAula || null,
    });
  } catch (error) {
    console.error("Erro ao buscar aula:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
