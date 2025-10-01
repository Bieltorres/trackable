import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Função auxiliar para converter duração "HH:MM:SS" ou "MM:SS" em segundos
function durationToSeconds(duration: string | null): number {
  if (!duration) return 0;

  const parts = duration.split(":").map(Number);

  if (parts.length === 3) {
    // HH:MM:SS
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    // MM:SS
    return parts[0] * 60 + parts[1];
  }

  return 0;
}

// Função auxiliar para converter segundos em formato "Xh Ymin"
function secondsToHumanReadable(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}min`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}min`;
  }

  return "0min";
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria");
    const nivel = searchParams.get("nivel");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: any = {
      status: "publicado",
    };

    if (categoria) {
      where.categoria = {
        nome: categoria,
      };
    }

    if (nivel) {
      where.nivel = nivel;
    }

    if (search) {
      where.OR = [
        { titulo: { contains: search, mode: "insensitive" } },
        { descricao: { contains: search, mode: "insensitive" } },
      ];
    }

    const [cursos, total] = await Promise.all([
      prisma.curso.findMany({
        where,
        include: {
          categoria: true,
          _count: {
            select: {
              usuarioCursos: true,
              avaliacoes: true,
            },
          },
          cursoModulos: {
            include: {
              modulo: {
                include: {
                  aulaModulos: {
                    include: {
                      aula: {
                        select: {
                          id: true,
                          duracao: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.curso.count({ where }),
    ]);

    // Calcular média de avaliações, quantidade de aulas e duração total
    const cursosComDados = await Promise.all(
      cursos.map(async (curso) => {
        // Buscar avaliações
        const avaliacoes = await prisma.cursoAvaliacao.findMany({
          where: { cursoId: curso.id },
          select: { nota: true },
        });

        const mediaAvaliacoes =
          avaliacoes.length > 0
            ? avaliacoes.reduce((sum, av) => sum + av.nota, 0) /
              avaliacoes.length
            : 0;

        // Calcular quantidade total de aulas
        const aulasUnicas = new Set<string>();
        let duracaoTotalSegundos = 0;

        curso.cursoModulos.forEach((cursoModulo) => {
          cursoModulo.modulo.aulaModulos.forEach((aulaModulo) => {
            // Adicionar aula ao set para contar apenas aulas únicas
            aulasUnicas.add(aulaModulo.aula.id);

            // Somar duração
            if (aulaModulo.aula.duracao) {
              duracaoTotalSegundos += durationToSeconds(
                aulaModulo.aula.duracao
              );
            }
          });
        });

        const quantidadeAulas = aulasUnicas.size;
        const duracaoTotal = secondsToHumanReadable(duracaoTotalSegundos);

        // Remover cursoModulos do retorno (não precisamos mais dele no frontend)
        const {
          cursoModulos,
          duracaoTotal: duracaoBanco,
          ...cursoSemModulos
        } = curso;

        return {
          ...cursoSemModulos,
          mediaAvaliacoes: Math.round(mediaAvaliacoes * 10) / 10,
          quantidadeAulas,
          duracaoTotal, // Usar a duração CALCULADA, não a do banco
        };
      })
    );

    return NextResponse.json({
      data: cursosComDados,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
