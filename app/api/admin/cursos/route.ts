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
        categoria: true,
        modulos: true,
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
        categoria: curso.categoria.nome,
        preco: curso.preco,
        nivel: curso.nivel,
        status: curso.status,
        thumbnail: curso.thumbnail,
        dataLancamento: curso.createdAt,
        modulos: curso.modulos.map(m => m.id),
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

    const { titulo, descricao, instrutor, categoria, preco, nivel, modulosSelecionados } = await req.json();

    if (!titulo || !descricao || !instrutor) {
      return NextResponse.json(
        { error: "Título, descrição e instrutor são obrigatórios" },
        { status: 400 }
      );
    }

    // Validar nível se fornecido
    if (nivel && !['iniciante', 'intermediario', 'avancado'].includes(nivel)) {
      return NextResponse.json(
        { error: "Nível deve ser: iniciante, intermediario ou avancado" },
        { status: 400 }
      );
    }

    // Buscar ou criar categoria
    let categoriaObj = await prisma.categoria.findFirst({
      where: { nome: categoria || 'Geral' }
    });

    if (!categoriaObj) {
      categoriaObj = await prisma.categoria.create({
        data: {
          nome: categoria || 'Geral',
          cor: '#3B82F6',
          icone: 'BookOpen'
        }
      });
    }

    // Criar novo curso
    const novoCurso = await prisma.curso.create({
      data: {
        titulo,
        descricao,
        instrutor,
        categoriaId: categoriaObj.id,
        preco: preco ? parseFloat(preco.toString()) : null,
        nivel: nivel || 'iniciante',
        status: 'publicado',
      },
    });

    // Vincular módulos se fornecidos
    if (modulosSelecionados && modulosSelecionados.length > 0) {
      // Verificar se os módulos existem
      const modulosExistentes = await prisma.modulo.findMany({
        where: {
          id: { in: modulosSelecionados }
        }
      });

      if (modulosExistentes.length > 0) {
        // Atualizar os módulos para pertencerem a este curso
        await prisma.modulo.updateMany({
          where: {
            id: { in: modulosExistentes.map(m => m.id) }
          },
          data: {
            cursoId: novoCurso.id
          }
        });
      }
    }

    // Buscar o curso criado com as relações
    const cursoCompleto = await prisma.curso.findUnique({
      where: { id: novoCurso.id },
      include: {
        categoria: true,
        modulos: true,
      },
    });

    return NextResponse.json({
      message: "Curso criado com sucesso",
      curso: {
        id: cursoCompleto!.id,
        titulo: cursoCompleto!.titulo,
        descricao: cursoCompleto!.descricao,
        instrutor: cursoCompleto!.instrutor,
        categoria: cursoCompleto!.categoria.nome,
        preco: cursoCompleto!.preco,
        nivel: cursoCompleto!.nivel,
        status: cursoCompleto!.status,
        thumbnail: cursoCompleto!.thumbnail,
        dataLancamento: cursoCompleto!.createdAt,
        modulos: cursoCompleto!.modulos.map(m => m.id),
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
