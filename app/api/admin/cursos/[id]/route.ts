// app/api/admin/cursos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar curso por ID com todas as relações
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const curso = await prisma.curso.findUnique({
      where: { id },
      include: {
        categoria: true,
        instrutores: {
          include: {
            instrutor: true,
          },
        },
        cursoModulos: {
          include: {
            modulo: true,
          },
        },
      },
    });

    if (!curso) {
      return NextResponse.json(
        { error: "Curso não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(curso);
  } catch (error) {
    console.error("Erro ao buscar curso:", error);
    return NextResponse.json(
      { error: "Erro ao buscar curso" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar curso
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      titulo,
      descricao,
      thumbnail,
      categoriaId,
      nivel,
      preco,
      precoOriginal,
      desconto,
      status,
      bestseller,
      novo,
      duracaoTotal,
      instrutoresIds,
      modulosSelecionados,
    } = body;

    // Atualizar o curso
    const cursoAtualizado = await prisma.curso.update({
      where: { id },
      data: {
        titulo,
        descricao,
        thumbnail,
        categoriaId,
        nivel,
        preco: preco ? parseFloat(preco) : null,
        precoOriginal: precoOriginal ? parseFloat(precoOriginal) : null,
        desconto: desconto ? parseInt(desconto) : null,
        status,
        bestseller: bestseller === true || bestseller === "true",
        novo: novo === true || novo === "true",
        duracaoTotal,
      },
    });

    // Atualizar relações com instrutores se fornecido
    if (instrutoresIds && Array.isArray(instrutoresIds)) {
      await prisma.cursoInstrutor.deleteMany({
        where: { cursoId: id },
      });

      if (instrutoresIds.length > 0) {
        await prisma.cursoInstrutor.createMany({
          data: instrutoresIds.map((instrutorId: string) => ({
            cursoId: id,
            instrutorId,
          })),
        });
      }
    }

    // Atualizar relações com módulos se fornecido
    if (modulosSelecionados && Array.isArray(modulosSelecionados)) {
      await prisma.cursoModulo.deleteMany({
        where: { cursoId: id },
      });

      if (modulosSelecionados.length > 0) {
        await prisma.cursoModulo.createMany({
          data: modulosSelecionados.map((moduloId: string) => ({
            cursoId: id,
            moduloId,
          })),
        });
      }
    }

    // Buscar curso atualizado com relações
    const cursoCompleto = await prisma.curso.findUnique({
      where: { id },
      include: {
        categoria: true,
        instrutores: {
          include: {
            instrutor: true,
          },
        },
        cursoModulos: {
          include: {
            modulo: {
              include: {
                aulaModulos: true,
              },
            },
          },
        },
        usuarioCursos: true,
      },
    });

    return NextResponse.json(cursoCompleto);
  } catch (error) {
    console.error("Erro ao atualizar curso:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar curso" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar curso
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const cursoExiste = await prisma.curso.findUnique({
      where: { id },
    });

    if (!cursoExiste) {
      return NextResponse.json(
        { error: "Curso não encontrado" },
        { status: 404 }
      );
    }

    await prisma.curso.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Curso deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar curso:", error);
    return NextResponse.json(
      { error: "Erro ao deletar curso" },
      { status: 500 }
    );
  }
}
