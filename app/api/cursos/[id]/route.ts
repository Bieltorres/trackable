import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

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
      usuarioCurso,
    });
  } catch (error) {
    console.error('Erro ao buscar curso:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
