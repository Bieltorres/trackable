import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Token de autenticacao nao encontrado" },
        { status: 401 }
      );
    }

    let userId: string;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        sub: string;
      };

      userId = decoded.sub;
    } catch {
      return NextResponse.json({ error: "Token invalido" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Acesso negado. Apenas administradores podem acessar." },
        { status: 403 }
      );
    }

    const alunos = await prisma.user.findMany({
      where: { role: "student" },
      include: {
        userInfo: true,
        usuarioCursos: {
          include: {
            curso: {
              select: {
                id: true,
                titulo: true,
                cursoModulos: {
                  select: {
                    modulo: {
                      select: {
                        aulaModulos: {
                          select: {
                            aulaId: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            usuarioCursoAulas: {
              select: {
                aulaId: true,
                assistido: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const data = alunos.map((aluno) => {
      const cursosDetalhados = aluno.usuarioCursos.map((uc) => {
        const aulaIds = new Set<string>();

        uc.curso?.cursoModulos.forEach((cm) => {
          cm.modulo?.aulaModulos?.forEach((am) => {
            if (am.aulaId) {
              aulaIds.add(am.aulaId);
            }
          });
        });

        const totalAulasCurso = aulaIds.size;
        const aulasAssistidas = uc.usuarioCursoAulas.filter(
          (aula) => aula.assistido
        ).length;

        const progressoCalculado =
          totalAulasCurso > 0
            ? Math.round(
                (Math.min(aulasAssistidas, totalAulasCurso) / totalAulasCurso) *
                  100
              )
            : Math.max(0, Math.min(100, uc.progresso ?? 0));

        return {
          id: uc.cursoId,
          titulo: uc.curso?.titulo ?? "",
          status: uc.status,
          progresso: progressoCalculado,
          aulasAssistidas,
          totalAulas: totalAulasCurso,
          dataInicio: uc.dataInicio,
          dataCompra: uc.dataCompra,
        };
      });

      const totalCursos = cursosDetalhados.length;
      const totalConcluidos = cursosDetalhados.filter(
        (curso) => curso.status === "concluido"
      ).length;
      const progressoMedio =
        totalCursos > 0
          ? Math.round(
              cursosDetalhados.reduce(
                (acc, curso) => acc + curso.progresso,
                0
              ) / totalCursos
            )
          : 0;

      return {
        id: aluno.id,
        nome: aluno.name,
        email: aluno.email,
        telefone: aluno.phone,
        criadoEm: aluno.createdAt,
        atualizadoEm: aluno.updatedAt,
        totalCursos,
        totalConcluidos,
        progressoMedio,
        info: aluno.userInfo
          ? {
              bio: aluno.userInfo.bio,
              avatar: aluno.userInfo.avatar,
              cidade: aluno.userInfo.cidade,
              estado: aluno.userInfo.estado,
              pais: aluno.userInfo.pais,
            }
          : null,
        cursos: cursosDetalhados,
      };
    });

    return NextResponse.json({ alunos: data });
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar alunos" },
      { status: 500 }
    );
  }
}
