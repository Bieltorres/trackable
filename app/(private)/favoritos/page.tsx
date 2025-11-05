"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Heart, Loader2 } from "lucide-react";
import { CourseModal } from "@/components/course-modal";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchFavoritos, toggleFavorito } from "@/store/slices/cursosSlice";
import { fetchMeusCursos } from "@/store/slices/userSlice";

interface CursoCardData {
  id: string;
  titulo: string;
  descricao: string;
  thumbnail?: string | null;
  progresso: number;
  duracaoTotal: string;
  quantidadeAulas?: number;
  aulasTotal: number;
  aulasAssistidas: number;
  categoria: string;
  nivel: string;
  instrutor: string;
  avaliacao: number;
  status: string;
  adquirido: boolean;
  preco: number;
  precoOriginal?: number | null;
  desconto?: number | null;
  mediaAvaliacoes?: number;
}

export default function FavoritosPage() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { favoritos, loading } = useAppSelector((state) => state.cursos);
  const { meusCursos } = useAppSelector((state) => state.user);

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingPlayer, setIsLoadingPlayer] = useState(false);

  useEffect(() => {
    dispatch(fetchFavoritos());
    dispatch(fetchMeusCursos());
  }, [dispatch]);

  const cursosFavoritosIds = useMemo(
    () => favoritos.map((fav) => fav.cursoId),
    [favoritos]
  );

  const cursosFavoritos = useMemo<CursoCardData[]>(() => {
    return favoritos
      .map((fav) => fav.curso)
      .filter((curso): curso is NonNullable<typeof curso> => Boolean(curso))
      .map((curso) => {
        const meuCurso = meusCursos.find((mc) => mc.cursoId === curso.id);

        const quantidadeAulasCalculada =
          (curso as any).quantidadeAulas ??
          (curso.modulos?.reduce(
            (acc, modulo) => acc + (modulo.aulas?.length || 0),
            0
          ) ?? 0);

        return {
          id: curso.id,
          titulo: curso.titulo,
          descricao: curso.descricao,
          thumbnail: curso.thumbnail,
          progresso: meuCurso?.progresso ?? 0,
          duracaoTotal: (curso as any).duracaoTotal || "0min",
          quantidadeAulas: (curso as any).quantidadeAulas,
          aulasTotal: quantidadeAulasCalculada,
          aulasAssistidas: Math.floor(
            ((meuCurso?.progresso ?? 0) * quantidadeAulasCalculada) / 100
          ),
          categoria:
            typeof curso.categoria === "string"
              ? curso.categoria
              : curso.categoria?.nome || "Sem categoria",
          nivel: curso.nivel ?? "iniciante",
          instrutor:
            (curso as any)?.instrutores?.[0]?.instrutor?.nome ||
            curso.instrutor ||
            "Instrutor",
          avaliacao: curso.mediaAvaliacoes ?? 0,
          status: meuCurso?.status || "disponivel",
          adquirido: Boolean(meuCurso),
          preco: Number(curso.preco ?? 0),
          precoOriginal: curso.precoOriginal,
          desconto: curso.desconto,
          mediaAvaliacoes: curso.mediaAvaliacoes,
        };
      });
  }, [favoritos, meusCursos]);

  const handleToggleFavorito = async (cursoId: string) => {
    try {
      await dispatch(toggleFavorito(cursoId)).unwrap();
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar seus favoritos.",
        variant: "destructive",
      });
    }
  };

  const handleCourseClick = async (curso: CursoCardData) => {
    const meuCurso = meusCursos.find((mc) => mc.cursoId === curso.id);

    if (meuCurso) {
      try {
        setIsLoadingPlayer(true);
        const response = await fetch(`/api/cursos/${curso.id}/player`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Falha ao localizar aula do curso");
        }

        const data = await response.json();
        const aulaId = data?.data?.aulaRedirect?.id;

        if (aulaId) {
          window.location.href = `/curso/${curso.id}/aula/${aulaId}`;
        } else {
          toast({
            title: "Aula não encontrada",
            description:
              "Não foi possível localizar a aula associada ao seu progresso.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Erro ao redirecionar para a aula:", error);
        toast({
          title: "Erro ao continuar curso",
          description:
            "Tente novamente em instantes. Se o problema persistir, contate o suporte.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingPlayer(false);
      }
      return;
    }

    setSelectedCourseId(curso.id);
    setIsModalOpen(true);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">Favoritos</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os cursos que você marcou como favoritos e retome seus
            estudos com rapidez.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-80 rounded-xl bg-white shadow-sm ring-1 ring-slate-200/60 animate-pulse"
              >
                <div className="h-full w-full rounded-xl bg-slate-200" />
              </div>
            ))}
          </div>
        ) : cursosFavoritos.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <Heart className="h-12 w-12 text-slate-400" />
            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              Nenhum curso favorito ainda
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Explore o catálogo e adicione cursos aos favoritos para acessá-los
              rapidamente sempre que quiser.
            </p>
            <Button asChild className="mt-6">
              <Link href="/dashboard/cursos">Explorar cursos</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {cursosFavoritos.map((curso) => (
              <CourseCard
                key={curso.id}
                curso={curso}
                isFavorito={cursosFavoritosIds.includes(curso.id)}
                onToggleFavorito={handleToggleFavorito}
                onCourseClick={handleCourseClick}
              />
            ))}
          </div>
        )}
      </div>

      <CourseModal
        cursoId={selectedCourseId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {isLoadingPlayer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-lg">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            Carregando aula...
          </div>
        </div>
      )}
    </div>
  );
}
