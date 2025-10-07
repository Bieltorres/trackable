// app/api/upload/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const BUCKET = process.env.AWS_S3_BUCKET!;
    const formData = await req.formData();
    const files = formData.getAll("files") as File[]; // <- plural

    if (!files.length) {
      return NextResponse.json(
        { error: "Nenhum arquivo recebido (files[] vazio)" },
        { status: 400 }
      );
    }

    const uploads = [];
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const key = `uploads/${Date.now()}-${file.name}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: buffer,
          ContentType: file.type || "application/octet-stream",
        })
      );

      uploads.push({
        nome: file.name,
        tipo: file.type || null,
        url: `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
      });
    }

    return NextResponse.json({ uploads });
  } catch (err: any) {
    console.error("Erro ao enviar para S3:", err);
    return NextResponse.json(
      { error: err?.message ?? "Falha no upload" },
      { status: 500 }
    );
  }
}
