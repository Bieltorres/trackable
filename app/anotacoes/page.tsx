"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  PlayCircle,
  FileText,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  BarChart3,
  MessageCircle,
  StickyNote,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { UserSettingsModal } from "@/components/user-settings-modal"
import { AdminConfigModal } from "@/components/admin-config-modal"

// Dados simulados das anotações
const anotacoes = [
  {
    id: 1,
    titulo: "Estratégias de Segmentação",
    conteudo:
      "Pontos importantes sobre segmentação de público:\n\n• Definir personas claras\n• Usar dados demográficos e comportamentais\n• Testar diferentes segmentos\n• Analisar performance por segmento",
    curso: "Marketing Digital Completo",
    aula: "Segmentação de Público Avançada",
    categoria: "Marketing",
    data: "2024-01-20",
    tempo: "15:30",
    duracaoAula: "45min",
    cor: "bg-blue-100",
    corTexto: "text-blue-800",
  },
  {
    id: 2,
    titulo: "Técnicas de Fechamento",
    conteudo:
      "Principais técnicas para fechar vendas:\n\n1. Assumir a venda\n2. Criar urgência genuína\n3. Oferecer alternativas\n4. Usar prova social\n5. Fazer perguntas de confirmação",
    curso: "Vendas de Alto Impacto",
    aula: "Técnicas de Fechamento Avançadas",
    categoria: "Vendas",
    data: "2024-01-22",
    tempo: "28:15",
    duracaoAula: "52min",
    cor: "bg-green-100",
    corTexto: "text-green-800",
  },
  {
    id: 3,
    titulo: "Headlines que Convertem",
    conteudo:
      "Fórmulas de headlines testadas:\n\n• Como [fazer algo] em [tempo] sem [objeção]\n• [Número] maneiras de [benefício]\n• O segredo de [autoridade] para [resultado]\n• Por que [crença comum] está errada",
    curso: "Copywriting Persuasivo",
    aula: "Criando Headlines Irresistíveis",
    categoria: "Copywriting",
    data: "2024-01-25",
    tempo: "12:45",
    duracaoAula: "38min",
    cor: "bg-purple-100",
    corTexto: "text-purple-800",
  },
  {
    id: 4,
    titulo: "Métricas Essenciais",
    conteudo:
      "KPIs mais importantes para acompanhar:\n\n📊 CTR (Click-Through Rate)\n📊 CPC (Custo Por Clique)\n📊 ROAS (Return on Ad Spend)\n📊 LTV (Lifetime Value)\n📊 CAC (Custo de Aquisição)",
    curso: "Marketing Digital Completo",
    aula: "Análise de Métricas e KPIs",
    categoria: "Marketing",
    data: "2024-01-28",
    tempo: "22:10",
    duracaoAula: "41min",
    cor: "bg-blue-100",
    corTexto: "text-blue-800",
  },
  {
    id: 5,
    titulo: "Objeções Comuns",
    conteudo:
      "Como lidar com as principais objeções:\n\n💰 'Está muito caro' → Mostrar valor e ROI\n⏰ 'Não tenho tempo' → Demonstrar economia de tempo\n🤔 'Preciso pensar' → Criar urgência genuína\n❓ 'Não funciona para mim' → Casos de sucesso similares",
    curso: "Vendas de Alto Impacto",
    aula: "Tratamento de Objeções",
    categoria: "Vendas",
    data: "2024-02-01",
    tempo: "35:20",
    duracaoAula: "48min",
    cor: "bg-green-100",
    corTexto: "text-green-800",
  },
  {
    id: 6,
    titulo: "Gatilhos Mentais",
    conteudo:
      "Principais gatilhos para usar em copy:\n\n🔥 Escassez - Limitação de tempo/quantidade\n👥 Prova Social - Depoimentos e números\n⚡ Urgência - Ação imediata necessária\n🎯 Autoridade - Credibilidade do emissor\n💝 Reciprocidade - Dar antes de pedir",
    curso: "Copywriting Persuasivo",
    aula: "Gatilhos Mentais na Prática",
    categoria: "Copywriting",
    data: "2024-02-03",
    tempo: "18:55",
    duracaoAula: "44min",
    cor: "bg-purple-100",
    corTexto: "text-purple-800",
  },
]

const categorias = ["Todas", "Marketing", "Vendas", "Copywriting"]
const cursos = ["Todos", "Marketing Digital Completo", "Vendas de Alto Impacto", "Copywriting Persuasivo"]

// Simular usuário admin
const isAdmin = true

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard", active: false },
  { icon: BarChart3, label: "Progresso", href: "/progresso", active: false },
  { icon: FileText, label: "Anotações", href: "/anotacoes", active: true },
  { icon: MessageCircle, label: "Suporte", href: "/suporte", active: false },
  ...(isAdmin ? [{ icon: Shield, label: "Admin Config", href: "#", active: false, isAdmin: true }] : []),
]

export default function AnotacoesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategoria, setSelectedCategoria] = useState("Todas")
  const [selectedCurso, setSelectedCurso] = useState("Todos")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [anotacaoSelecionada, setAnotacaoSelecionada] = useState<any>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAdminConfigOpen, setIsAdminConfigOpen] = useState(false)

  const handleMenuClick = (item: any) => {
    if (item.isAdmin) {
      setIsAdminConfigOpen(true)
    }
  }

  const anotacoesFiltradas = anotacoes.filter((anotacao) => {
    const matchSearch =
      anotacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anotacao.conteudo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategoria = selectedCategoria === "Todas" || anotacao.categoria === selectedCategoria
    const matchCurso = selectedCurso === "Todos" || anotacao.curso === selectedCurso

    return matchSearch && matchCategoria && matchCurso
  })

  const anotacoesPorPagina = 6
  const totalPaginas = Math.ceil(anotacoesFiltradas.length / anotacoesPorPagina)
  const anotacoesPagina = anotacoesFiltradas.slice(
    (paginaAtual - 1) * anotacoesPorPagina,
    paginaAtual * anotacoesPorPagina,
  )

  const handleIrParaAula = (anotacao: any) => {
    // Simular redirecionamento para a aula
    alert(`Redirecionando para: ${anotacao.curso} - ${anotacao.aula} (${anotacao.tempo})`)
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex overflow-hidden">
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
        </nav>

        {/* User Profile Section */}
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
        <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 h-16 flex items-center justify-between px-4 lg:px-8 flex-shrink-0">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <StickyNote className="h-6 w-6 text-amber-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">Minhas Anotações</h1>
            </div>
            {isAdmin && (
              <Badge className="ml-3 bg-orange-100 text-orange-800">
                <Shield className="h-3 w-3 mr-1" />
                Admin
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
          {/* Header do Caderno */}
          <div className="bg-white rounded-t-xl shadow-lg border-l-4 border-amber-400 p-6 mb-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Caderno de Anotações</h2>
                  <p className="text-gray-600">Suas anotações organizadas por curso e categoria</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total de anotações</p>
                <p className="text-2xl font-bold text-amber-600">{anotacoes.length}</p>
              </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar nas anotações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-amber-50 border-amber-200 focus:border-amber-400"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                  <SelectTrigger className="w-40 bg-amber-50 border-amber-200">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCurso} onValueChange={setSelectedCurso}>
                  <SelectTrigger className="w-48 bg-amber-50 border-amber-200">
                    <SelectValue placeholder="Curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {cursos.map((curso) => (
                      <SelectItem key={curso} value={curso}>
                        {curso}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Páginas do Caderno */}
          <div className="bg-white shadow-lg border-l-4 border-amber-400 min-h-[600px] relative">
            {/* Linhas do caderno */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="border-b border-blue-100 h-8" style={{ top: `${80 + i * 32}px` }} />
              ))}
            </div>

            {/* Margem vermelha */}
            <div className="absolute left-12 top-0 bottom-0 w-px bg-red-300" />

            {/* Conteúdo das Anotações */}
            <div className="relative z-10 p-6 pl-16">
              {anotacoesPagina.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {anotacoesPagina.map((anotacao) => (
                    <Card
                      key={anotacao.id}
                      className="bg-white/90 backdrop-blur-sm border-2 border-dashed border-gray-200 hover:border-amber-300 transition-all duration-300 hover:shadow-md cursor-pointer group"
                      onClick={() => setAnotacaoSelecionada(anotacao)}
                    >
                      <CardContent className="p-4">
                        {/* Header da Anotação */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">
                              {anotacao.titulo}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                              <Calendar className="h-3 w-3" />
                              <span>{formatarData(anotacao.data)}</span>
                              <Clock className="h-3 w-3 ml-2" />
                              <span>{anotacao.tempo}</span>
                            </div>
                          </div>
                          <Badge className={cn("text-xs", anotacao.cor, anotacao.corTexto)}>{anotacao.categoria}</Badge>
                        </div>

                        {/* Conteúdo da Anotação */}
                        <div className="mb-4">
                          <p className="text-sm text-gray-700 line-clamp-4 whitespace-pre-line font-mono">
                            {anotacao.conteudo}
                          </p>
                        </div>

                        {/* Footer da Anotação */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-900">{anotacao.curso}</p>
                            <p className="text-xs text-gray-500">{anotacao.aula}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs hover:bg-amber-50 hover:border-amber-300 bg-transparent"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleIrParaAula(anotacao)
                            }}
                          >
                            <PlayCircle className="h-3 w-3 mr-1" />
                            Ir para aula
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <StickyNote className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma anotação encontrada</h3>
                  <p className="text-gray-500">Tente ajustar os filtros ou fazer novas anotações durante as aulas</p>
                </div>
              )}
            </div>

            {/* Paginação */}
            {totalPaginas > 1 && (
              <div className="flex items-center justify-center gap-2 p-6 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPaginaAtual(Math.max(1, paginaAtual - 1))}
                  disabled={paginaAtual === 1}
                  className="hover:bg-amber-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPaginas)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={paginaAtual === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPaginaAtual(i + 1)}
                      className={cn(
                        "w-8 h-8",
                        paginaAtual === i + 1 ? "bg-amber-600 hover:bg-amber-700" : "hover:bg-amber-50",
                      )}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPaginaAtual(Math.min(totalPaginas, paginaAtual + 1))}
                  disabled={paginaAtual === totalPaginas}
                  className="hover:bg-amber-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Rodapé do Caderno */}
          <div className="bg-white rounded-b-xl shadow-lg border-l-4 border-amber-400 p-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                Página {paginaAtual} de {totalPaginas}
              </span>
              <span>{anotacoesFiltradas.length} anotações encontradas</span>
            </div>
          </div>
        </main>
      </div>
      {/* Modal de Configurações */}
      <UserSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Modal de Configurações Admin */}
      <AdminConfigModal isOpen={isAdminConfigOpen} onClose={() => setIsAdminConfigOpen(false)} />
    </div>
  )
}
