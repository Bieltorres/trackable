"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  PlayCircle,
  FileText,
  Home,
  BarChart3,
  MessageCircle,
  StickyNote,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { UserSettingsModal } from "@/components/user-settings-modal"
import { AdminConfigModal } from "@/components/admin-config-modal"

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
  const [anotacoes, setAnotacoes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategoria, setSelectedCategoria] = useState("Todas")
  const [selectedCurso, setSelectedCurso] = useState("Todos")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [anotacaoSelecionada, setAnotacaoSelecionada] = useState<any>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAdminConfigOpen, setIsAdminConfigOpen] = useState(false)

  useEffect(() => {
    const fetchAnotacoes = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/anotacoes")

        if (!response.ok) {
          throw new Error("Não foi possível carregar suas anotações.")
        }

        const payload = await response.json()
        const data: any[] = payload?.data ?? []

        const mapped = data.map((item) => {
          const createdAt =
            item.dataCriacao || item.createdAt || item.updatedAt || new Date().toISOString()
          const dataObj = new Date(createdAt)
          const cursoTitulo = item.curso?.titulo ?? "Curso nao informado"
          const categoriaNome = item.curso?.categoria?.nome ?? "Geral"
          const aulaTitulo = item.aula?.titulo ?? "Aula nao informada"

          return {
            id: item.id,
            titulo: item.titulo,
            conteudo: item.conteudo,
            cursoId: item.curso?.id ?? null,
            curso: cursoTitulo,
            aulaId: item.aula?.id ?? null,
            aula: aulaTitulo,
            categoria: categoriaNome,
            data: createdAt,
            tempo: dataObj.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            duracaoAula: item.duracaoAula ?? "",
            cor: item.cor || "bg-amber-100",
            corTexto: item.corTexto || "text-amber-900",
          }
        })

        setAnotacoes(mapped)
        setError(null)
      } catch (err) {
        console.error("Erro ao carregar anotações:", err)
        setError(
          err instanceof Error ? err.message : "Erro inesperado ao carregar suas anotações.",
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnotacoes()
  }, [])

  const categorias = useMemo(() => {
    const unique = new Set<string>()
    anotacoes.forEach((anotacao) => {
      if (anotacao.categoria) {
        unique.add(anotacao.categoria)
      }
    })
    return ["Todas", ...Array.from(unique).sort()]
  }, [anotacoes])

  const cursos = useMemo(() => {
    const unique = new Set<string>()
    anotacoes.forEach((anotacao) => {
      if (anotacao.curso) {
        unique.add(anotacao.curso)
      }
    })
    return ["Todos", ...Array.from(unique).sort()]
  }, [anotacoes])

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
  const totalPaginas = Math.max(1, Math.ceil(anotacoesFiltradas.length / anotacoesPorPagina))
  const anotacoesPagina = anotacoesFiltradas.slice(
    (paginaAtual - 1) * anotacoesPorPagina,
    paginaAtual * anotacoesPorPagina,
  )

  useEffect(() => {
    if (paginaAtual > totalPaginas) {
      setPaginaAtual(totalPaginas)
    }
  }, [paginaAtual, totalPaginas])

  const handleIrParaAula = (anotacao: any) => {
    if (!anotacao.cursoId) {
      alert(`Curso nao informado para a anotacao "${anotacao.titulo}".`)
      return
    }

    const destino = anotacao.aulaId
      ? `/curso/${anotacao.cursoId}/aula/${anotacao.aulaId}`
      : `/curso/${anotacao.cursoId}`

    window.location.href = destino
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

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">        
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
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setPaginaAtual(1)
                  }}
                  className="pl-10 bg-amber-50 border-amber-200 focus:border-amber-400"
                />
              </div>
              <div className="flex gap-2">
                <Select
                  value={selectedCategoria}
                  onValueChange={(value) => {
                    setSelectedCategoria(value)
                    setPaginaAtual(1)
                  }}
                >
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
                <Select
                  value={selectedCurso}
                  onValueChange={(value) => {
                    setSelectedCurso(value)
                    setPaginaAtual(1)
                  }}
                >
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
              {isLoading ? (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Card
                      key={index}
                      className="h-44 animate-pulse border-2 border-dashed border-amber-100 bg-amber-50/80"
                    >
                      <CardContent />
                    </Card>
                  ))}
                </div>
              ) : error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
                  {error}
                </div>
              ) : anotacoesPagina.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
