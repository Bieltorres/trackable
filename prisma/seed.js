// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // --- LIMPEZA (ordem segura com seus onDelete) ---
  await prisma.usuarioCursoAula.deleteMany();
  await prisma.cursoAvaliacao.deleteMany();
  await prisma.favorito.deleteMany();
  await prisma.anotacao.deleteMany();
  await prisma.arquivoAula.deleteMany();
  await prisma.aulaModulo.deleteMany();
  await prisma.cursoModulo.deleteMany();
  await prisma.cursoInstrutor.deleteMany();
  await prisma.aula.deleteMany();
  await prisma.modulo.deleteMany();
  await prisma.curso.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.userInfo.deleteMany();
  await prisma.user.deleteMany();
  await prisma.instrutor.deleteMany();

  // --- USERS ---
  const admin = await prisma.user.create({
    data: {
      email: "admin@plataforma.com",
      name: "Administrador",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
      userInfo: { create: { genero: "masculino" } },
    },
  });

  const instrutorUser = await prisma.user.create({
    data: {
      email: "instrutor@plataforma.com",
      name: "Instrutor",
      password: await bcrypt.hash("instrutor123", 10),
      role: "instructor",
      userInfo: { create: { genero: "masculino" } },
    },
  });

  const aluno = await prisma.user.create({
    data: {
      email: "aluno@plataforma.com",
      name: "Aluno Teste",
      password: await bcrypt.hash("aluno123", 10),
      role: "student",
      userInfo: {
        create: { genero: "feminino" },
      },
    },
  });

  // --- INSTRUTOR (modelo separado do User) ---
  const instrutor = await prisma.instrutor.create({
    data: {
      nome: instrutorUser.name,
      bio: "Bio do instrutor do modelo Instrutor",
      avatar: null,
      redesSociais: { linkedin: "https://linkedin.com/in/exemplo" },
    },
  });

  // --- CATEGORIAS ---
  await prisma.categoria.createMany({
    data: [
      { nome: "Programação", cor: "#3B82F6", icone: "Code" },
      { nome: "Design", cor: "#F59E0B", icone: "Palette" },
      { nome: "Marketing", cor: "#10B981", icone: "TrendingUp" },
    ],
  });
  const categorias = await prisma.categoria.findMany(); // pega ids

  // --- CURSOS + MODULOS + AULAS (via pivots) ---
  for (let i = 0; i < 3; i++) {
    // Curso
    const curso = await prisma.curso.create({
      data: {
        nomeInterno: `curso_${i + 1}`,
        titulo: `Curso ${i + 1}`,
        descricao: `Descrição do curso ${i + 1}`,
        categoriaId: categorias[i].id,
        nivel: i === 0 ? "iniciante" : i === 1 ? "intermediario" : "avancado",
        gratuito: i === 0, // Primeiro curso é gratuito
        preco: i === 0 ? null : (100 + i * 50).toString(), // Gratuito não tem preço
        precoOriginal: i === 0 ? null : "200",
        desconto: i === 0 ? null : 50,
        status: "publicado",
        bestseller: false,
        novo: i === 2, // só pra variar
      },
    });

    // Relaciona instrutor (N:N) via pivot CursoInstrutor
    await prisma.cursoInstrutor.create({
      data: { cursoId: curso.id, instrutorId: instrutor.id },
    });

    // Cria 2 módulos
    const modulo1 = await prisma.modulo.create({
      data: {
        nomeInterno: "modulo_1",
        titulo: "Módulo 1",
        ordem: 1,
        descricao: "Introdução",
      },
    });
    const modulo2 = await prisma.modulo.create({
      data: {
        nomeInterno: "modulo_2",
        titulo: "Módulo 2",
        ordem: 2,
        descricao: "Conteúdo",
      },
    });

    // Liga curso <-> módulos (pivot CursoModulo)
    await prisma.cursoModulo.createMany({
      data: [
        { cursoId: curso.id, moduloId: modulo1.id },
        { cursoId: curso.id, moduloId: modulo2.id },
      ],
    });

    // Aulas para cada módulo
    const aulasM1 = [];
    for (let j = 1; j <= 3; j++) {
      const aula = await prisma.aula.create({
        data: {
          nomeInterno: `mod${i + 1}_aula_${j}`,
          titulo: `Aula ${j}`,
          ordem: j,
          duracao: `${10 + 5 * (j - 1)}min`,
        },
      });
      aulasM1.push(aula);
      await prisma.aulaModulo.create({
        data: { aulaId: aula.id, moduloId: modulo1.id },
      });
    }

    const aulasM2 = [];
    for (let j = 1; j <= 3; j++) {
      const aula = await prisma.aula.create({
        data: {
          nomeInterno: `mod${i + 1}_aula_${j + 3}`,
          titulo: `Aula ${j + 3}`,
          ordem: j,
          duracao: `${12 + 6 * (j - 1)}min`,
        },
      });
      aulasM2.push(aula);
      await prisma.aulaModulo.create({
        data: { aulaId: aula.id, moduloId: modulo2.id },
      });
    }

    // Relaciona aluno ao curso
    const usuarioCurso = await prisma.usuarioCurso.create({
      data: {
        usuarioId: aluno.id,
        cursoId: curso.id,
        status: "em-andamento",
        progresso: i === 0 ? 50 : 20,
      },
    });

    // Marca progresso do aluno em algumas aulas (UsuarioCursoAula)
    const todasAulas = [...aulasM1, ...aulasM2];
    await prisma.usuarioCursoAula.createMany({
      data: todasAulas.map((a, idx) => ({
        usuarioCursoId: usuarioCurso.id,
        aulaId: a.id,
        assistido: idx % 2 === 0,
        ultimaPosicao: idx % 2 === 0 ? 120 : 0,
      })),
    });

    // Avaliação
    await prisma.cursoAvaliacao.create({
      data: {
        cursoId: curso.id,
        usuarioId: aluno.id,
        nota: 4,
        comentario: "Curso muito bom!",
      },
    });

    // Favorito
    await prisma.favorito.create({
      data: { cursoId: curso.id, usuarioId: aluno.id },
    });

  }

  console.log("✅ Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
