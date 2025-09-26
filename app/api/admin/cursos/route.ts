import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
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

    // Verificar se o usuário é admin
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Acesso negado. Apenas administradores podem acessar." },
        { status: 403 }
      );
    }

    // Buscar todos os cursos
    const cursos = await prisma.curso.findMany({
      include: {
        modulos: {
          include: {
            modulo: {
              select: {
                id: true,
                titulo: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      cursos: cursos.map(curso => ({
        id: curso.id,
        titulo: curso.titulo,
        descricao: curso.descricao,
        instrutor: curso.instrutor,
        categoria: curso.categoria,
        preco: curso.preco,
        status: curso.status,
        thumbnail: curso.thumbnail,
        dataLancamento: curso.createdAt,
        modulos: curso.modulos.map(m => m.modulo.id),
      })),
    });
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
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

    // Verificar se o usuário é admin
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Acesso negado. Apenas administradores podem acessar." },
        { status: 403 }
      );
    }

    const { titulo, descricao, instrutor, categoria, preco, modulosSelecionados } = await req.json();

    if (!titulo || !descricao || !instrutor) {
      return NextResponse.json(
        { error: "Título, descrição e instrutor são obrigatórios" },
        { status: 400 }
      );
    }

    // Criar novo curso
    const novoCurso = await prisma.curso.create({
      data: {
        titulo,
        descricao,
        instrutor,
        categoria: categoria || 'Geral',
        preco: preco ? parseFloat(preco) : 0,
        status: 'ativo',
      },
    });

    // Vincular módulos se fornecidos
    if (modulosSelecionados && modulosSelecionados.length > 0) {
      await prisma.cursoModulo.createMany({
        data: modulosSelecionados.map((moduloId: string, index: number) => ({
          cursoId: novoCurso.id,
          moduloId,
          ordem: index + 1,
        })),
      });
    }

    // Buscar o curso criado com as relações
    const cursoCompleto = await prisma.curso.findUnique({
      where: { id: novoCurso.id },
      include: {
        modulos: {
          include: {
            modulo: {
              select: {
                id: true,
                titulo: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      message: "Curso criado com sucesso",
      curso: {
        id: cursoCompleto!.id,
        titulo: cursoCompleto!.titulo,
        descricao: cursoCompleto!.descricao,
        instrutor: cursoCompleto!.instrutor,
        categoria: cursoCompleto!.categoria,
        preco: cursoCompleto!.preco,
        status: cursoCompleto!.status,
        thumbnail: cursoCompleto!.thumbnail,
        dataLancamento: cursoCompleto!.createdAt,
        modulos: cursoCompleto!.modulos.map(m => m.modulo.id),
      },
    });
  } catch (error) {
    console.error("Erro ao criar curso:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
