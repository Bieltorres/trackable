// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password, birthdate, phone } = await req.json();

    // validação básica
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
    }

    // verifica se o usuário já existe
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
    }

    // cria usuário
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashedPassword, 
        birthdate: birthdate ? new Date(birthdate) : null, 
        phone 
      },
      select: { id: true, name: true, email: true, birthdate: true, phone: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
  }
}
