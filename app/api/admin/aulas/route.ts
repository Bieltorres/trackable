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
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        sub: string;
      };
      userId = decoded.sub;
    } catch (error) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
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

    // Buscar todas as aulas
    // GET
    const aulas = await prisma.aula.findMany({
      include: {
        arquivos: true,
        aulaModulos: {
          include: {
            modulo: {
              select: { id: true, titulo: true },
            },
          },
        },
      },
      orderBy: { ordem: "asc" },
    });

    return NextResponse.json({
      aulas: aulas.map((aula) => ({
        id: aula.id,
        titulo: aula.titulo,
        descricao: aula.descricao,
        videoUrl: aula.videoUrl,
        duracao: aula.duracao,
        ordem: aula.ordem,
        arquivos: aula.arquivos,
        modulosVinculados: aula.aulaModulos.map((am) => am.modulo.id), // 👈 corrigido
      })),
    });
  } catch (error) {
    console.error("Erro ao buscar aulas:", error);
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
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        sub: string;
      };
      userId = decoded.sub;
    } catch (error) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
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

    const {
      titulo,
      descricao,
      videoUrl,
      duracao,
      ordem,
      modulosSelecionados,
      arquivos,
    } = await req.json();

    if (!titulo || !descricao) {
      return NextResponse.json(
        { error: "Título e descrição são obrigatórios" },
        { status: 400 }
      );
    }

    // Criar nova aula
    const novaAula = await prisma.aula.create({
      data: {
        titulo,
        descricao,
        videoUrl: videoUrl || null,
        duracao: duracao || null,
        ordem: ordem ? Number(ordem) : 1,

        aulaModulos: modulosSelecionados?.length
          ? {
              create: modulosSelecionados.map((moduloId: string) => ({
                modulo: { connect: { id: moduloId } },
              })),
            }
          : undefined,

        arquivos: arquivos?.length
          ? {
              create: arquivos.map((arq: any) => ({
                nome: arq.nome,
                tipo: arq.tipo,
                url: arq.url,
              })),
            }
          : undefined,
      },
      include: {
        arquivos: true,
        aulaModulos: {
          // 👈 corrigido
          include: {
            modulo: { select: { id: true, titulo: true } },
          },
        },
      },
    });

    return NextResponse.json({
      message: "Aula criada com sucesso",
      aula: {
        id: novaAula.id,
        titulo: novaAula.titulo,
        descricao: novaAula.descricao,
        videoUrl: novaAula.videoUrl,
        duracao: novaAula.duracao,
        ordem: novaAula.ordem,
        arquivos: novaAula.arquivos,
        modulosVinculados: novaAula.aulaModulos.map((m) => m.modulo.id), // 👈 corrigido
      },
    });
  } catch (error) {
    console.error("Erro ao criar aula:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
