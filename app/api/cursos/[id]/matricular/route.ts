import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: cursoId } = await params;

    // Verificar autenticação
    const token = request.cookies.get("token")?.value;
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
    } catch (err) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    // Buscar o curso
    const curso = await prisma.curso.findUnique({
      where: { id: cursoId },
      select: {
        id: true,
        titulo: true,
        preco: true,
        gratuito: true,
        status: true,
      },
    });

    if (!curso) {
      return NextResponse.json(
        { error: "Curso não encontrado" },
        { status: 404 }
      );
    }

    // Verificar se o curso está publicado
    if (curso.status !== "publicado") {
      return NextResponse.json(
        { error: "Este curso não está disponível no momento" },
        { status: 400 }
      );
    }

    // Verificar se é gratuito
    const isGratuito = curso.gratuito || !curso.preco || Number(curso.preco) === 0;
    if (!isGratuito) {
      return NextResponse.json(
        { error: "Este curso não é gratuito. É necessário efetuar o pagamento." },
        { status: 400 }
      );
    }

    // Verificar se o usuário já está matriculado
    const matriculaExistente = await prisma.usuarioCurso.findUnique({
      where: {
        usuarioId_cursoId: {
          usuarioId: userId,
          cursoId: cursoId,
        },
      },
    });

    if (matriculaExistente) {
      return NextResponse.json(
        { error: "Você já está matriculado neste curso" },
        { status: 400 }
      );
    }

    // Criar a matrícula
    const matricula = await prisma.usuarioCurso.create({
      data: {
        usuarioId: userId,
        cursoId: cursoId,
        status: "nao-iniciado",
        dataCompra: new Date(),
        precoGago: 0,
        progresso: 0,
        suspenso: false,
        reembolsado: false,
      },
    });

    return NextResponse.json({
      message: "Matrícula realizada com sucesso!",
      matricula: {
        id: matricula.id,
        cursoId: matricula.cursoId,
        status: matricula.status,
      },
    });
  } catch (error) {
    console.error("Erro ao matricular no curso:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
