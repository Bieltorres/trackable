// app/api/files/download/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { key, filename } = await req.json();

    // 🔐 Faça aqui sua checagem de permissão do usuário à aula/arquivo

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      // Força o navegador a baixar:
      ResponseContentDisposition: `attachment; filename="${
        filename || "arquivo"
      }"`,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 }); // 60s
    return NextResponse.json({ url });
  } catch (e: any) {
    console.error("Erro ao gerar URL de download:", e);
    return NextResponse.json(
      { error: "DOWNLOAD_SIGN_URL_FAILED" },
      { status: 500 }
    );
  }
}
