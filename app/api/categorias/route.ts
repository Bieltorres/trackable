import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: { nome: "asc" },
      include: {
        _count: {
          select: {
            cursos: true,
          },
        },
      },
    });

    const data = categorias.map((categoria) => ({
      id: categoria.id,
      nome: categoria.nome,
      cor: categoria.cor,
      icone: categoria.icone,
      totalCursos: categoria._count.cursos ?? 0,
    }));

    return NextResponse.json({ categorias: data });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar categorias" },
      { status: 500 }
    );
  }
}
