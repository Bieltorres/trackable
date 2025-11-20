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

// PATCH - Suspender ou reativar matrículas de cursos do usuário
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await ensureAdmin(request);
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const { id: userId } = await params;
    const body = await request.json();
    const { cursoIds, suspenso, reembolsado } = body;

    if (!Array.isArray(cursoIds) || cursoIds.length === 0) {
      return NextResponse.json(
        { error: "Lista de cursos é obrigatória" },
        { status: 400 }
      );
    }

    // Validar que pelo menos um campo foi enviado
    if (suspenso === undefined && reembolsado === undefined) {
      return NextResponse.json(
        { error: "É necessário informar 'suspenso' ou 'reembolsado'" },
        { status: 400 }
      );
    }

    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Preparar dados para atualização
    const updateData: { suspenso?: boolean; reembolsado?: boolean } = {};
    if (suspenso !== undefined) updateData.suspenso = suspenso;
    if (reembolsado !== undefined) updateData.reembolsado = reembolsado;

    // Atualizar o status das matrículas
    const result = await prisma.usuarioCurso.updateMany({
      where: {
        usuarioId: userId,
        cursoId: {
          in: cursoIds,
        },
      },
      data: updateData,
    });

    // Determinar mensagem de sucesso
    let acao = "";
    if (reembolsado !== undefined) {
      acao = reembolsado ? "marcada(s) como reembolsada(s)" : "desmarcada(s) como reembolsada(s)";
    } else if (suspenso !== undefined) {
      acao = suspenso ? "suspensa(s)" : "reativada(s)";
    }

    return NextResponse.json({
      message: `${result.count} matrícula(s) ${acao} com sucesso`,
      updatedCount: result.count,
    });
  } catch (error) {
    console.error("Erro ao atualizar status das matrículas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
