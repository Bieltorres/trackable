/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3),
    "phone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'student',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_infos" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "avatar" TEXT,
    "redesSociais" JSONB,

    CONSTRAINT "user_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categorias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL DEFAULT '#3B82F6',
    "icone" TEXT NOT NULL DEFAULT 'BookOpen',

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cursos" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "thumbnail" TEXT,
    "categoriaId" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "instrutorId" TEXT NOT NULL,
    "preco" DECIMAL(10,2),
    "precoOriginal" DECIMAL(10,2),
    "desconto" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'rascunho',
    "bestseller" BOOLEAN NOT NULL DEFAULT false,
    "novo" BOOLEAN NOT NULL DEFAULT false,
    "duracaoTotal" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."modulos" (
    "id" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,

    CONSTRAINT "modulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."aulas" (
    "id" TEXT NOT NULL,
    "moduloId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "videoUrl" TEXT,
    "ordem" INTEGER NOT NULL,
    "duracao" TEXT,

    CONSTRAINT "aulas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."usuario_cursos" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'nao-iniciado',
    "dataInicio" TIMESTAMP(3),
    "dataCompra" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "precoGago" DECIMAL(10,2),
    "progresso" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "usuario_cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."usuario_curso_aulas" (
    "id" TEXT NOT NULL,
    "usuarioCursoId" TEXT NOT NULL,
    "aulaId" TEXT NOT NULL,
    "assistido" BOOLEAN NOT NULL DEFAULT false,
    "dataAssistido" TIMESTAMP(3),
    "ultimaPosicao" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "usuario_curso_aulas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."curso_avaliacoes" (
    "id" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "curso_avaliacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."anotacoes" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "aulaId" TEXT,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "cor" TEXT NOT NULL DEFAULT 'bg-yellow-100',
    "corTexto" TEXT NOT NULL DEFAULT 'text-yellow-800',
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "anotacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."favoritos" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favoritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."config_pagamentos" (
    "id" TEXT NOT NULL,
    "gateway" TEXT NOT NULL,
    "chavePublica" TEXT NOT NULL,
    "chaveSecreta" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "config_pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_infos_userId_key" ON "public"."user_infos"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "public"."categorias"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cursos_usuarioId_cursoId_key" ON "public"."usuario_cursos"("usuarioId", "cursoId");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_curso_aulas_usuarioCursoId_aulaId_key" ON "public"."usuario_curso_aulas"("usuarioCursoId", "aulaId");

-- CreateIndex
CREATE UNIQUE INDEX "curso_avaliacoes_cursoId_usuarioId_key" ON "public"."curso_avaliacoes"("cursoId", "usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "favoritos_usuarioId_cursoId_key" ON "public"."favoritos"("usuarioId", "cursoId");

-- AddForeignKey
ALTER TABLE "public"."user_infos" ADD CONSTRAINT "user_infos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cursos" ADD CONSTRAINT "cursos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cursos" ADD CONSTRAINT "cursos_instrutorId_fkey" FOREIGN KEY ("instrutorId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."modulos" ADD CONSTRAINT "modulos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."aulas" ADD CONSTRAINT "aulas_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "public"."modulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."usuario_cursos" ADD CONSTRAINT "usuario_cursos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."usuario_cursos" ADD CONSTRAINT "usuario_cursos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."usuario_curso_aulas" ADD CONSTRAINT "usuario_curso_aulas_usuarioCursoId_fkey" FOREIGN KEY ("usuarioCursoId") REFERENCES "public"."usuario_cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."usuario_curso_aulas" ADD CONSTRAINT "usuario_curso_aulas_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "public"."aulas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."curso_avaliacoes" ADD CONSTRAINT "curso_avaliacoes_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."curso_avaliacoes" ADD CONSTRAINT "curso_avaliacoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."anotacoes" ADD CONSTRAINT "anotacoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."anotacoes" ADD CONSTRAINT "anotacoes_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."anotacoes" ADD CONSTRAINT "anotacoes_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "public"."aulas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."favoritos" ADD CONSTRAINT "favoritos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."favoritos" ADD CONSTRAINT "favoritos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
