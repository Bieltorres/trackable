-- DropForeignKey
ALTER TABLE "public"."cursos" DROP CONSTRAINT "cursos_instrutorId_fkey";

-- AlterTable
ALTER TABLE "public"."cursos" ADD COLUMN     "instrutor" TEXT;
