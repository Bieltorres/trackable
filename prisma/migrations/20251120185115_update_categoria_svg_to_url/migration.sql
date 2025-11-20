/*
  Warnings:

  - You are about to drop the column `customSvg` on the `categorias` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."categorias" DROP COLUMN "customSvg",
ADD COLUMN     "customSvgUrl" TEXT;
