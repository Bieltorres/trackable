/*
  Warnings:

  - You are about to drop the column `bio` on the `user_infos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_infos" DROP COLUMN "bio",
ADD COLUMN     "genero" TEXT;
