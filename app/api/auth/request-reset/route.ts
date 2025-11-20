import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendEmail } from "@/lib/sendgtid";

// POST - Usuário solicita reset de senha (público)
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    // Buscar usuário por email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true, name: true },
    });

    // Por segurança, sempre retornar sucesso mesmo que o email não exista
    // Isso evita que alguém descubra quais emails estão cadastrados
    if (!user) {
      return NextResponse.json({
        message: "Se o email existir, um link de redefinição será enviado",
      });
    }

    // Gerar token único (guardar antes de fazer hash)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Expira em 1 hora

    // Deletar tokens antigos do usuário
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    // Criar novo token (salvar hash no banco)
    await prisma.passwordResetToken.create({
      data: {
        token: tokenHash,
        userId: user.id,
        expiresAt,
      },
    });

    // URL de reset
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

    // HTML do email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: #3B82F6;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background: #3B82F6;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Redefinir Senha</h1>
            </div>
            <div class="content">
              <p>Olá ${user.name},</p>
              <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>
              <p>Clique no botão abaixo para criar uma nova senha:</p>
              <p style="text-align: center;">
                <a href="${resetUrl}" class="button">Redefinir Senha</a>
              </p>
              <p><strong>Este link expira em 1 hora.</strong></p>
              <p>Se você não solicitou esta redefinição, pode ignorar este email com segurança. Sua senha não será alterada.</p>
              <p>Se o botão não funcionar, copie e cole este link no navegador:</p>
              <p style="word-break: break-all; font-size: 12px;">${resetUrl}</p>
            </div>
            <div class="footer">
              <p>Este é um email automático, por favor não responda.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar email
    await sendEmail(
      user.email,
      "Redefinir sua senha",
      emailHtml
    );

    return NextResponse.json({
      message: "Se o email existir, um link de redefinição será enviado",
    });
  } catch (error) {
    console.error("Erro ao solicitar reset de senha:", error);
    return NextResponse.json(
      { error: "Erro ao processar solicitação" },
      { status: 500 }
    );
  }
}
