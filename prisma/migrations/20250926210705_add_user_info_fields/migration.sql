-- AlterTable
ALTER TABLE "public"."user_infos" ADD COLUMN     "cep" TEXT,
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "estado" TEXT,
ADD COLUMN     "pais" TEXT DEFAULT 'Brasil',
ADD COLUMN     "rua" TEXT;
