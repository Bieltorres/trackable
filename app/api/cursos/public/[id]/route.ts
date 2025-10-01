import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // tenta ler token (mas não exige que exista)
    const token = request.cookies.get("token")?.value;
    let userId: string | null = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };
        userId = decoded.sub;
      } catch (err) {
        // token inválido -> apenas tratar como não autenticação
        userId = null;
      }
    }

    // se houver userId, checar se o usuário tem o curso
    let usuarioCurso = null;
    if (userId) {
      usuarioCurso = await prisma.usuarioCurso.findFirst({
        where: { usuarioId: userId, cursoId: id },
      });
    }

    // buscar o curso: detalhado se tem acesso, limitado se não tem
    let curso: any = null;
    if (usuarioCurso) {
      // usuário tem acesso -> buscar tudo (módulos/aulas etc)
      curso = await prisma.curso.findUnique({
        where: { id },
        include: {
          categoria: true,
          instrutores: {
            include: {
              instrutor: {
                select: {
                  id: true,
                  nome: true,
                  bio: true,
                  avatar: true,
                  redesSociais: true,
                },
              },
            },
          },
          cursoModulos: {
            include: {
              modulo: {
                include: {
                  aulaModulos: {
                    include: { aula: true },
                  },
                },
              },
            },
          },
          _count: {
            select: {
              usuarioCursos: true,
              avaliacoes: true,
            },
          },
        },
      });
    } else {
      // sem acesso -> buscar apenas dados públicos (sem aulas)
      curso = await prisma.curso.findUnique({
        where: { id },
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
          // não incluir cursoModulos.aulaModulos.aula aqui
          // se quiser mostrar módulos (títulos/ordem) podemos incluir só modulo básico:
          cursoModulos: {
            include: {
              modulo: {
                select: {
                  id: true,
                  titulo: true,
                  ordem: true,
                  descricao: true,
                },
              },
            },
          },
          _count: {
            select: {
              usuarioCursos: true,
              avaliacoes: true,
            },
          },
        },
      });
    }

    if (!curso) {
      return NextResponse.json({ error: "Curso não encontrado" }, { status: 404 });
    }

    // ordenar módulos e aulas somente se temos módulos com aulas (usuário com acesso)
    if (Array.isArray(curso.cursoModulos)) {
      curso.cursoModulos.sort(
        (a: any, b: any) => (a.modulo?.ordem ?? 0) - (b.modulo?.ordem ?? 0)
      );
      curso.cursoModulos.forEach((cm: any) => {
        if (cm.modulo && Array.isArray(cm.modulo.aulaModulos)) {
          cm.modulo.aulaModulos.sort(
            (x: any, y: any) => (x.aula?.ordem ?? 0) - (y.aula?.ordem ?? 0)
          );
        }
      });
    }

    // média das avaliações (público)
    const avaliacoes = await prisma.cursoAvaliacao.findMany({
      where: { cursoId: curso.id },
      select: { nota: true },
    });
    const mediaAvaliacoes =
      avaliacoes.length > 0
        ? avaliacoes.reduce((s, a) => s + a.nota, 0) / avaliacoes.length
        : 0;

    // avaliações recentes (públicas)
    const avaliacoesRecentes = await prisma.cursoAvaliacao.findMany({
      where: { cursoId: curso.id },
      include: { usuario: { select: { id: true, name: true } } },
      orderBy: { data: "desc" },
      take: 5,
    });

    // última aula / progresso -> só faz sentido se o usuário tem acesso
    let ultimaAulaAssistida: any = null;
    if (usuarioCurso) {
      ultimaAulaAssistida = await prisma.usuarioCursoAula.findFirst({
        where: {
          usuarioCursoId: usuarioCurso.id,
          OR: [{ assistido: true }, { ultimaPosicao: { gt: 0 } }],
        },
        orderBy: [{ dataAssistido: "desc" }, { ultimaPosicao: "desc" }],
        include: { aula: true },
      });
    }

    // primeira aula (apenas se o curso retornou aulas incluídas)
    const primeiraAula =
      curso.cursoModulos?.[0]?.modulo?.aulaModulos?.[0]?.aula ?? null;

    // decidir aula para redirect (backend)
    let aulaRedirect: { id: string; resumePosition?: number; assistido?: boolean } | null = null;
    if (ultimaAulaAssistida?.aula) {
      aulaRedirect = {
        id: ultimaAulaAssistida.aula.id,
        resumePosition: ultimaAulaAssistida.ultimaPosicao ?? 0,
        assistido: !!ultimaAulaAssistida.assistido,
      };
    } else if (primeiraAula) {
      aulaRedirect = { id: primeiraAula.id };
    } else {
      aulaRedirect = null;
    }

    return NextResponse.json({
      data: {
        ...curso,
        mediaAvaliacoes: Math.round(mediaAvaliacoes * 10) / 10,
        avaliacoesRecentes,
        ultimaAula: ultimaAulaAssistida?.aula ?? null,
        primeiraAula,
        aulaRedirect,
      },
      usuarioCurso: usuarioCurso ?? null,
      hasAccess: Boolean(usuarioCurso),
    });
  } catch (error) {
    console.error("Erro ao buscar curso:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
