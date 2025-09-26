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

    // Buscar todos os módulos
    const modulos = await prisma.modulo.findMany({
      include: {
        aulas: {
          include: {
            aula: {
              select: {
                id: true,
                titulo: true,
              },
            },
          },
        },
        cursos: {
          include: {
            curso: {
              select: {
                id: true,
                titulo: true,
              },
            },
          },
        },
      },
      orderBy: {
        ordem: 'asc',
      },
    });

    return NextResponse.json({
      modulos: modulos.map(modulo => ({
        id: modulo.id,
        titulo: modulo.titulo,
        descricao: modulo.descricao,
        ordem: modulo.ordem,
        aulas: modulo.aulas.map(a => a.aula.id),
        cursosVinculados: modulo.cursos.map(c => c.curso.id),
      })),
    });
  } catch (error) {
    console.error("Erro ao buscar módulos:", error);
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

    const { titulo, descricao, aulasSelecionadas, ordem } = await req.json();

    if (!titulo || !descricao) {
      return NextResponse.json(
        { error: "Título e descrição são obrigatórios" },
        { status: 400 }
      );
    }

    // Criar novo módulo
    const novoModulo = await prisma.modulo.create({
      data: {
        titulo,
        descricao,
        ordem: ordem || 1,
      },
    });

    // Vincular aulas se fornecidas
    if (aulasSelecionadas && aulasSelecionadas.length > 0) {
      await prisma.aulaModulo.createMany({
        data: aulasSelecionadas.map((aulaId: string, index: number) => ({
          aulaId,
          moduloId: novoModulo.id,
          ordem: index + 1,
        })),
      });
    }

    // Buscar o módulo criado com as relações
    const moduloCompleto = await prisma.modulo.findUnique({
      where: { id: novoModulo.id },
      include: {
        aulas: {
          include: {
            aula: {
              select: {
                id: true,
                titulo: true,
              },
            },
          },
        },
        cursos: {
          include: {
            curso: {
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
      message: "Módulo criado com sucesso",
      modulo: {
        id: moduloCompleto!.id,
        titulo: moduloCompleto!.titulo,
        descricao: moduloCompleto!.descricao,
        ordem: moduloCompleto!.ordem,
        aulas: moduloCompleto!.aulas.map(a => a.aula.id),
        cursosVinculados: moduloCompleto!.cursos.map(c => c.curso.id),
      },
    });
  } catch (error) {
    console.error("Erro ao criar módulo:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
