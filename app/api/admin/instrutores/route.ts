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

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      const user = await prisma.user.findUnique({
        where: { email: decoded.email },
        select: { role: true },
      });

      console.log("user", user);

      if (user?.role !== "admin") {
        return NextResponse.json(
          { error: "Acesso negado. Apenas administradores." },
          { status: 403 }
        );
      }
    } catch (error) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const instrutores = await prisma.instrutor.findMany({
      orderBy: {
        nome: "asc",
      },
    });

    return NextResponse.json({ instrutores });
  } catch (error) {
    console.error("Erro ao buscar instrutores:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Verificar token de autenticação
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Token de autenticação não encontrado" },
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      const user = await prisma.user.findUnique({
        where: { email: decoded.email },
        select: { role: true },
      });

      console.log("user", user);

      if (user?.role !== "admin") {
        return NextResponse.json(
          { error: "Acesso negado. Apenas administradores." },
          { status: 403 }
        );
      }
    } catch (error) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const { nome, bio, avatar, redesSociais } = await req.json();

    if (!nome) {
      return NextResponse.json(
        { error: "Nome do instrutor é obrigatório" },
        { status: 400 }
      );
    }

    const instrutor = await prisma.instrutor.create({
      data: {
        nome,
        bio,
        avatar,
        redesSociais,
      },
    });

    return NextResponse.json({ instrutor });
  } catch (error) {
    console.error("Erro ao criar instrutor:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
