import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

async function getUserFromToken(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) throw new Error("Token não encontrado");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };
    return decoded.sub;
  } catch {
    throw new Error("Token inválido");
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request);

    const meusCursos = await prisma.usuarioCurso.findMany({
      where: { usuarioId: userId },
      include: {
        curso: {
          include: {
            categoria: true,
            instrutores: {
              include: {
                instrutor: {
                  select: {
                    id: true,
                    nome: true,
                    avatar: true,
                  },
                },
              },
            },
            cursoModulos: {
              include: {
                modulo: {
                  include: {
                    aulaModulos: {
                      include: {
                        aula: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        usuarioCursoAulas: {
          include: {
            aula: true,
          },
        },
      },
      orderBy: { dataCompra: "desc" },
    });

    const data = meusCursos.map((usuarioCurso) => {
      const { curso, usuarioCursoAulas, ...rest } = usuarioCurso;

      const modulos =
        curso?.cursoModulos
          ?.map((cursoModulo) => {
            if (!cursoModulo.modulo) return null;

            const { aulaModulos, ...moduloRest } = cursoModulo.modulo;
            const aulas =
              aulaModulos
                ?.map((aulaModulo) => aulaModulo.aula)
                .filter(Boolean)
                .map((aula) => ({
                  id: aula!.id,
                  titulo: aula!.titulo,
                  descricao: aula!.descricao,
                  videoUrl: aula!.videoUrl,
                  duracao: aula!.duracao,
                  ordem: aula!.ordem,
                  moduloId: aula!.moduloId,
                }))
                .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0)) ?? [];

            return {
              ...moduloRest,
              aulas,
            };
          })
          .filter(Boolean)
          .sort((a, b) => (a?.ordem ?? 0) - (b?.ordem ?? 0)) ?? [];

      const instrutorPrincipal = curso?.instrutores?.[0]?.instrutor;

      const cursoFormatado = curso
        ? {
            id: curso.id,
            titulo: curso.titulo,
            descricao: curso.descricao,
            thumbnail: curso.thumbnail,
            nivel: curso.nivel,
            preco: curso.preco,
            precoOriginal: curso.precoOriginal,
            desconto: curso.desconto,
            status: curso.status,
            categoriaId: curso.categoriaId,
            duracaoTotal: curso.duracaoTotal,
            bestseller: curso.bestseller,
            novo: curso.novo,
            createdAt: curso.createdAt,
            updatedAt: curso.updatedAt,
            categoria: curso.categoria,
            instrutor: instrutorPrincipal
              ? {
                  id: instrutorPrincipal.id,
                  name: instrutorPrincipal.nome,
                  avatar: instrutorPrincipal.avatar,
                }
              : null,
            instrutores:
              curso.instrutores?.map((item) => ({
                id: item.instrutor.id,
                name: item.instrutor.nome,
                avatar: item.instrutor.avatar,
              })) ?? [],
            modulos,
            quantidadeAulas: modulos.reduce(
              (total, modulo) => total + (modulo?.aulas?.length ?? 0),
              0
            ),
          }
        : null;

      return {
        ...rest,
        curso: cursoFormatado,
        usuarioCursoAulas: usuarioCursoAulas?.map((registro) => ({
          id: registro.id,
          aulaId: registro.aulaId,
          assistido: registro.assistido,
          ultimaPosicao: registro.ultimaPosicao,
          dataAssistido: registro.dataAssistido,
          aula: registro.aula
            ? {
                id: registro.aula.id,
                titulo: registro.aula.titulo,
                ordem: registro.aula.ordem,
                duracao: registro.aula.duracao,
                moduloId: registro.aula.moduloId,
              }
            : null,
        })),
      };
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Erro ao buscar meus cursos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
