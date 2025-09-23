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

    const anotacoes = await prisma.anotacao.findMany({
      where: { usuarioId: userId },
      include: {
        curso: {
          select: {
            id: true,
            titulo: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ data: anotacoes });
  } catch (error) {
    console.error('Erro ao buscar anotações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request);
    const { titulo, conteudo, cursoId, cor, corTexto } = await request.json();

    if (!titulo || !conteudo || !cursoId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: titulo, conteudo, cursoId' },
        { status: 400 }
      );
    }

    const novaAnotacao = await prisma.anotacao.create({
      data: {
        titulo,
        conteudo,
        cursoId,
        usuarioId: userId,
        cor: cor || 'bg-blue-100',
        corTexto: corTexto || 'text-blue-800',
      },
      include: {
        curso: {
          select: {
            id: true,
            titulo: true,
          },
        },
      },
    });

    return NextResponse.json({ data: novaAnotacao });
  } catch (error) {
    console.error('Erro ao criar anotação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
