import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return NextResponse.json({
      data: {
        ...curso,
        mediaAvaliacoes: Math.round(mediaAvaliacoes * 10) / 10,
        avaliacoesRecentes,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar curso:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
