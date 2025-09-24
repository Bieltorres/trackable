import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const curso = await prisma.curso.findUnique({
      where: { id },
      include: {
        categoria: true,
        instrutor: {
          select: {
            id: true,
            name: true,
            email: true,
            userInfo: {
              select: {
                bio: true,
                avatar: true,
              },
            },
          },
        },
        modulos: {
          include: {
            aulas: {
              orderBy: { ordem: 'asc' },
              select: {
                id: true,
                titulo: true,
                duracao: true,
                ordem: true,
              },
            },
          },
          orderBy: { ordem: 'asc' },
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
        { error: 'Curso não encontrado' },
        { status: 404 }
      );
    }

    // Calcular média de avaliações
    const avaliacoes = await prisma.cursoAvaliacao.findMany({
      where: { cursoId: curso.id },
      select: { nota: true },
    });

    const mediaAvaliacoes = avaliacoes.length > 0
      ? avaliacoes.reduce((sum, av) => sum + av.nota, 0) / avaliacoes.length
      : 0;

    return NextResponse.json({
      data: {
        ...curso,
        mediaAvaliacoes: Math.round(mediaAvaliacoes * 10) / 10,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar curso público:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
