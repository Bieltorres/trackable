import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verificar token de autenticação
    const token = request.cookies.get("token")?.value;
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
        cursoId: id,
      },
    });

    if (!usuarioCurso) {
      return NextResponse.json(
        { error: "Você não tem acesso a este curso" },
        { status: 403 }
      );
    }

    const curso = await prisma.curso.findUnique({
      where: { id },
      include: {
        categoria: true,
        instrutores: {
          // ✅ CORRIGIDO: plural
          include: {
            instrutor: {
              // ✅ Acessa o instrutor da relação
              select: {
                id: true,
                nome: true, // ✅ CORRIGIDO: "nome"
                bio: true, // ✅ CORRIGIDO: campos corretos
                avatar: true,
                redesSociais: true,
              },
            },
          },
        },
        cursoModulos: {
          // ✅ CORRIGIDO: relação correta
          include: {
            modulo: {
              include: {
                aulaModulos: {
                  include: {
                    aula: true,
                  },
                  orderBy: { id: "asc" }, // ou outro campo de ordem
                },
              },
            },
          },
        },
        _count: {
          select: {
            usuarioCursos: true,
            avaliacoes: true,
          },
        },
      },
    });

    if (!curso) {
      return NextResponse.json(
        { error: "Curso não encontrado" },
        { status: 404 }
      );
    }

    // Ordenar módulos e aulas manualmente no JavaScript
    if (curso.cursoModulos) {
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

    // Calcular média de avaliações
    const avaliacoes = await prisma.cursoAvaliacao.findMany({
      where: { cursoId: curso.id },
      select: { nota: true },
    });

    const mediaAvaliacoes =
      avaliacoes.length > 0
        ? avaliacoes.reduce((sum, av) => sum + av.nota, 0) / avaliacoes.length
        : 0;

    // Buscar algumas avaliações recentes
    const avaliacoesRecentes = await prisma.cursoAvaliacao.findMany({
      where: { cursoId: curso.id },
      include: {
        usuario: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { data: "desc" }, 
      take: 5,
    });

    return NextResponse.json({
      data: {
        ...curso,
        mediaAvaliacoes: Math.round(mediaAvaliacoes * 10) / 10,
        avaliacoesRecentes,
      },
      usuarioCurso,
    });
  } catch (error) {
    console.error("Erro ao buscar curso:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
