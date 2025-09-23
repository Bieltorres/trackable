import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function getUserFromToken(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    throw new Error('Token não encontrado');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded.id;
  } catch (error) {
    throw new Error('Token inválido');
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request);

    const favoritos = await prisma.favorito.findMany({
      where: { usuarioId: userId },
      include: {
        curso: {
          include: {
            categoria: true,
            instrutor: {
              select: {
                id: true,
                name: true,
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
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: favoritos });
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request);
    const { cursoId } = await request.json();

    if (!cursoId) {
      return NextResponse.json(
        { error: 'ID do curso é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar se já existe
    const favoritoExistente = await prisma.favorito.findFirst({
      where: {
        usuarioId: userId,
        cursoId: cursoId,
      },
    });

    if (favoritoExistente) {
      // Remover favorito
      await prisma.favorito.delete({
        where: { id: favoritoExistente.id },
      });

      return NextResponse.json({
        message: 'Favorito removido',
        action: 'removed',
        favorito: favoritoExistente,
      });
    } else {
      // Adicionar favorito
      const novoFavorito = await prisma.favorito.create({
        data: {
          usuarioId: userId,
          cursoId: cursoId,
        },
        include: {
          curso: true,
        },
      });

      return NextResponse.json({
        message: 'Favorito adicionado',
        action: 'added',
        favorito: novoFavorito,
      });
    }
  } catch (error) {
    console.error('Erro ao alterar favorito:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
