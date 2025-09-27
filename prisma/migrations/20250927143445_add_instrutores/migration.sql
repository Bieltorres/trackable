/*
  Warnings:

  - You are about to drop the column `instrutor` on the `cursos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."cursos" DROP COLUMN "instrutor";

-- CreateTable
CREATE TABLE "public"."instrutores" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "bio" TEXT,
    "avatar" TEXT,
    "redesSociais" JSONB,

    CONSTRAINT "instrutores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."curso_instrutores" (
    "cursoId" TEXT NOT NULL,
    "instrutorId" TEXT NOT NULL,

    CONSTRAINT "curso_instrutores_pkey" PRIMARY KEY ("cursoId","instrutorId")
);

-- AddForeignKey
ALTER TABLE "public"."curso_instrutores" ADD CONSTRAINT "curso_instrutores_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."cursos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."curso_instrutores" ADD CONSTRAINT "curso_instrutores_instrutorId_fkey" FOREIGN KEY ("instrutorId") REFERENCES "public"."instrutores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
