"use client";

import { useState } from "react";
import { Home, BarChart3, FileText, MessageCircle, Shield, Youtube, BarChart, Zap } from "lucide-react";
import { CourseModal } from "@/components/course-modal";
import { UserSettingsModal } from "@/components/user-settings-modal";
import { AdminConfigModal } from "@/components/admin-config-modal";
import { HeaderMain } from "@/components/layout/HeaderMain";
import Sidebar from "@/components/layout/Sidebar";
import { HeroBanner } from "@/components/dashboard/HeroBanner";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Categories } from "@/components/dashboard/Categories";
import { Filters } from "@/components/dashboard/Filters";
import { CoursesTabs } from "@/components/dashboard/CoursesTabs";

// Expandir os dados dos cursos para incluir cursos disponíveis para compra
const cursos = [
  // Cursos já adquiridos pelo usuário
  {
    id: 1,
    titulo: "Marketing Digital Completo",
    descricao:
      "Aprenda estratégias avançadas de marketing digital do zero ao avançado",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Marketing+Digital",
    progresso: 75,
    duracaoTotal: "8h 30min",
    aulasTotal: 45,
    aulasAssistidas: 34,
    categoria: "Marketing",
    nivel: "Intermediário",
    instrutor: "João Silva",
    avaliacao: 4.8,
    dataInicio: "2024-01-15",
    ultimaAula: "Estratégias de SEO Avançado",
    status: "em-andamento",
    categoriaPersonalizada: "Material do Youtube",
    adquirido: true,
    preco: null,
    precoOriginal: null,
    desconto: null,
  },
  {
    id: 2,
    titulo: "Vendas de Alto Impacto",
    descricao: "Técnicas comprovadas para aumentar suas vendas e conversões",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Vendas",
    progresso: 30,
    duracaoTotal: "6h 15min",
    aulasTotal: 32,
    aulasAssistidas: 10,
    categoria: "Vendas",
    nivel: "Avançado",
    instrutor: "Maria Santos",
    avaliacao: 4.9,
    dataInicio: "2024-02-01",
    ultimaAula: "Psicologia da Venda",
    status: "em-andamento",
    categoriaPersonalizada: "Trackeamento",
    adquirido: true,
    preco: null,
    precoOriginal: null,
    desconto: null,
  },
  {
    id: 3,
    titulo: "Copywriting Persuasivo",
    descricao: "Escreva textos que convertem e vendem mais",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Copywriting",
    progresso: 100,
    duracaoTotal: "4h 45min",
    aulasTotal: 28,
    aulasAssistidas: 28,
    categoria: "Copywriting",
    nivel: "Iniciante",
    instrutor: "Pedro Costa",
    avaliacao: 4.7,
    dataInicio: "2023-12-10",
    ultimaAula: "Projeto Final",
    status: "concluido",
    categoriaPersonalizada: "Automações",
    adquirido: true,
    preco: null,
    precoOriginal: null,
    desconto: null,
  },
  // Cursos disponíveis para compra
  {
    id: 4,
    titulo: "Gestão de Tráfego Pago",
    descricao:
      "Domine Facebook Ads, Google Ads e outras plataformas de anúncios pagos",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Trafego+Pago",
    progresso: 0,
    duracaoTotal: "12h 20min",
    aulasTotal: 68,
    aulasAssistidas: 0,
    categoria: "Marketing",
    nivel: "Avançado",
    instrutor: "Ana Oliveira",
    avaliacao: 4.9,
    dataInicio: null,
    ultimaAula: null,
    status: "disponivel",
    categoriaPersonalizada: "Material do Youtube",
    adquirido: false,
    preco: 297,
    precoOriginal: 497,
    desconto: 40,
    bestseller: true,
  },
  {
    id: 5,
    titulo: "Funil de Vendas Automatizado",
    descricao:
      "Construa funis que vendem 24/7 no automático usando as melhores ferramentas",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Funil+Vendas",
    progresso: 0,
    duracaoTotal: "5h 40min",
    aulasTotal: 35,
    aulasAssistidas: 0,
    categoria: "Vendas",
    nivel: "Intermediário",
    instrutor: "Carlos Lima",
    avaliacao: 4.6,
    dataInicio: null,
    ultimaAula: null,
    status: "disponivel",
    categoriaPersonalizada: "Automações",
    adquirido: false,
    preco: 197,
    precoOriginal: 297,
    desconto: 33,
  },
  {
    id: 6,
    titulo: "E-mail Marketing Avançado",
    descricao:
      "Estratégias avançadas para aumentar abertura, cliques e conversões por email",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Email+Marketing",
    progresso: 0,
    duracaoTotal: "7h 15min",
    aulasTotal: 42,
    aulasAssistidas: 0,
    categoria: "Marketing",
    nivel: "Intermediário",
    instrutor: "Fernanda Silva",
    avaliacao: 4.8,
    dataInicio: null,
    ultimaAula: null,
    status: "disponivel",
    categoriaPersonalizada: "Automações",
    adquirido: false,
    preco: 247,
    precoOriginal: 347,
    desconto: 29,
    novo: true,
  },
  {
    id: 7,
    titulo: "YouTube para Negócios",
    descricao:
      "Como criar um canal de sucesso e monetizar seu conteúdo no YouTube",
    thumbnail: "/placeholder.svg?height=200&width=300&text=YouTube+Business",
    progresso: 0,
    duracaoTotal: "9h 30min",
    aulasTotal: 55,
    aulasAssistidas: 0,
    categoria: "Marketing",
    nivel: "Iniciante",
    instrutor: "Roberto Santos",
    avaliacao: 4.7,
    dataInicio: null,
    ultimaAula: null,
    status: "disponivel",
    categoriaPersonalizada: "Material do Youtube",
    adquirido: false,
    preco: 347,
    precoOriginal: 497,
    desconto: 30,
  },
  {
    id: 8,
    titulo: "Analytics e Métricas",
    descricao:
      "Domine Google Analytics, Facebook Pixel e outras ferramentas de análise",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Analytics",
    progresso: 0,
    duracaoTotal: "6h 45min",
    aulasTotal: 38,
    aulasAssistidas: 0,
    categoria: "Marketing",
    nivel: "Avançado",
    instrutor: "Luciana Costa",
    avaliacao: 4.9,
    dataInicio: null,
    ultimaAula: null,
    status: "disponivel",
    categoriaPersonalizada: "Trackeamento",
    adquirido: false,
    preco: 197,
    precoOriginal: 297,
    desconto: 33,
  },
];

const categorias = ["Todos", "Marketing", "Vendas", "Copywriting"];
const niveis = ["Todos", "Iniciante", "Intermediário", "Avançado"];

const categoriasPersonalizadas = [
  {
    nome: "Material do Youtube",
    icon: Youtube,
    cor: "bg-red-500",
    descricao: "Conteúdos exclusivos e materiais complementares",
    cursos: cursos.filter(
      (c) => c.categoriaPersonalizada === "Material do Youtube"
    ).length,
  },
  {
    nome: "Trackeamento",
    icon: BarChart,
    cor: "bg-blue-500",
    descricao: "Ferramentas e estratégias de análise",
    cursos: cursos.filter((c) => c.categoriaPersonalizada === "Trackeamento")
      .length,
  },
  {
    nome: "Automações",
    icon: Zap,
    cor: "bg-yellow-500",
    descricao: "Sistemas automatizados para otimizar processos",
    cursos: cursos.filter((c) => c.categoriaPersonalizada === "Automações")
      .length,
  },
];

// Simular usuário admin (em produção viria do contexto/auth)
const isAdmin = true;

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
  { icon: BarChart3, label: "Progresso", href: "/progresso" },
  { icon: FileText, label: "Anotações", href: "/anotacoes" },
  { icon: MessageCircle, label: "Suporte", href: "/suporte" },
  { icon: Shield, label: "Admin Config", href: "#", isAdmin: true },
];

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedNivel, setSelectedNivel] = useState("Todos");
  const [activeTab, setActiveTab] = useState("todos");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cursosFavoritos, setCursosFavoritos] = useState<number[]>([]);
  const [
    categoriaPersonalizadaSelecionada,
    setCategoriaPersonalizadaSelecionada,
  ] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminConfigOpen, setIsAdminConfigOpen] = useState(false);

  const toggleFavorito = (cursoId: number) => {
    setCursosFavoritos((prev) =>
      prev.includes(cursoId)
        ? prev.filter((id) => id !== cursoId)
        : [...prev, cursoId]
    );
  };

  const handleCourseClick = (curso: any) => {
    if (curso.adquirido) {
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

  const cursosFiltrados = cursos.filter((curso) => {
    const matchSearch = curso.titulo
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "Todos" || curso.categoria === selectedCategory;
    const matchNivel =
      selectedNivel === "Todos" || curso.nivel === selectedNivel;
    const matchCategoriaPersonalizada =
      !categoriaPersonalizadaSelecionada ||
      curso.categoriaPersonalizada === categoriaPersonalizadaSelecionada;

    let matchTab = true;
    if (activeTab === "meus-cursos") matchTab = curso.adquirido;
    if (activeTab === "em-andamento")
      matchTab = curso.status === "em-andamento";
    if (activeTab === "concluidos") matchTab = curso.status === "concluido";
    if (activeTab === "disponivel") matchTab = curso.status === "disponivel";
    if (activeTab === "nao-iniciados")
      matchTab = curso.status === "nao-iniciado";
    if (activeTab === "todos") matchTab = true;

    return (
      matchSearch &&
      matchCategory &&
      matchNivel &&
      matchTab &&
      matchCategoriaPersonalizada
    );
  });

  const cursosFavoritosData = cursos.filter((curso) =>
    cursosFavoritos.includes(curso.id)
  );

  const estatisticas = {
    cursosAtivos: cursos.filter((c) => c.status === "em-andamento").length,
    cursosConcluidos: cursos.filter((c) => c.status === "concluido").length,
    cursosAdquiridos: cursos.filter((c) => c.adquirido).length,
    cursosDisponiveis: cursos.filter((c) => c.status === "disponivel").length,
    horasAssistidas: cursos.reduce((acc, curso) => {
      if (!curso.adquirido) return acc;
      const horasPorAula =
        Number.parseFloat(curso.duracaoTotal) / curso.aulasTotal;
      return acc + curso.aulasAssistidas * horasPorAula;
    }, 0),
  };


  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        menuItems={menuItems}
      />

      {/* Overlay para mobile - apenas à direita do sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <HeaderMain
          title="Dashboard"
          isAdmin={true}
          onSidebarToggle={() => setSidebarOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {/* Banner Hero */}
          <HeroBanner
            userName="João"
            cursosEmAndamento={estatisticas.cursosAtivos}
            cursosConcluidos={estatisticas.cursosConcluidos}
            isAdmin={isAdmin}
          />

          {/* Estatísticas */}
          <StatsCards
            cursosAdquiridos={estatisticas.cursosAdquiridos}
            cursosAtivos={estatisticas.cursosAtivos}
            cursosConcluidos={estatisticas.cursosConcluidos}
            cursosDisponiveis={estatisticas.cursosDisponiveis}
          />

          {/* Categorias Personalizadas */}
          <Categories
            categorias={categoriasPersonalizadas}
            categoriaSelecionada={categoriaPersonalizadaSelecionada}
            onCategoriaSelect={setCategoriaPersonalizadaSelecionada}
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
          <CoursesTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            cursosFiltrados={cursosFiltrados}
            cursosFavoritos={cursosFavoritos}
            onToggleFavorito={toggleFavorito}
            onCourseClick={handleCourseClick}
          />
        </main>
      </div>

      {/* Modal do Curso */}
      <CourseModal
        curso={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Modal de Configurações */}
      <UserSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Modal de Configurações Admin */}
      <AdminConfigModal
        isOpen={isAdminConfigOpen}
        onClose={() => setIsAdminConfigOpen(false)}
      />
    </div>
  );
}
