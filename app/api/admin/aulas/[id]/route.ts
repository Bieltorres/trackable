// app/api/admin/aulas/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar aula por ID com todas as relações
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const aula = await prisma.aula.findUnique({
      where: { id },
      include: {
        aulaModulos: {
          include: {
            modulo: true,
          },
        },
        arquivos: true,
      },
    });

    if (!aula) {
      return NextResponse.json(
        { error: "Aula não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(aula);
  } catch (error) {
    console.error("Erro ao buscar aula:", error);
    return NextResponse.json({ error: "Erro ao buscar aula" }, { status: 500 });
  }
}

// PUT - Atualizar aula
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { titulo, descricao, videoUrl, duracao, ordem, moduloIds, arquivos } =
      body;

    // Atualizar a aula
    const aulaAtualizada = await prisma.aula.update({
      where: { id },
      data: {
        titulo,
        descricao,
        videoUrl,
        duracao,
        ordem: parseInt(ordem),
      },
    });

    // Atualizar relações com módulos se fornecido
    if (moduloIds && Array.isArray(moduloIds)) {
      // Remover todas as relações existentes
      await prisma.aulaModulo.deleteMany({
        where: { aulaId: id },
      });

      // Criar novas relações
      if (moduloIds.length > 0) {
        await prisma.aulaModulo.createMany({
          data: moduloIds.map((moduloId: string) => ({
            aulaId: id,
            moduloId,
          })),
        });
      }
    }

    // Atualizar arquivos se fornecido
    if (arquivos && Array.isArray(arquivos)) {
      // Remover arquivos existentes
      await prisma.arquivoAula.deleteMany({
        where: { aulaId: id },
      });

      // Criar novos arquivos
      if (arquivos.length > 0) {
        const arquivosSanitizados = arquivos
          .map((arquivo: any) => ({
            aulaId: id,
            nome: arquivo?.nome ?? "Arquivo",
            url: arquivo?.url ?? "",
          }))
          .filter(
            (arquivo: { aulaId: string; nome: string; url: string }) =>
              arquivo.url
          );

        if (arquivosSanitizados.length > 0) {
          await prisma.arquivoAula.createMany({
            data: arquivosSanitizados,
          });
        }
      }
    }

    // Buscar aula atualizada com relações
    const aulaCompleta = await prisma.aula.findUnique({
      where: { id },
      include: {
        aulaModulos: {
          include: {
            modulo: true,
          },
        },
        arquivos: true,
      },
    });

    return NextResponse.json(aulaCompleta);
  } catch (error) {
    console.error("Erro ao atualizar aula:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar aula" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar aula
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verificar se a aula existe
    const aulaExiste = await prisma.aula.findUnique({
      where: { id },
    });

    if (!aulaExiste) {
      return NextResponse.json(
        { error: "Aula não encontrada" },
        { status: 404 }
      );
    }

    // Deletar aula (as relações serão deletadas em cascata)
    await prisma.aula.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Aula deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar aula:", error);
    return NextResponse.json(
      { error: "Erro ao deletar aula" },
      { status: 500 }
    );
  }
}
