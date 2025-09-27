-- CreateTable
CREATE TABLE "public"."ArquivoAula" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aulaId" TEXT NOT NULL,

    CONSTRAINT "ArquivoAula_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ArquivoAula" ADD CONSTRAINT "ArquivoAula_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "public"."aulas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
