/*
  Warnings:

  - You are about to drop the column `moduloId` on the `aulas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."aulas" DROP CONSTRAINT "aulas_moduloId_fkey";

-- AlterTable
ALTER TABLE "public"."aulas" DROP COLUMN "moduloId";

-- CreateTable
CREATE TABLE "public"."aula_modulos" (
    "id" TEXT NOT NULL,
    "aulaId" TEXT NOT NULL,
    "moduloId" TEXT NOT NULL,

    CONSTRAINT "aula_modulos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aula_modulos_aulaId_moduloId_key" ON "public"."aula_modulos"("aulaId", "moduloId");

-- AddForeignKey
ALTER TABLE "public"."aula_modulos" ADD CONSTRAINT "aula_modulos_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "public"."aulas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."aula_modulos" ADD CONSTRAINT "aula_modulos_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "public"."modulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
