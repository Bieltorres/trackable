"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  BarChart3,
  FileText,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle,
  PlayCircle,
  Download,
  Plus,
  Upload,
  Save,
  Edit3,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { UserSettingsModal } from "@/components/user-settings-modal"
import { AdminConfigModal } from "@/components/admin-config-modal"
import { useAppSelector } from "@/store/hooks"
import { useToast } from "@/hooks/use-toast"

export default function AulaPage() {
  const params = useParams()
  const { user } = useAppSelector((state) => state.user)
  const { toast } = useToast()
  const isAdmin = user?.role === "admin"
  
  // Estados para dados da API
  const [cursoData, setCursoData] = useState<any>(null)
  const [aulaAtual, setAulaAtual] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Estados existentes
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [modulosAbertos, setModulosAbertos] = useState<number[]>([])
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [editandoConteudo, setEditandoConteudo] = useState(false)
  const [tituloAula, setTituloAula] = useState("")
  const [descricaoAula, setDescricaoAula] = useState("")
  const [novoArquivo, setNovoArquivo] = useState({ nome: "", tipo: "", tamanho: "" })
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAdminConfigOpen, setIsAdminConfigOpen] = useState(false)

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", active: false },
    { icon: BarChart3, label: "Progresso", href: "/progresso", active: false },
    { icon: FileText, label: "Anotações", href: "/anotacoes", active: false },
    { icon: MessageCircle, label: "Suporte", href: "/suporte", active: false },
    ...(isAdmin ? [{ icon: Shield, label: "Admin Config", href: "#", active: false, isAdmin: true }] : []),
  ]

  // Buscar dados da aula
  useEffect(() => {
    const fetchAulaData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/cursos/${params.id}/aula/${params.aulaId}`)
        
        if (!response.ok) {
          throw new Error("Erro ao carregar aula")
        }
        
        const data = await response.json()
        setCursoData(data.curso)
        setAulaAtual(data.aula)
        setTituloAula(data.aula.titulo)
        setDescricaoAula(data.aula.descricao || "")
        
        // Abrir o módulo da aula atual por padrão
        const moduloAtual = data.curso.modulos.find((m: any) => 
          m.aulas.some((a: any) => a.id === data.aula.id)
        )
        if (moduloAtual) {
          setModulosAbertos([moduloAtual.id])
        }
        
      } catch (error) {
        console.error("Erro ao carregar aula:", error)
        toast({
          title: "Erro",
          description: "Erro ao carregar dados da aula",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id && params.aulaId) {
      fetchAulaData()
    }
  }, [params.id, params.aulaId, toast])

  const handleMenuClick = (item: any) => {
    if (item.isAdmin) {
      setIsAdminConfigOpen(true)
    }
  }

  const toggleModulo = (moduloId: number) => {
    setModulosAbertos((prev) => (prev.includes(moduloId) ? prev.filter((id) => id !== moduloId) : [...prev, moduloId]))
  }

  const handleSalvarConteudo = async () => {
    try {
      // TODO: Implementar API para salvar alterações da aula
      console.log("Salvando:", { titulo: tituloAula, descricao: descricaoAula })
      setEditandoConteudo(false)
      toast({
        title: "Sucesso",
        description: "Conteúdo salvo com sucesso!",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar conteúdo",
        variant: "destructive",
      })
    }
  }

  const handleAdicionarArquivo = async () => {
    if (novoArquivo.nome) {
      try {
        // TODO: Implementar API para adicionar arquivo
        console.log("Adicionando arquivo:", novoArquivo)
        setNovoArquivo({ nome: "", tipo: "", tamanho: "" })
        toast({
          title: "Sucesso",
          description: "Arquivo adicionado com sucesso!",
        })
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao adicionar arquivo",
          variant: "destructive",
        })
      }
    }
  }

  const getFileIcon = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "pdf":
        return "📄"
      case "excel":
      case "xlsx":
      case "xls":
        return "📊"
      case "word":
      case "docx":
      case "doc":
        return "📝"
      case "video":
      case "mp4":
      case "avi":
        return "🎥"
      case "image":
      case "jpg":
      case "png":
      case "gif":
        return "🖼️"
      default:
        return "📁"
    }
  }

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!cursoData || !aulaAtual) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Aula não encontrada</h2>
          <p className="text-gray-600 mb-4">A aula que você está procurando não existe ou você não tem acesso a ela.</p>
          <Button asChild>
            <Link href="/dashboard">Voltar ao Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Main Content Area */}
        <main className="flex-1 flex overflow-hidden">
          {/* Video e Conteúdo Principal */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Video Player */}
            <div className="bg-black relative">
              <div className="aspect-video">
                {aulaAtual.videoUrl ? (
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster="/placeholder.svg?height=400&width=800&text=Video+Player"
                  >
                    <source src={aulaAtual.videoUrl} type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <PlayCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Vídeo não disponível</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Conteúdo da Aula */}
            <div className="p-6 space-y-6">
              {/* Título e Descrição */}
              <div className="space-y-4">
                {isAdminMode && editandoConteudo ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Título da Aula</label>
                      <Input
                        value={tituloAula}
                        onChange={(e) => setTituloAula(e.target.value)}
                        className="text-lg font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                      <Textarea
                        value={descricaoAula}
                        onChange={(e) => setDescricaoAula(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSalvarConteudo} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                      <Button variant="outline" onClick={() => setEditandoConteudo(false)} size="sm">
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">{tituloAula}</h1>
                      {isAdminMode && (
                        <Button variant="outline" size="sm" onClick={() => setEditandoConteudo(true)}>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{descricaoAula}</p>
                  </div>
                )}
              </div>

              {/* Materiais da Aula */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Download className="h-5 w-5 mr-2" />
                      Materiais da Aula
                    </CardTitle>
                    {isAdminMode && (
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Material
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aulaAtual.arquivos && aulaAtual.arquivos.length > 0 ? (
                      aulaAtual.arquivos.map((arquivo: any) => (
                        <div
                          key={arquivo.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{getFileIcon(arquivo.tipo)}</span>
                            <div>
                              <p className="font-medium text-gray-900">{arquivo.nome}</p>
                              <p className="text-sm text-gray-500">{arquivo.tamanho || "Tamanho não informado"}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={arquivo.url} download target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 mr-2" />
                              Baixar
                            </a>
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">Nenhum material disponível para esta aula.</p>
                    )}

                    {/* Formulário para adicionar novo arquivo (Admin) */}
                    {isAdminMode && (
                      <div className="border-t pt-4 mt-4">
                        <h4 className="font-medium text-gray-900 mb-3">Adicionar Novo Material</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <Input
                            placeholder="Nome do arquivo"
                            value={novoArquivo.nome}
                            onChange={(e) => setNovoArquivo({ ...novoArquivo, nome: e.target.value })}
                          />
                          <Input
                            placeholder="Tipo (pdf, excel, word)"
                            value={novoArquivo.tipo}
                            onChange={(e) => setNovoArquivo({ ...novoArquivo, tipo: e.target.value })}
                          />
                          <Input
                            placeholder="Tamanho (ex: 2.5 MB)"
                            value={novoArquivo.tamanho}
                            onChange={(e) => setNovoArquivo({ ...novoArquivo, tamanho: e.target.value })}
                          />
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button onClick={handleAdicionarArquivo} size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Adicionar Arquivo
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar das Aulas */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">{cursoData.titulo}</h2>
              <p className="text-sm text-gray-500">por {cursoData.instrutor?.name || "Instrutor não informado"}</p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {cursoData.modulos.map((modulo) => (
                <Collapsible
                  key={modulo.id}
                  open={modulosAbertos.includes(modulo.id)}
                  onOpenChange={() => toggleModulo(modulo.id)}
                >
                  <CollapsibleTrigger className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{modulo.titulo}</h3>
                        <p className="text-sm text-gray-500">{modulo.aulas.length} aulas</p>
                      </div>
                      {modulosAbertos.includes(modulo.id) ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="bg-gray-50">
                      {modulo.aulas.map((aula: any) => (
                        <Link
                          key={aula.id}
                          href={`/curso/${cursoData.id}/aula/${aula.id}`}
                          className={cn(
                            "block p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors",
                            aula.id === aulaAtual.id && "bg-blue-50 border-l-4 border-l-blue-500",
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center flex-1">
                              {/* TODO: Implementar lógica de aula concluída */}
                              <PlayCircle className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-gray-900 truncate">{aula.titulo}</p>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{aula.duracao || "Duração não informada"}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
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
