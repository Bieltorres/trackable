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

    // Buscar todos os cursos com relacionamentos
    const cursos = await prisma.curso.findMany({
      include: {
        categoria: true,
        cursoModulos: { include: { modulo: true } },
        instrutores: { include: { instrutor: true } },
        usuarioCursos: true, //  para contar alunos
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      cursos: cursos.map((curso) => ({
        id: curso.id,
        nomeInterno: curso.nomeInterno,
        titulo: curso.titulo,
        descricao: curso.descricao,
        categoria: curso.categoria?.nome,
        instrutores: curso.instrutores.map((ci) => ci.instrutor.nome) || [],
        gratuito: curso.gratuito,
        preco: curso.preco,
        precoOriginal: curso.precoOriginal,
        desconto: curso.desconto,
        nivel: curso.nivel,
        status: curso.status,
        thumbnail: curso.thumbnail,
        dataLancamento: curso.createdAt,
        modulos: curso.cursoModulos.map((cm) => ({
          id: cm.modulo.id,
          nomeInterno: cm.modulo.nomeInterno,
          titulo: cm.modulo.titulo,
        })),
        totalModulos: curso.cursoModulos.length,
        totalAlunos: curso.usuarioCursos.length,
      })),
    });
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar cursos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
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
    } catch {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

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

    type CursoRequest = {
      nomeInterno: string;
      titulo: string;
      descricao: string;
      categoriaId: string;
      instrutoresIds: string[];
      modulosSelecionados?: string[];
      gratuito: boolean;
      preco?: number;
      precoOriginal?: number;
      desconto?: number;
      nivel: string;
      status?: string;
      thumbnail?: string;
    };

    const {
      nomeInterno,
      titulo,
      descricao,
      categoriaId,
      instrutoresIds,
      modulosSelecionados = [],
      gratuito,
      preco,
      precoOriginal,
      desconto,
      nivel,
      status,
      thumbnail,
    }: CursoRequest = await req.json();

    if (
      !nomeInterno ||
      !titulo ||
      !descricao ||
      !categoriaId ||
      !instrutoresIds?.length ||
      !nivel
    ) {
      return NextResponse.json(
        {
          error:
            "Nome interno, título, descrição, categoria, nível e pelo menos 1 instrutor são obrigatórios",
        },
        { status: 400 }
      );
    }

    // Validar curso pago deve ter preço
    if (!gratuito && (!preco || preco <= 0)) {
      return NextResponse.json(
        { error: "Cursos pagos devem ter um preço maior que zero" },
        { status: 400 }
      );
    }

    const novoCurso = await prisma.curso.create({
      data: {
        nomeInterno,
        titulo,
        descricao,
        nivel,
        categoria: { connect: { id: categoriaId } },
        gratuito,
        preco: gratuito ? null : preco,
        precoOriginal: gratuito ? null : precoOriginal,
        desconto: gratuito ? null : desconto,
        status: status ?? "publicado",
        thumbnail,
        instrutores: {
          create: instrutoresIds.map((id) => ({
            instrutor: { connect: { id } },
          })),
        },
        // cria vínculos na tabela pivot
        cursoModulos: modulosSelecionados.length
          ? {
              create: modulosSelecionados.map((id) => ({
                modulo: { connect: { id } },
              })),
            }
          : undefined,
      },
    });

    return NextResponse.json({ curso: novoCurso });
  } catch (error) {
    console.error("Erro ao criar curso:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar curso" },
      { status: 500 }
    );
  }
}
