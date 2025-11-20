// app/api/upload/svg/route.ts
export const runtime = "nodejs";

import { NextResponse, NextRequest } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Verificar se é admin
async function ensureAdmin(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return { error: NextResponse.json({ error: "Não autenticado" }, { status: 401 }) };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string };
    const userId = decoded.sub;

    // Verificar no banco se o usuário é admin
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== "admin") {
      return { error: NextResponse.json({ error: "Acesso negado. Apenas administradores." }, { status: 403 }) };
    }

    return { userId };
  } catch (error) {
    return { error: NextResponse.json({ error: "Token inválido" }, { status: 401 }) };
  }
}

export async function POST(req: NextRequest) {
  try {
    // Verificar se é admin
    const auth = await ensureAdmin(req);
    if ("error" in auth) {
      return auth.error;
    }

    const BUCKET = process.env.AWS_S3_BUCKET!;
    const formData = await req.formData();
    const file = formData.get("svg") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo SVG recebido" },
        { status: 400 }
      );
    }

    // Validar tipo
    if (file.type !== "image/svg+xml") {
      return NextResponse.json(
        { error: "Apenas arquivos SVG são permitidos" },
        { status: 400 }
      );
    }

    // Ler conteúdo para validar se é SVG válido
    const text = await file.text();
    if (!text.includes("<svg")) {
      return NextResponse.json(
        { error: "O arquivo não parece ser um SVG válido" },
        { status: 400 }
      );
    }

    // Upload para S3
    const bytes = Buffer.from(text);
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `categorias/icons/${timestamp}-${sanitizedName}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: bytes,
        ContentType: "image/svg+xml",
        // ACL removido - o bucket deve ter uma política que permita leitura pública
      })
    );

    const url = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({
      url,
      nome: file.name,
    });
  } catch (err: any) {
    console.error("Erro ao enviar SVG para S3:", err);
    return NextResponse.json(
      { error: err?.message ?? "Falha no upload do SVG" },
      { status: 500 }
    );
  }
}
