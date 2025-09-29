import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // token
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Token de autenticação não encontrado" },
        { status: 401 }
      );
    }

    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        sub: string;
      };
      userId = decoded.sub;
    } catch (err) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    // verificar acesso do usuário ao curso
    const usuarioCurso = await prisma.usuarioCurso.findFirst({
      where: { usuarioId: userId, cursoId: id },
    });
    if (!usuarioCurso) {
      return NextResponse.json(
        { error: "Você não tem acesso a este curso" },
        { status: 403 }
      );
    }

    // buscar curso alinhado ao schema
    const curso = await prisma.curso.findUnique({
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
                  include: { aula: true }, // sem orderBy dentro do include
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

    if (!curso) {
      return NextResponse.json(
        { error: "Curso não encontrado" },
        { status: 404 }
      );
    }

    // ordenar módulos e aulas no backend (JS)
    if (Array.isArray(curso.cursoModulos)) {
      curso.cursoModulos.sort(
        (a, b) => (a.modulo?.ordem ?? 0) - (b.modulo?.ordem ?? 0)
      );
      curso.cursoModulos.forEach((cm) => {
        if (cm.modulo && Array.isArray(cm.modulo.aulaModulos)) {
          cm.modulo.aulaModulos.sort(
            (x, y) => (x.aula?.ordem ?? 0) - (y.aula?.ordem ?? 0)
          );
        }
      });
    }

    // média das avaliações
    const avaliacoes = await prisma.cursoAvaliacao.findMany({
      where: { cursoId: curso.id },
      select: { nota: true },
    });
    const mediaAvaliacoes =
      avaliacoes.length > 0
        ? avaliacoes.reduce((s, a) => s + a.nota, 0) / avaliacoes.length
        : 0;

    // avaliações recentes
    const avaliacoesRecentes = await prisma.cursoAvaliacao.findMany({
      where: { cursoId: curso.id },
      include: { usuario: { select: { id: true, name: true } } },
      orderBy: { data: "desc" },
      take: 5,
    });

    // última aula / progresso (considera assistido OU ultimaPosicao > 0)
    const ultimaAulaAssistida = await prisma.usuarioCursoAula.findFirst({
      where: {
        usuarioCursoId: usuarioCurso.id,
        OR: [{ assistido: true }, { ultimaPosicao: { gt: 0 } }],
      },
      orderBy: [{ dataAssistido: "desc" }, { ultimaPosicao: "desc" }],
      include: { aula: true },
    });

    // primeira aula (após ordenar)
    const primeiraAula =
      curso.cursoModulos?.[0]?.modulo?.aulaModulos?.[0]?.aula || null;

    // decidir aula para redirect (backend)
    let aulaRedirect: {
      id: string;
      resumePosition?: number;
      assistido?: boolean;
    } | null = null;
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
        ultimaAula: ultimaAulaAssistida?.aula || null,
        primeiraAula,
        aulaRedirect,
      },
      usuarioCurso,
    });
  } catch (error) {
    console.error("Erro ao buscar curso:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
