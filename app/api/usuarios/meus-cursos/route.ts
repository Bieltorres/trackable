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

    const meusCursos = await prisma.usuarioCurso.findMany({
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
            modulos: {
              include: {
                aulas: true,
              },
            },
          },
        },
      },
      orderBy: { dataInscricao: 'desc' },
    });

    return NextResponse.json({ data: meusCursos });
  } catch (error) {
    console.error('Erro ao buscar meus cursos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
