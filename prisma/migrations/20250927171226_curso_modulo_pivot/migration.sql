-- DropForeignKey
ALTER TABLE "public"."modulos" DROP CONSTRAINT "modulos_cursoId_fkey";

-- CreateTable
CREATE TABLE "public"."curso_modulos" (
    "cursoId" TEXT NOT NULL,
    "moduloId" TEXT NOT NULL,

    CONSTRAINT "curso_modulos_pkey" PRIMARY KEY ("cursoId","moduloId")
);

-- AddForeignKey
ALTER TABLE "public"."curso_modulos" ADD CONSTRAINT "curso_modulos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."curso_modulos" ADD CONSTRAINT "curso_modulos_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "public"."modulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
