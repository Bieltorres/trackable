// app/api/upload/thumbnail/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";

export async function POST(req: Request) {
  try {
    const BUCKET = process.env.AWS_S3_BUCKET!;
    const formData = await req.formData();
    const file = formData.get("thumbnail") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo recebido" },
        { status: 400 }
      );
    }

    // Validar tipo de imagem
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Apenas arquivos de imagem são permitidos" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Gerar nome único para o arquivo
    const extension = file.name.split(".").pop();
    const key = `thumbnails/${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const url = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("Erro ao enviar thumbnail para S3:", err);
    return NextResponse.json(
      { error: err?.message ?? "Falha no upload" },
      { status: 500 }
    );
  }
}
