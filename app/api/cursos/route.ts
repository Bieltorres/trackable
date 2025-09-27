import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria");
    const nivel = searchParams.get("nivel");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: any = {
      status: "publicado",
    };

    if (categoria) {
      where.categoria = {
        nome: categoria,
      };
    }

    if (nivel) {
      where.nivel = nivel;
    }

    if (search) {
      where.OR = [
        { titulo: { contains: search, mode: "insensitive" } },
        { descricao: { contains: search, mode: "insensitive" } },
      ];
    }

    const [cursos, total] = await Promise.all([
      prisma.curso.findMany({
        where,
        include: {
          categoria: true,
          _count: {
            select: {
              usuarioCursos: true,
              avaliacoes: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.curso.count({ where }),
    ]);

    // Calcular média de avaliações para cada curso
    const cursosComMedia = await Promise.all(
      cursos.map(async (curso) => {
        const avaliacoes = await prisma.cursoAvaliacao.findMany({
          where: { cursoId: curso.id },
          select: { nota: true },
        });

        const mediaAvaliacoes =
          avaliacoes.length > 0
            ? avaliacoes.reduce((sum, av) => sum + av.nota, 0) /
              avaliacoes.length
            : 0;

        return {
          ...curso,
          mediaAvaliacoes: Math.round(mediaAvaliacoes * 10) / 10,
        };
      })
    );

    return NextResponse.json({
      data: cursosComMedia,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
