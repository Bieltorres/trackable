"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  BookOpen,
  Award,
  User,
  Settings,
  LogOut,
  Search,
  Star,
  TrendingUp,
  CheckCircle,
  PlayCircle,
  Home,
  BarChart3,
  FileText,
  MessageCircle,
  Menu,
  X,
  Heart,
  Youtube,
  BarChart,
  Zap,
  ChevronRight,
  Plus,
  ShoppingCart,
  Crown,
  Sparkles,
  Shield,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { CourseModal } from "@/components/course-modal"
import Link from "next/link"
import { UserSettingsModal } from "@/components/user-settings-modal"
import { AdminConfigModal } from "@/components/admin-config-modal"

// Expandir os dados dos cursos para incluir cursos disponíveis para compra
const cursos = [
  // Cursos já adquiridos pelo usuário
  {
    id: 1,
    titulo: "Marketing Digital Completo",
    descricao: "Aprenda estratégias avançadas de marketing digital do zero ao avançado",
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
    descricao: "Domine Facebook Ads, Google Ads e outras plataformas de anúncios pagos",
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
    descricao: "Construa funis que vendem 24/7 no automático usando as melhores ferramentas",
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
    descricao: "Estratégias avançadas para aumentar abertura, cliques e conversões por email",
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
    descricao: "Como criar um canal de sucesso e monetizar seu conteúdo no YouTube",
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
    descricao: "Domine Google Analytics, Facebook Pixel e outras ferramentas de análise",
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
]

const categorias = ["Todos", "Marketing", "Vendas", "Copywriting"]
const niveis = ["Todos", "Iniciante", "Intermediário", "Avançado"]

const categoriasPersonalizadas = [
  {
    nome: "Material do Youtube",
    icon: Youtube,
    cor: "bg-red-500",
    descricao: "Conteúdos exclusivos e materiais complementares",
    cursos: cursos.filter((c) => c.categoriaPersonalizada === "Material do Youtube").length,
  },
  {
    nome: "Trackeamento",
    icon: BarChart,
    cor: "bg-blue-500",
    descricao: "Ferramentas e estratégias de análise",
    cursos: cursos.filter((c) => c.categoriaPersonalizada === "Trackeamento").length,
  },
  {
    nome: "Automações",
    icon: Zap,
    cor: "bg-yellow-500",
    descricao: "Sistemas automatizados para otimizar processos",
    cursos: cursos.filter((c) => c.categoriaPersonalizada === "Automações").length,
  },
]

// Simular usuário admin (em produção viria do contexto/auth)
const isAdmin = true

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
  { icon: BarChart3, label: "Progresso", href: "/progresso", active: false },
  { icon: FileText, label: "Anotações", href: "/anotacoes", active: false },
  { icon: MessageCircle, label: "Suporte", href: "/suporte", active: false },
  ...(isAdmin ? [{ icon: Shield, label: "Admin Config", href: "#", active: false, isAdmin: true }] : []),
]

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedNivel, setSelectedNivel] = useState("Todos")
  const [activeTab, setActiveTab] = useState("todos")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cursosFavoritos, setCursosFavoritos] = useState<number[]>([])
  const [categoriaPersonalizadaSelecionada, setCategoriaPersonalizadaSelecionada] = useState<string | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAdminConfigOpen, setIsAdminConfigOpen] = useState(false)

  const toggleFavorito = (cursoId: number) => {
    setCursosFavoritos((prev) => (prev.includes(cursoId) ? prev.filter((id) => id !== cursoId) : [...prev, cursoId]))
  }

  const handleCourseClick = (curso: any) => {
    if (curso.adquirido) {
      // Se o curso já foi adquirido, redireciona para a página de aulas
      window.location.href = `/curso/${curso.id}/aula/1`
    } else {
      // Se não foi adquirido, abre o modal de compra
      setSelectedCourse(curso)
      setIsModalOpen(true)
    }
  }

  const handleMenuClick = (item: any) => {
    if (item.isAdmin) {
      setIsAdminConfigOpen(true)
    }
  }

  const cursosFiltrados = cursos.filter((curso) => {
    const matchSearch = curso.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = selectedCategory === "Todos" || curso.categoria === selectedCategory
    const matchNivel = selectedNivel === "Todos" || curso.nivel === selectedNivel
    const matchCategoriaPersonalizada =
      !categoriaPersonalizadaSelecionada || curso.categoriaPersonalizada === categoriaPersonalizadaSelecionada

    let matchTab = true
    if (activeTab === "meus-cursos") matchTab = curso.adquirido
    if (activeTab === "em-andamento") matchTab = curso.status === "em-andamento"
    if (activeTab === "concluidos") matchTab = curso.status === "concluido"
    if (activeTab === "disponivel") matchTab = curso.status === "disponivel"
    if (activeTab === "nao-iniciados") matchTab = curso.status === "nao-iniciado"
    if (activeTab === "todos") matchTab = true

    return matchSearch && matchCategory && matchNivel && matchTab && matchCategoriaPersonalizada
  })

  const cursosFavoritosData = cursos.filter((curso) => cursosFavoritos.includes(curso.id))

  const estatisticas = {
    cursosAtivos: cursos.filter((c) => c.status === "em-andamento").length,
    cursosConcluidos: cursos.filter((c) => c.status === "concluido").length,
    cursosAdquiridos: cursos.filter((c) => c.adquirido).length,
    cursosDisponiveis: cursos.filter((c) => c.status === "disponivel").length,
    horasAssistidas: cursos.reduce((acc, curso) => {
      if (!curso.adquirido) return acc
      const horasPorAula = Number.parseFloat(curso.duracaoTotal) / curso.aulasTotal
      return acc + curso.aulasAssistidas * horasPorAula
    }, 0),
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Concluído
          </Badge>
        )
      case "em-andamento":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <PlayCircle className="h-3 w-3 mr-1" />
            Em Andamento
          </Badge>
        )
      case "nao-iniciado":
        return <Badge variant="outline">Não Iniciado</Badge>
      default:
        return null
    }
  }

  const getSpecialBadges = (curso: any) => {
    const badges = []

    if (curso.bestseller) {
      badges.push(
        <Badge key="bestseller" className="bg-orange-100 text-orange-800 text-xs">
          <Crown className="h-3 w-3 mr-1" />
          Bestseller
        </Badge>,
      )
    }

    if (curso.novo) {
      badges.push(
        <Badge key="novo" className="bg-green-100 text-green-800 text-xs">
          <Sparkles className="h-3 w-3 mr-1" />
          Novo
        </Badge>,
      )
    }

    return badges
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-400" />
            <span className="ml-2 text-lg font-semibold">TrackAble</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-slate-800"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          {/* Menu Principal */}
          <ul className="space-y-2 mb-6">
            {menuItems.map((item) => (
              <li key={item.label}>
                {item.isAdmin ? (
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={cn(
                      "w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                      item.active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white hover:shadow-md",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 mr-3", item.active ? "text-white" : "text-slate-400")} />
                    {item.label}
                    {item.isAdmin && <Badge className="ml-auto bg-orange-500 text-white text-xs">ADMIN</Badge>}
                  </button>
                ) : (
                  <Link href={item.href}>
                    <button
                      className={cn(
                        "w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                        item.active
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white hover:shadow-md",
                      )}
                    >
                      <item.icon className={cn("h-5 w-5 mr-3", item.active ? "text-white" : "text-slate-400")} />
                      {item.label}
                    </button>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Cursos Favoritos */}
          {cursosFavoritosData.length > 0 && (
            <div className="border-t border-slate-700 pt-4">
              <div className="flex items-center px-4 mb-3">
                <Heart className="h-4 w-4 text-red-400 mr-2" />
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cursos Favoritos</span>
              </div>
              <ul className="space-y-1">
                {cursosFavoritosData.map((curso) => (
                  <li key={`fav-${curso.id}`}>
                    <button
                      className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group"
                      title={curso.titulo}
                    >
                      <div className="h-2 w-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="truncate text-left">{curso.titulo}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        {/* User Profile Section - Fixed at bottom */}
        <div className="border-t border-slate-700 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-slate-600">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">João Silva</p>
                <p className="text-xs text-slate-400">joao@email.com</p>
                {isAdmin && <Badge className="bg-orange-500 text-white text-xs mt-1">ADMIN</Badge>}
              </div>
            </div>

            {/* Settings Icon */}
            <button
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-4 lg:px-8 flex-shrink-0">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            {isAdmin && (
              <Badge className="ml-3 bg-orange-100 text-orange-800">
                <Shield className="h-3 w-3 mr-1" />
                Modo Administrador
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {/* Banner Hero */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Bem-vindo de volta, João!</h2>
                <p className="text-blue-100 mb-4">Continue seu aprendizado e alcance seus objetivos</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>3 cursos em andamento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>1 curso concluído</span>
                  </div>
                  {isAdmin && (
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Acesso administrativo</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 flex-shrink-0">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Meus Cursos</p>
                  <p className="text-2xl font-bold">{estatisticas.cursosAdquiridos}</p>
                  <p className="text-xs text-muted-foreground">Cursos adquiridos</p>
                </div>
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                  <p className="text-2xl font-bold">{estatisticas.cursosAtivos}</p>
                  <p className="text-xs text-muted-foreground">Estudando agora</p>
                </div>
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Concluídos</p>
                  <p className="text-2xl font-bold">{estatisticas.cursosConcluidos}</p>
                  <p className="text-xs text-muted-foreground">Finalizados</p>
                </div>
                <Award className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Disponíveis</p>
                  <p className="text-2xl font-bold">{estatisticas.cursosDisponiveis}</p>
                  <p className="text-xs text-muted-foreground">Para adquirir</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>
          </div>

          {/* Categorias Personalizadas */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Categorias</h3>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Categoria
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categoriasPersonalizadas.map((categoria) => (
                <Card
                  key={categoria.nome}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-lg",
                    categoriaPersonalizadaSelecionada === categoria.nome ? "ring-2 ring-blue-500" : "",
                  )}
                  onClick={() =>
                    setCategoriaPersonalizadaSelecionada(
                      categoriaPersonalizadaSelecionada === categoria.nome ? null : categoria.nome,
                    )
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={cn("p-2 rounded-lg", categoria.cor)}>
                        <categoria.icon className="h-5 w-5 text-white" />
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{categoria.nome}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{categoria.descricao}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{categoria.cursos} cursos</span>
                      {categoriaPersonalizadaSelecionada === categoria.nome && (
                        <Badge variant="secondary" className="text-xs">
                          Selecionado
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Filtros e Busca */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4 flex-shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
              <select
                value={selectedNivel}
                onChange={(e) => setSelectedNivel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {niveis.map((nivel) => (
                  <option key={nivel} value={nivel}>
                    {nivel}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabs de Organização */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-5 flex-shrink-0">
              <TabsTrigger value="todos">Todos ({cursosFiltrados.length})</TabsTrigger>
              <TabsTrigger value="meus-cursos">
                Meus Cursos ({cursosFiltrados.filter((c) => c.adquirido).length})
              </TabsTrigger>
              <TabsTrigger value="em-andamento">
                Em Andamento ({cursosFiltrados.filter((c) => c.status === "em-andamento").length})
              </TabsTrigger>
              <TabsTrigger value="concluidos">
                Concluídos ({cursosFiltrados.filter((c) => c.status === "concluido").length})
              </TabsTrigger>
              <TabsTrigger value="disponivel">
                Disponíveis ({cursosFiltrados.filter((c) => c.status === "disponivel").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="flex-1 mt-4">
              {/* Lista de Cursos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                {cursosFiltrados.map((curso) => (
                  <Card
                    key={curso.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer relative h-80"
                    onClick={() => handleCourseClick(curso)}
                  >
                    {/* Imagem de fundo que preenche todo o card */}
                    <div className="absolute inset-0">
                      <img
                        src={curso.thumbnail || "/placeholder.svg"}
                        alt={curso.titulo}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay gradient para melhor legibilidade */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    {/* Badges no topo */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                      <div className="flex flex-col gap-2">
                        {/* Badges especiais */}
                        {curso.adquirido ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorito(curso.id)
                            }}
                            className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors self-start"
                            title={
                              cursosFavoritos.includes(curso.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"
                            }
                          >
                            <Heart
                              className={cn(
                                "h-4 w-4 transition-colors",
                                cursosFavoritos.includes(curso.id)
                                  ? "text-red-500 fill-red-500"
                                  : "text-white hover:text-red-300",
                              )}
                            />
                          </button>
                        ) : (
                          <div className="flex flex-col gap-1">{getSpecialBadges(curso)}</div>
                        )}
                      </div>

                      {/* Status badge */}
                      <div>
                        {curso.adquirido ? (
                          getStatusBadge(curso.status)
                        ) : (
                          <Badge className="bg-green-500 text-white shadow-lg">
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Disponível
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Conteúdo na parte inferior */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                      {/* Título e descrição */}
                      <div className="mb-3">
                        <h3 className="text-lg font-bold mb-1 line-clamp-2 leading-tight">{curso.titulo}</h3>
                        <p className="text-sm text-gray-200 line-clamp-2 mb-2">{curso.descricao}</p>

                        {/* Avaliação e instrutor - apenas quando disponível */}
                        {curso.avaliacao && (
                          <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {curso.avaliacao}
                            </span>
                            <span>•</span>
                            <span>{curso.instrutor}</span>
                          </div>
                        )}
                      </div>

                      {/* Ação */}
                      <div className="flex items-center justify-between">
                        {!curso.adquirido ? (
                          <>
                            <div className="flex items-center gap-4 text-sm text-gray-300">
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                {curso.aulasTotal} aulas
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {curso.duracaoTotal}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 shadow-lg"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCourseClick(curso)
                              }}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Adquirir
                            </Button>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-4 text-sm text-gray-300">
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                {curso.aulasAssistidas}/{curso.aulasTotal} aulas
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {curso.duracaoTotal}
                              </span>
                            </div>

                            {curso.progresso > 0 && (
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-700 rounded-full h-2">
                                  <div
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${curso.progresso}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-300">{curso.progresso}%</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5" />
                  </Card>
                ))}
              </div>

              {cursosFiltrados.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum curso encontrado</h3>
                  <p className="text-muted-foreground">Tente ajustar os filtros ou termo de busca</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Modal do Curso */}
      <CourseModal curso={selectedCourse} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Modal de Configurações */}
      <UserSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Modal de Configurações Admin */}
      <AdminConfigModal isOpen={isAdminConfigOpen} onClose={() => setIsAdminConfigOpen(false)} />
    </div>
  )
}
