// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Não revela se o usuário existe
      return NextResponse.json({
        message: "Se este email estiver cadastrado, enviaremos instruções.",
      });
    }

    // Criar token válido por 1h
    const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: "1h" });

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM!, // configurado no seu .env
      subject: "Recupere sua senha",
      html: `
        <p>Olá ${user.name || "usuário"},</p>
        <p>Você solicitou a redefinição de senha. Clique no link abaixo para criar uma nova senha:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>Esse link expira em 1 hora.</p>
        <br/>
        <p>Se você não solicitou, ignore este email.</p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json({
      message: "Instruções enviadas para o email informado.",
    });
  } catch (error) {
    console.error("Erro em forgot-password:", error);
    return NextResponse.json(
      { error: "Erro ao enviar email" },
      { status: 500 }
    );
  }
}
