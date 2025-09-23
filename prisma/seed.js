const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");
  await prisma.usuarioCursoAula.deleteMany();
  await prisma.usuarioCurso.deleteMany();
  await prisma.anotacao.deleteMany();
  await prisma.favorito.deleteMany();
  await prisma.cursoAvaliacao.deleteMany();
  await prisma.aula.deleteMany();
  await prisma.modulo.deleteMany();
  await prisma.curso.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.userInfo.deleteMany();
  await prisma.user.deleteMany();

  // --- USERS ---
  const admin = await prisma.user.create({
    data: {
      email: "admin@plataforma.com",
      name: "Administrador",
      password: "admin123",
      role: "admin",
      userInfo: {
        create: {
          bio: "Sou o administrador da plataforma",
        },
      },
    },
  });

  const instrutor = await prisma.user.create({
    data: {
      email: "instrutor@plataforma.com",
      name: "Instrutor",
      password: "instrutor123",
      role: "instructor",
      userInfo: {
        create: {
          bio: "Instrutor experiente em tecnologia",
        },
      },
    },
  });

  const aluno = await prisma.user.create({
    data: {
      email: "aluno@plataforma.com",
      name: "Aluno Teste",
      password: "aluno123",
      role: "student",
      userInfo: {
        create: {
          bio: "Sou aluno e gosto de aprender coisas novas",
        },
      },
    },
  });

  // --- CATEGORIAS ---
  const categorias = await prisma.categoria.createMany({
    data: [
      { nome: "Programação", cor: "#3B82F6", icone: "Code" },
      { nome: "Design", cor: "#F59E0B", icone: "Palette" },
      { nome: "Marketing", cor: "#10B981", icone: "TrendingUp" },
    ],
  });

  const categoriasCriadas = await prisma.categoria.findMany();

  // --- CURSOS + MÓDULOS + AULAS ---
  for (let i = 0; i < 3; i++) {
    const curso = await prisma.curso.create({
      data: {
        titulo: `Curso ${i + 1}`,
        descricao: `Descrição do curso ${i + 1}`,
        categoriaId: categoriasCriadas[i].id,
        nivel: i === 0 ? "iniciante" : i === 1 ? "intermediario" : "avancado",
        instrutorId: instrutor.id,
        preco: 100 + i * 50,
        precoOriginal: 200,
        desconto: 50,
        status: "publicado",
        modulos: {
          create: [
            {
              titulo: "Módulo 1",
              ordem: 1,
              aulas: {
                create: [
                  { titulo: "Aula 1", ordem: 1, duracao: "10min" },
                  { titulo: "Aula 2", ordem: 2, duracao: "15min" },
                  { titulo: "Aula 3", ordem: 3, duracao: "20min" },
                ],
              },
            },
            {
              titulo: "Módulo 2",
              ordem: 2,
              aulas: {
                create: [
                  { titulo: "Aula 4", ordem: 1, duracao: "12min" },
                  { titulo: "Aula 5", ordem: 2, duracao: "18min" },
                  { titulo: "Aula 6", ordem: 3, duracao: "25min" },
                ],
              },
            },
          ],
        },
      },
      include: { modulos: { include: { aulas: true } } },
    });

    // Relacionar aluno a alguns cursos
    if (i < 2) {
      const usuarioCurso = await prisma.usuarioCurso.create({
        data: {
          usuarioId: aluno.id,
          cursoId: curso.id,
          status: "em-andamento",
          progresso: i === 0 ? 50 : 20,
        },
      });

      // Vincular aluno a algumas aulas
      await prisma.usuarioCursoAula.createMany({
        data: curso.modulos.flatMap((modulo) =>
          modulo.aulas.map((aula, index) => ({
            usuarioCursoId: usuarioCurso.id,
            aulaId: aula.id,
            assistido: index % 2 === 0, // marca metade como assistida
            ultimaPosicao: index % 2 === 0 ? 120 : 0,
          }))
        ),
      });

      // Avaliação do curso
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
        data: {
          cursoId: curso.id,
          usuarioId: aluno.id,
        },
      });

      // Anotação
      await prisma.anotacao.create({
        data: {
          cursoId: curso.id,
          usuarioId: aluno.id,
          titulo: "Resumo da Aula",
          conteudo: "Lembre-se de revisar o conteúdo!",
          cor: "bg-blue-100",
          corTexto: "text-blue-800",
        },
      });
    }
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
