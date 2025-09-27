import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const modulos = await prisma.modulo.findMany({
      include: {
        // retornar os vínculos módulo↔aula com a aula aninhada (e arquivos da aula)
        aulaModulos: {
          include: {
            aula: {
              include: {
                arquivos: true,
              },
            },
          },
        },
        // manter cursos vinculados
        cursoModulos: {
          include: {
            curso: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ modulos }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar módulos:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar módulos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { titulo, descricao, ordem, aulasSelecionadas, cursosSelecionados } =
      body;

    if (!titulo || !descricao) {
      return NextResponse.json(
        { error: "Título e descrição são obrigatórios" },
        { status: 400 }
      );
    }

    const ordemNumero = Number(ordem);
    if (isNaN(ordemNumero)) {
      return NextResponse.json(
        { error: "A ordem precisa ser um número válido" },
        { status: 400 }
      );
    }

    if (!cursosSelecionados || cursosSelecionados.length === 0) {
      return NextResponse.json(
        { error: "É necessário vincular pelo menos um curso" },
        { status: 400 }
      );
    }

    // cria o módulo
    const novoModulo = await prisma.modulo.create({
      data: {
        titulo,
        descricao,
        ordem: ordemNumero,
      },
    });

    // cria vínculos AulaModulo (se houver)
    if (aulasSelecionadas?.length) {
      const aulaModuloData = aulasSelecionadas.map((aulaId: string) => ({
        aulaId,
        moduloId: novoModulo.id,
      }));
      await prisma.aulaModulo.createMany({
        data: aulaModuloData,
        skipDuplicates: true,
      });
    }

    // cria vínculos CursoModulo
    const cursoModuloData = cursosSelecionados.map((cursoId: string) => ({
      cursoId,
      moduloId: novoModulo.id,
    }));
    await prisma.cursoModulo.createMany({
      data: cursoModuloData,
      skipDuplicates: true,
    });

    // busca o módulo com relacionamentos já populados
    const moduloComCursos = await prisma.modulo.findUnique({
      where: { id: novoModulo.id },
      include: {
        aulaModulos: {
          include: {
            aula: { include: { arquivos: true } },
          },
        },
        cursoModulos: {
          include: { curso: true },
        },
      },
    });

    return NextResponse.json({ modulo: moduloComCursos }, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar módulo:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar módulo" },
      { status: 500 }
    );
  }
}
