// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendEmail } from "@/lib/sendgtid";

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

    const genericSuccess = NextResponse.json({
      message:
        "Se esse email estiver cadastrado, você receberá instruções para redefinir a senha.",
    });

    if (!user) {
      return genericSuccess;
    }

    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

    const created = await prisma.passwordResetToken.create({
      data: {
        token: tokenHash, // armazenamos o hash
        userId: user.id,
        expiresAt,
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${rawToken}`;

    try {
      const html = `
        <p>Olá ${user.name ?? "usuário"},</p>
        <p>Você solicitou a redefinição de senha. Clique no link abaixo para criar uma nova senha (válido por 1 hora):</p>
        <p><a href="${resetLink}" target="_blank">${resetLink}</a></p>
        <p>Se você não solicitou, ignore este email.</p>
      `;
      await sendEmail(user.email, "Recuperação de senha", html);
    } catch (err) {
      await prisma.passwordResetToken.delete({
        where: { id: created.id },
      });
      console.error("Erro ao enviar email de recuperação:", err);
      return genericSuccess;
    }

    return genericSuccess;
  } catch (error) {
    console.error("Erro em forgot-password:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
