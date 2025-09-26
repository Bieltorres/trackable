// app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token e senha são obrigatórios" },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: "Senha precisa ter ao menos 6 caracteres" },
        { status: 400 }
      );
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { token: tokenHash },
    });

    if (!resetRecord) {
      return NextResponse.json(
        { error: "Token inválido ou expirado" },
        { status: 400 }
      );
    }

    if (resetRecord.expiresAt < new Date()) {
      // token expirado: remove o registro e retorna erro
      await prisma.passwordResetToken
        .delete({ where: { id: resetRecord.id } })
        .catch(() => {});
      return NextResponse.json(
        { error: "Token inválido ou expirado" },
        { status: 400 }
      );
    }

    // hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // atualiza senha do usuário
    await prisma.user.update({
      where: { id: resetRecord.userId },
      data: { password: hashedPassword },
    });

    // invalidar token (apagar)
    await prisma.passwordResetToken.delete({
      where: { id: resetRecord.id },
    });

    return NextResponse.json({ message: "Senha atualizada com sucesso" });
  } catch (error) {
    console.error("Erro em reset-password:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
