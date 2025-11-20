import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

async function ensureAdmin(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return {
      error: NextResponse.json(
        { error: "Token de autenticação não encontrado" },
        { status: 401 }
      ),
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      sub: string;
    };
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: { role: true },
    });

    if (!user || user.role !== "admin") {
      return {
        error: NextResponse.json(
          { error: "Acesso negado. Apenas administradores." },
          { status: 403 }
        ),
      };
    }

    return { userId: decoded.sub };
  } catch (error) {
    return {
      error: NextResponse.json({ error: "Token inválido" }, { status: 401 }),
    };
  }
}

// GET - Buscar categoria por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("🔍 GET /api/admin/categorias/[id] chamado");
  console.log("🍪 Cookies:", request.cookies.getAll());

  const auth = await ensureAdmin(request);
  if ("error" in auth) {
    console.log("❌ Falha na autenticação admin");
    return auth.error;
  }

  console.log("✅ Autenticação admin OK, userId:", auth.userId);

  try {
    const { id } = await params;
    console.log("📝 Buscando categoria com ID:", id);

    const categoria = await prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoria) {
      console.log("❌ Categoria não encontrada");
      return NextResponse.json(
        { error: "Categoria não encontrada" },
        { status: 404 }
      );
    }

    console.log("✅ Categoria encontrada:", categoria.nome);
    return NextResponse.json({ categoria });
  } catch (error) {
    console.error("❌ Erro ao buscar categoria:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar categoria
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await ensureAdmin(request);
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { nome, cor, icone, customSvgUrl } = body;

    if (!nome) {
      return NextResponse.json(
        { error: "Nome da categoria é obrigatório" },
        { status: 400 }
      );
    }

    // Verificar se a categoria existe
    const categoriaExiste = await prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoriaExiste) {
      return NextResponse.json(
        { error: "Categoria não encontrada" },
        { status: 404 }
      );
    }

    // Verificar se já existe outra categoria com esse nome
    const categoriaComMesmoNome = await prisma.categoria.findFirst({
      where: {
        nome,
        id: { not: id },
      },
    });

    if (categoriaComMesmoNome) {
      return NextResponse.json(
        { error: "Já existe uma categoria com esse nome" },
        { status: 400 }
      );
    }

    const categoriaAtualizada = await prisma.categoria.update({
      where: { id },
      data: {
        nome,
        cor: cor || categoriaExiste.cor,
        icone: icone || categoriaExiste.icone,
        customSvgUrl: customSvgUrl !== undefined ? customSvgUrl : categoriaExiste.customSvgUrl,
      },
    });

    return NextResponse.json({ categoria: categoriaAtualizada });
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar categoria
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await ensureAdmin(request);
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const { id } = await params;

    // Verificar se a categoria existe
    const categoriaExiste = await prisma.categoria.findUnique({
      where: { id },
      include: {
        cursos: true,
      },
    });

    if (!categoriaExiste) {
      return NextResponse.json(
        { error: "Categoria não encontrada" },
        { status: 404 }
      );
    }

    // Verificar se há cursos vinculados
    if (categoriaExiste.cursos.length > 0) {
      return NextResponse.json(
        {
          error: `Não é possível deletar esta categoria pois existem ${categoriaExiste.cursos.length} curso(s) vinculado(s)`,
        },
        { status: 400 }
      );
    }

    await prisma.categoria.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
