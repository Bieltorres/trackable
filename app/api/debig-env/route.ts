export const runtime = "nodejs";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET ?? null,
    AWS_REGION: process.env.AWS_REGION ?? null,
    ACCESS_KEY_SET: Boolean(process.env.AWS_ACCESS_KEY_ID),
    SECRET_KEY_SET: Boolean(process.env.AWS_SECRET_ACCESS_KEY),
  });
}
