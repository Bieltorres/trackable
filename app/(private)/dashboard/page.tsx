"use client";

import { useState, useEffect, useMemo } from "react";
import type { ElementType } from "react";
import * as Icons from "lucide-react";
import { CourseModal } from "@/components/course-modal";
import { HeroBanner } from "@/components/dashboard/HeroBanner";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Categories } from "@/components/dashboard/Categories";
import { Filters } from "@/components/dashboard/Filters";
import { CoursesTabs } from "@/components/dashboard/CoursesTabs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCursos,
  fetchFavoritos,
  toggleFavorito,
} from "@/store/slices/cursosSlice";
import { fetchUserProfile, fetchMeusCursos } from "@/store/slices/userSlice";
import { Curso } from "@/types";
import { toast } from "@/components/ui/use-toast";
const niveis = ["Todos", "iniciante", "intermediario", "avancado"];

type CategoriaApi = {
  id: string;
  nome: string;
  cor: string;
  icone: string;
  totalCursos: number;
};

type CategoriaCard = {
  nome: string;
  icon: ElementType;
  cor: string;
  descricao: string;
  cursos: number;
};

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const {
    cursos,
    favoritos,
    loading: cursosLoading,
  } = useAppSelector((state) => state.cursos);
  const {
    user,
    meusCursos,
    loading: userLoading,
    isAuthenticated,
  } = useAppSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedNivel, setSelectedNivel] = useState("Todos");
  const [activeTab, setActiveTab] = useState("todos");
  const [
    categoriaPersonalizadaSelecionada,
    setCategoriaPersonalizadaSelecionada,
  ] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Curso | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriasDb, setCategoriasDb] = useState<CategoriaApi[]>([]);
  const [categoriasDbLoading, setCategoriasDbLoading] = useState(false);

  // Carregar dados iniciais
  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchCursos());
    dispatch(fetchFavoritos());
    dispatch(fetchMeusCursos());
  }, [dispatch]);

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        setCategoriasDbLoading(true);
        const response = await fetch("/api/categorias");

        if (!response.ok) {
          throw new Error("Falha ao carregar categorias");
        }

        const data = await response.json();
        setCategoriasDb(data.categorias ?? []);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        toast({
          title: "Erro ao carregar categorias",
          description: "Tente novamente em alguns minutos.",
          variant: "destructive",
        });
      } finally {
        setCategoriasDbLoading(false);
      }
    };

    carregarCategorias();
  }, []);

  const handleToggleFavorito = async (cursoId: string) => {
    try {
      await dispatch(toggleFavorito(cursoId)).unwrap();
    } catch (error) {
      console.error("Erro ao alterar favorito:", error);
    }
  };

  const handleCourseClick = async (curso: Curso) => {
    const cursoAdquirido = meusCursos.find((mc) => mc.cursoId === curso.id);

    if (cursoAdquirido) {
      const res = await fetch(`/api/cursos/${curso.id}/player`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      const aulaId = data?.data?.aulaRedirect?.id;

      if (aulaId) {
        window.location.href = `/curso/${curso.id}/aula/${aulaId}`;
      } else {
        toast({
          title: "Erro ao buscar aula",
          description: "Não foi possível encontrar uma aula neste curso.",
          variant: "destructive",
        });
      }
    } else {
      setSelectedCourse(curso);
      setIsModalOpen(true);
    }
  };

  const categoriasDisponiveis = useMemo(() => {
    const nomes = new Set<string>();

    categoriasDb.forEach((categoria) => {
      if (categoria.nome) {
        nomes.add(categoria.nome);
      }
    });

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
  }, [categoriasDb, cursos]);

  const handleCategoriaCardSelect = (categoria: string | null) => {
    setCategoriaPersonalizadaSelecionada(categoria);
    setSelectedCategory(categoria ?? "Todos");
  };

  const handleCategoryFilterChange = (value: string) => {
    setSelectedCategory(value);
    setCategoriaPersonalizadaSelecionada(value === "Todos" ? null : value);
  };
  const cursosComProgresso = cursos.map((curso) => {
    const meuCurso = meusCursos.find((mc) => mc.cursoId === curso.id);

    // ✅ USAR quantidadeAulas da API (já calculada)
    const totalAulas =
      curso.quantidadeAulas ??
      (curso.modulos?.reduce(
        (acc, modulo) => acc + (modulo.aulas?.length || 0),
        0
      ) ||
        0);

    return {
      ...curso,
      adquirido: !!meuCurso,
      progresso: meuCurso?.progresso || 0,
      status: meuCurso?.status || "disponivel",
      quantidadeAulas: totalAulas, // ✅ Novo campo
      aulasTotal: totalAulas,
      aulasAssistidas: Math.floor(
        ((meuCurso?.progresso || 0) * totalAulas) / 100
      ),
      // ✅ USAR duracaoTotal da API (já calculada e formatada)
      duracaoTotal: curso.duracaoTotal || "0min",
      categoria: curso.categoria?.nome || "Sem categoria",
      instrutor: curso.instrutor?.name || "Instrutor",
      avaliacao: curso.mediaAvaliacoes || 0,
    };
  });

  const cursosFavoritosIds = favoritos.map((f) => f.cursoId);

  const cursosFiltrados = cursosComProgresso.filter((curso) => {
    const matchSearch = curso.titulo
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "Todos" || curso.categoria === selectedCategory;
    const matchNivel =
      selectedNivel === "Todos" || curso.nivel === selectedNivel;

    let matchTab = true;
    if (activeTab === "meus-cursos") matchTab = curso.adquirido;
    if (activeTab === "em-andamento")
      matchTab = curso.status === "em-andamento";
    if (activeTab === "concluidos") matchTab = curso.status === "concluido";
    if (activeTab === "disponivel")
      matchTab = curso.status === "disponivel" || !curso.adquirido;
    if (activeTab === "nao-iniciados")
      matchTab = curso.status === "nao-iniciado";
    if (activeTab === "favoritos")
      matchTab = cursosFavoritosIds.includes(curso.id);
    if (activeTab === "todos") matchTab = true;

    return matchSearch && matchCategory && matchNivel && matchTab;
  });

  const estatisticas = {
    cursosAtivos: meusCursos.filter((c) => c.status === "em-andamento").length,
    cursosConcluidos: meusCursos.filter((c) => c.status === "concluido").length,
    cursosAdquiridos: meusCursos.length,
    cursosDisponiveis: cursos.length - meusCursos.length,
  };

  // Categorias personalizadas baseadas nos dados reais
  const categoriasPersonalizadas: CategoriaCard[] = useMemo(() => {
    if (!categoriasDb.length) {
      return [];
    }

    const iconRecord = Icons as Record<string, ElementType>;

    return categoriasDb.map((categoria) => {
      const IconComponent = iconRecord[categoria.icone] ?? Icons.BookOpen;

      const cursosRelacionados = cursos.filter((curso) => {
        const nomeCategoria =
          typeof curso.categoria === "string"
            ? curso.categoria
            : curso.categoria?.nome;

        return nomeCategoria === categoria.nome;
      }).length;

      const totalCursos =
        cursosRelacionados > 0 ? cursosRelacionados : categoria.totalCursos;

      return {
        nome: categoria.nome,
        icon: IconComponent,
        cor: categoria.cor || "#3B82F6",
        descricao: `Explore cursos de ${categoria.nome}`,
        cursos: totalCursos,
      };
    });
  }, [categoriasDb, cursos]);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    console.log("meusCursos do Redux:", meusCursos);
  }, []);

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {/* Banner Hero */}
          <HeroBanner
            userName={user?.name || "Usuário"}
            cursosEmAndamento={estatisticas.cursosAtivos}
            cursosConcluidos={estatisticas.cursosConcluidos}
            isAdmin={isAdmin}
            loading={userLoading}
          />

          {/* Estatísticas */}
          <StatsCards
            cursosAdquiridos={estatisticas.cursosAdquiridos}
            cursosAtivos={estatisticas.cursosAtivos}
            cursosConcluidos={estatisticas.cursosConcluidos}
            cursosDisponiveis={estatisticas.cursosDisponiveis}
            loading={cursosLoading || userLoading}
          />

          {/* Categorias Personalizadas */}
          <Categories
            categorias={categoriasPersonalizadas}
            categoriaSelecionada={categoriaPersonalizadaSelecionada}
            onCategoriaSelect={handleCategoriaCardSelect}
            loading={categoriasDbLoading || cursosLoading}
            isAdmin={user?.role === "admin"}
          />

          {/* Filtros e Busca */}
          <Filters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryFilterChange}
            selectedNivel={selectedNivel}
            onNivelChange={setSelectedNivel}
            categorias={categoriasDisponiveis}
            niveis={niveis}
          />

          {/* Tabs de Organização */}
          {cursosLoading || userLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <CoursesTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              cursosFiltrados={cursosFiltrados}
              cursosFavoritos={cursosFavoritosIds}
              onToggleFavorito={handleToggleFavorito}
              onCourseClick={handleCourseClick}
            />
          )}
        </main>
      </div>

      {/* Modal do Curso */}
      <CourseModal
        cursoId={selectedCourse?.id || null}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}


