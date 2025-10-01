// app/api/admin/modulos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar módulo por ID com todas as relações
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const modulo = await prisma.modulo.findUnique({
      where: { id },
      include: {
        aulaModulos: {
          include: {
            aula: true,
          },
        },
        cursoModulos: {
          include: {
            curso: true,
          },
        },
      },
    });

    if (!modulo) {
      return NextResponse.json(
        { error: "Módulo não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(modulo);
  } catch (error) {
    console.error("Erro ao buscar módulo:", error);
    return NextResponse.json(
      { error: "Erro ao buscar módulo" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar módulo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { titulo, descricao, ordem, aulasSelecionadas, cursosSelecionados } =
      body;

    // Atualizar o módulo
    const moduloAtualizado = await prisma.modulo.update({
      where: { id },
      data: {
        titulo,
        descricao,
        ordem: parseInt(ordem) || 0,
      },
    });

    // Atualizar relações com aulas se fornecido
    if (aulasSelecionadas && Array.isArray(aulasSelecionadas)) {
      // Remover todas as relações existentes
      await prisma.aulaModulo.deleteMany({
        where: { moduloId: id },
      });

      // Criar novas relações
      if (aulasSelecionadas.length > 0) {
        await prisma.aulaModulo.createMany({
          data: aulasSelecionadas.map((aulaId: string) => ({
            aulaId,
            moduloId: id,
          })),
        });
      }
    }

    // Atualizar relações com cursos se fornecido
    if (cursosSelecionados && Array.isArray(cursosSelecionados)) {
      // Remover todas as relações existentes
      await prisma.cursoModulo.deleteMany({
        where: { moduloId: id },
      });

      // Criar novas relações
      if (cursosSelecionados.length > 0) {
        await prisma.cursoModulo.createMany({
          data: cursosSelecionados.map((cursoId: string) => ({
            cursoId,
            moduloId: id,
          })),
        });
      }
    }

    // Buscar módulo atualizado com relações
    const moduloCompleto = await prisma.modulo.findUnique({
      where: { id },
      include: {
        aulaModulos: {
          include: {
            aula: true,
          },
        },
        cursoModulos: {
          include: {
            curso: true,
          },
        },
      },
    });

    return NextResponse.json(moduloCompleto);
  } catch (error) {
    console.error("Erro ao atualizar módulo:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar módulo" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar módulo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verificar se o módulo existe
    const moduloExiste = await prisma.modulo.findUnique({
      where: { id },
    });

    if (!moduloExiste) {
      return NextResponse.json(
        { error: "Módulo não encontrado" },
        { status: 404 }
      );
    }

    // Deletar módulo (as relações serão deletadas em cascata)
    await prisma.modulo.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Módulo deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar módulo:", error);
    return NextResponse.json(
      { error: "Erro ao deletar módulo" },
      { status: 500 }
    );
  }
}
