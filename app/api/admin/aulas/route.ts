import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

async function ensureAdmin(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return { error: NextResponse.json({ error: "Token de autenticação não encontrado" }, { status: 401 }) };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: { role: true },
    });

    if (!user || user.role !== "admin") {
      return { error: NextResponse.json({ error: "Acesso negado. Apenas administradores podem acessar." }, { status: 403 }) };
    }

    return { userId: decoded.sub };
  } catch {
    return { error: NextResponse.json({ error: "Token inválido" }, { status: 401 }) };
  }
}

export async function GET(req: NextRequest) {
  const auth = await ensureAdmin(req);
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const aulas = await prisma.aula.findMany({
      include: {
        arquivos: true,
        aulaModulos: {
          include: {
            modulo: {
              select: { id: true, titulo: true, nomeInterno: true },
            },
          },
        },
      },
      orderBy: { ordem: "asc" },
    });

    return NextResponse.json({
      aulas: aulas.map((aula) => ({
        id: aula.id,
        nomeInterno: aula.nomeInterno,
        titulo: aula.titulo,
        descricao: aula.descricao,
        videoUrl: aula.videoUrl,
        duracao: aula.duracao,
        ordem: aula.ordem,
        arquivos: aula.arquivos,
        modulosVinculados: aula.aulaModulos.map((am) => am.modulo.id),
      })),
    });
  } catch (error) {
    console.error("Erro ao buscar aulas:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await ensureAdmin(req);
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = await req.json();
    const {
      nomeInterno,
      titulo,
      descricao,
      videoUrl,
      duracao,
      ordem,
      modulosSelecionados,
      moduloIds,
      arquivos,
    } = body;

    const modulosParaVincular = Array.isArray(modulosSelecionados)
      ? modulosSelecionados
      : Array.isArray(moduloIds)
      ? moduloIds
      : [];

    const arquivosParaCriar = Array.isArray(arquivos)
      ? arquivos
          .map((arquivo: any) => ({
            nome: arquivo?.nome ?? "Arquivo",
            url: arquivo?.url ?? "",
          }))
          .filter((arquivo) => arquivo.url)
      : [];

    if (!nomeInterno || !titulo || !descricao) {
      return NextResponse.json(
        { error: "Nome interno, título e descrição são obrigatórios" },
        { status: 400 }
      );
    }

    const novaAula = await prisma.aula.create({
      data: {
        nomeInterno,
        titulo,
        descricao,
        videoUrl: videoUrl || null,
        duracao: duracao || null,
        ordem: ordem ? Number(ordem) : 1,
        aulaModulos: modulosParaVincular.length
          ? {
              create: modulosParaVincular.map((moduloId: string) => ({
                modulo: { connect: { id: moduloId } },
              })),
            }
          : undefined,
        arquivos: arquivosParaCriar.length
          ? {
              create: arquivosParaCriar.map((arquivo) => ({
                nome: arquivo.nome,
                url: arquivo.url,
              })),
            }
          : undefined,
      },
      include: {
        arquivos: true,
        aulaModulos: {
          include: {
            modulo: { select: { id: true, titulo: true, nomeInterno: true } },
          },
        },
      },
    });

    return NextResponse.json({
      message: "Aula criada com sucesso",
      aula: {
        id: novaAula.id,
        nomeInterno: novaAula.nomeInterno,
        titulo: novaAula.titulo,
        descricao: novaAula.descricao,
        videoUrl: novaAula.videoUrl,
        duracao: novaAula.duracao,
        ordem: novaAula.ordem,
        arquivos: novaAula.arquivos,
        modulosVinculados: novaAula.aulaModulos.map((m) => m.modulo.id),
      },
    });
  } catch (error) {
    console.error("Erro ao criar aula:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
