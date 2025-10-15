"use client";

import { useEffect, useMemo, useState } from "react";
import { CourseModal } from "@/components/course-modal";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { Filters } from "@/components/dashboard/Filters";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCursos,
  fetchFavoritos,
  toggleFavorito,
} from "@/store/slices/cursosSlice";
import { fetchMeusCursos } from "@/store/slices/userSlice";
import { toast } from "@/components/ui/use-toast";

const niveis = ["Todos", "iniciante", "intermediario", "avancado"];

type CursoComProgresso = {
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
};

export default function CourseCatalogPage() {
  const dispatch = useAppDispatch();
  const { cursos, favoritos, loading: cursosLoading } = useAppSelector(
    (state) => state.cursos
  );
  const { meusCursos } = useAppSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedNivel, setSelectedNivel] = useState("Todos");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingPlayer, setIsLoadingPlayer] = useState(false);

  useEffect(() => {
    dispatch(fetchCursos());
    dispatch(fetchFavoritos());
    dispatch(fetchMeusCursos());
  }, [dispatch]);

  const categoriasDisponiveis = useMemo(() => {
    const nomes = new Set<string>();

    cursos.forEach((curso) => {
      const nomeCategoria =
        typeof curso.categoria === "string"
          ? curso.categoria
          : curso.categoria?.nome;

      if (nomeCategoria) {
        nomes.add(nomeCategoria);
      }
    });

    return ["Todos", ...Array.from(nomes).sort((a, b) => a.localeCompare(b))];
  }, [cursos]);

  const cursosComProgresso: CursoComProgresso[] = useMemo(() => {
    return cursos.map((curso) => {
      const meuCurso = meusCursos.find((mc) => mc.cursoId === curso.id);

      const quantidadeAulasCalculada = curso.quantidadeAulas ?? 0;

      return {
        id: curso.id,
        titulo: curso.titulo,
        descricao: curso.descricao,
        thumbnail: curso.thumbnail,
        progresso: meuCurso?.progresso ?? 0,
        duracaoTotal: curso.duracaoTotal || "0min",
        quantidadeAulas: curso.quantidadeAulas,
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
          curso.instrutores?.[0]?.instrutor?.nome ||
          curso.instrutor ||
          "Instrutor",
        avaliacao: curso.mediaAvaliacoes ?? 0,
        status: meuCurso?.status || "disponivel",
        adquirido: !!meuCurso,
        preco: Number(curso.preco ?? 0),
        precoOriginal: curso.precoOriginal,
        desconto: curso.desconto,
        mediaAvaliacoes: curso.mediaAvaliacoes,
      };
    });
  }, [cursos, meusCursos]);

  const cursosFavoritosIds = useMemo(
    () => favoritos.map((fav) => fav.cursoId),
    [favoritos]
  );

  const cursosFiltrados = useMemo(() => {
    const termo = searchTerm.toLowerCase().trim();

    return cursosComProgresso.filter((curso) => {
      const matchSearch =
        termo.length === 0 ||
        curso.titulo.toLowerCase().includes(termo) ||
        curso.descricao.toLowerCase().includes(termo) ||
        curso.categoria.toLowerCase().includes(termo);

      const matchCategory =
        selectedCategory === "Todos" || curso.categoria === selectedCategory;

      const matchNivel =
        selectedNivel === "Todos" || curso.nivel === selectedNivel;

      return matchSearch && matchCategory && matchNivel;
    });
  }, [cursosComProgresso, searchTerm, selectedCategory, selectedNivel]);

  const handleCourseClick = async (curso: CursoComProgresso) => {
    if (curso.adquirido) {
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

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Catálogo de Cursos
          </h1>
          <p className="max-w-3xl text-muted-foreground">
            Explore todo o conteúdo disponível na plataforma. Filtre por
            categoria, nível e encontre o curso ideal para o seu momento.
          </p>
        </header>

        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedNivel={selectedNivel}
          onNivelChange={setSelectedNivel}
          categorias={categoriasDisponiveis}
          niveis={niveis}
        />

        {cursosLoading || isLoadingPlayer ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>
        ) : cursosFiltrados.length === 0 ? (
          <div className="space-y-4 rounded-xl border bg-white p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Nenhum curso encontrado
            </h2>
            <p className="mx-auto max-w-md text-muted-foreground">
              Ajuste os filtros ou tente outro termo de busca para encontrar
              novos cursos. Temos sempre novidades chegando à plataforma!
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("Todos");
                setSelectedNivel("Todos");
                setSearchTerm("");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cursosFiltrados.map((curso) => (
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
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCourseId(null);
        }}
      />
    </div>
  );
}

