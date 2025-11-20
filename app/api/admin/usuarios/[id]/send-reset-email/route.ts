import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "@/lib/sendgtid";

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

// POST - Admin envia email de reset para usuário
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await ensureAdmin(request);
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const { id: userId } = await params;

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
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
              <p>Você recebeu este email porque um administrador solicitou a redefinição da sua senha.</p>
              <p>Clique no botão abaixo para criar uma nova senha:</p>
              <p style="text-align: center;">
                <a href="${resetUrl}" class="button">Redefinir Senha</a>
              </p>
              <p><strong>Este link expira em 1 hora.</strong></p>
              <p>Se você não solicitou esta redefinição, pode ignorar este email com segurança.</p>
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
      message: "Email de redefinição enviado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao enviar email de reset:", error);
    return NextResponse.json(
      { error: "Erro ao enviar email de redefinição" },
      { status: 500 }
    );
  }
}
