"use client";

import { useState, useEffect } from "react";
import {
  Youtube,
  BarChart,
  Zap,
} from "lucide-react";
import { CourseModal } from "@/components/course-modal";
import { UserSettingsModal } from "@/components/user-settings-modal";
import { AdminConfigModal } from "@/components/admin-config-modal";
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

const niveis = ["Todos", "iniciante", "intermediario", "avancado"];

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
  const [isAdminConfigOpen, setIsAdminConfigOpen] = useState(true);

  // Carregar dados iniciais
  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchCursos());
    dispatch(fetchFavoritos());
    dispatch(fetchMeusCursos());
  }, [dispatch]);

  const handleToggleFavorito = async (cursoId: string) => {
    try {
      await dispatch(toggleFavorito(cursoId)).unwrap();
    } catch (error) {
      console.error("Erro ao alterar favorito:", error);
    }
  };

  const handleCourseClick = (curso: Curso) => {
    const cursoAdquirido = meusCursos.find((mc) => mc.cursoId === curso.id);

    if (cursoAdquirido) {
      // Se o curso já foi adquirido, redireciona para a página de aulas
      window.location.href = `/curso/${curso.id}/aula/1`;
    } else {
      // Se não foi adquirido, abre o modal de compra
      setSelectedCourse(curso);
      setIsModalOpen(true);
    }
  };

  const handleMenuClick = (item: any) => {
    if (item.isAdmin) {
      setIsAdminConfigOpen(true);
    }
  };

  // Criar lista de categorias únicas dos cursos
  const categorias = [
    "Todos",
    ...Array.from(
      new Set(cursos.map((c) => c.categoria?.nome).filter(Boolean))
    ),
  ];

  // Mapear cursos com informações de progresso dos meus cursos
  const cursosComProgresso = cursos.map((curso) => {
    const meuCurso = meusCursos.find((mc) => mc.cursoId === curso.id);
    const totalAulas =
      curso.modulos?.reduce(
        (acc, modulo) => acc + (modulo.aulas?.length || 0),
        0
      ) || 0;

    return {
      ...curso,
      adquirido: !!meuCurso,
      progresso: meuCurso?.progresso || 0,
      status: meuCurso?.status || "disponivel",
      aulasTotal: totalAulas,
      aulasAssistidas: Math.floor(
        ((meuCurso?.progresso || 0) * totalAulas) / 100
      ),
      duracaoTotal: "0h 0min", // TODO: calcular duração total das aulas
      categoria: curso.categoria?.nome || "Sem categoria",
      instrutor: curso.instrutor?.name || "Instrutor",
      avaliacao: curso.mediaAvaliacoes || 0,
    };
  });

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
    if (activeTab === "todos") matchTab = true;

    return matchSearch && matchCategory && matchNivel && matchTab;
  });

  const cursosFavoritosIds = favoritos.map((f) => f.cursoId);

  const estatisticas = {
    cursosAtivos: meusCursos.filter((c) => c.status === "em-andamento").length,
    cursosConcluidos: meusCursos.filter((c) => c.status === "concluido").length,
    cursosAdquiridos: meusCursos.length,
    cursosDisponiveis: cursos.length - meusCursos.length,
  };

  // Categorias personalizadas baseadas nos dados reais
  const categoriasPersonalizadas = [
    {
      nome: "Material do Youtube",
      icon: Youtube,
      cor: "bg-red-500",
      descricao: "Conteúdos exclusivos e materiais complementares",
      cursos: cursos.filter((c) => c.categoria?.nome === "Marketing").length,
    },
    {
      nome: "Trackeamento",
      icon: BarChart,
      cor: "bg-blue-500",
      descricao: "Ferramentas e estratégias de análise",
      cursos: cursos.filter((c) => c.categoria?.nome === "Analytics").length,
    },
    {
      nome: "Automações",
      icon: Zap,
      cor: "bg-yellow-500",
      descricao: "Sistemas automatizados para otimizar processos",
      cursos: cursos.filter((c) => c.categoria?.nome === "Automação").length,
    },
  ];

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    console.log("meusCursos do Redux:", meusCursos);
  }, [meusCursos]);

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}

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
            onCategoriaSelect={setCategoriaPersonalizadaSelecionada}
            loading={cursosLoading}
            isAdmin={user?.role === "admin"}
          />

          {/* Filtros e Busca */}
          <Filters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedNivel={selectedNivel}
            onNivelChange={setSelectedNivel}
            categorias={categorias}
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
        curso={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Modal de Configurações Admin */}
      <AdminConfigModal
        isOpen={isAdminConfigOpen}
        onClose={() => setIsAdminConfigOpen(false)}
      />
    </div>
  );
}
