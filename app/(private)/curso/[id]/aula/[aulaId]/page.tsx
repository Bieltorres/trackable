"use client"

import { useState } from "react"
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

// Dados simulados do curso e aulas
const cursoData = {
  id: 1,
  titulo: "Marketing Digital Completo",
  instrutor: "João Silva",
  descricao: "Aprenda estratégias avançadas de marketing digital do zero ao avançado",
  modulos: [
    {
      id: 1,
      titulo: "Fundamentos do Marketing Digital",
      aulas: [
        {
          id: 1,
          titulo: "Introdução ao Marketing Digital",
          duracao: "15:30",
          concluida: true,
          videoUrl: "/placeholder-video.mp4",
          descricao:
            "Nesta aula você aprenderá os conceitos fundamentais do marketing digital e como ele pode transformar seu negócio.",
        },
        {
          id: 2,
          titulo: "Definindo seu Público-Alvo",
          duracao: "22:45",
          concluida: true,
          videoUrl: "/placeholder-video.mp4",
          descricao: "Aprenda a identificar e definir seu público-alvo ideal para suas campanhas de marketing.",
        },
        {
          id: 3,
          titulo: "Criando Personas",
          duracao: "18:20",
          concluida: false,
          videoUrl: "/placeholder-video.mp4",
          descricao: "Como criar personas detalhadas que representem seus clientes ideais.",
        },
      ],
    },
    {
      id: 2,
      titulo: "Estratégias de Conteúdo",
      aulas: [
        {
          id: 4,
          titulo: "Planejamento de Conteúdo",
          duracao: "25:10",
          concluida: false,
          videoUrl: "/placeholder-video.mp4",
          descricao: "Estratégias para planejar e organizar seu calendário de conteúdo.",
        },
        {
          id: 5,
          titulo: "Criação de Conteúdo Viral",
          duracao: "30:15",
          concluida: false,
          videoUrl: "/placeholder-video.mp4",
          descricao: "Técnicas para criar conteúdo que engaja e se espalha naturalmente.",
        },
      ],
    },
    {
      id: 3,
      titulo: "Métricas e Análise",
      aulas: [
        {
          id: 6,
          titulo: "Google Analytics Essencial",
          duracao: "35:40",
          concluida: false,
          videoUrl: "/placeholder-video.mp4",
          descricao: "Como configurar e usar o Google Analytics para acompanhar seus resultados.",
        },
        {
          id: 7,
          titulo: "KPIs e Métricas Importantes",
          duracao: "28:30",
          concluida: false,
          videoUrl: "/placeholder-video.mp4",
          descricao: "Quais métricas realmente importam e como interpretá-las.",
        },
      ],
    },
  ],
}

// Dados da aula atual (simulado)
const aulaAtual = {
  id: 1,
  titulo: "Introdução ao Marketing Digital",
  descricao:
    "Nesta aula você aprenderá os conceitos fundamentais do marketing digital e como ele pode transformar seu negócio.",
  videoUrl: "/placeholder-video.mp4",
  duracao: "15:30",
  materiais: [
    {
      id: 1,
      nome: "Slides da Aula.pdf",
      tipo: "pdf",
      tamanho: "2.5 MB",
      url: "/placeholder.pdf",
    },
    {
      id: 2,
      nome: "Checklist Marketing.xlsx",
      tipo: "excel",
      tamanho: "1.2 MB",
      url: "/placeholder.xlsx",
    },
    {
      id: 3,
      nome: "Template Personas.docx",
      tipo: "word",
      tamanho: "800 KB",
      url: "/placeholder.docx",
    },
  ],
}

// Simular usuário admin
const isAdmin = true

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard", active: false },
  { icon: BarChart3, label: "Progresso", href: "/progresso", active: false },
  { icon: FileText, label: "Anotações", href: "/anotacoes", active: false },
  { icon: MessageCircle, label: "Suporte", href: "/suporte", active: false },
  ...(isAdmin ? [{ icon: Shield, label: "Admin Config", href: "#", active: false, isAdmin: true }] : []),
]

export default function AulaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [modulosAbertos, setModulosAbertos] = useState<number[]>([1])
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [editandoConteudo, setEditandoConteudo] = useState(false)
  const [tituloAula, setTituloAula] = useState(aulaAtual.titulo)
  const [descricaoAula, setDescricaoAula] = useState(aulaAtual.descricao)
  const [novoArquivo, setNovoArquivo] = useState({ nome: "", tipo: "", tamanho: "" })
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAdminConfigOpen, setIsAdminConfigOpen] = useState(false)

  const handleMenuClick = (item: any) => {
    if (item.isAdmin) {
      setIsAdminConfigOpen(true)
    }
  }

  const toggleModulo = (moduloId: number) => {
    setModulosAbertos((prev) => (prev.includes(moduloId) ? prev.filter((id) => id !== moduloId) : [...prev, moduloId]))
  }

  const handleSalvarConteudo = () => {
    // Aqui salvaria as alterações no backend
    console.log("Salvando:", { titulo: tituloAula, descricao: descricaoAula })
    setEditandoConteudo(false)
    alert("Conteúdo salvo com sucesso!")
  }

  const handleAdicionarArquivo = () => {
    if (novoArquivo.nome) {
      // Aqui adicionaria o arquivo no backend
      console.log("Adicionando arquivo:", novoArquivo)
      setNovoArquivo({ nome: "", tipo: "", tamanho: "" })
      alert("Arquivo adicionado com sucesso!")
    }
  }

  const getFileIcon = (tipo: string) => {
    switch (tipo) {
      case "pdf":
        return "📄"
      case "excel":
        return "📊"
      case "word":
        return "📝"
      default:
        return "📁"
    }
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
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster="/placeholder.svg?height=400&width=800&text=Video+Player"
                >
                  <source src={aulaAtual.videoUrl} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
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
                    {aulaAtual.materiais.map((material) => (
                      <div
                        key={material.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{getFileIcon(material.tipo)}</span>
                          <div>
                            <p className="font-medium text-gray-900">{material.nome}</p>
                            <p className="text-sm text-gray-500">{material.tamanho}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Baixar
                        </Button>
                      </div>
                    ))}

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
              <p className="text-sm text-gray-500">por {cursoData.instrutor}</p>
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
                      {modulo.aulas.map((aula) => (
                        <div
                          key={aula.id}
                          className={cn(
                            "p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors",
                            aula.id === 1 && "bg-blue-50 border-l-4 border-l-blue-500",
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center flex-1">
                              {aula.concluida ? (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                              ) : (
                                <PlayCircle className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-gray-900 truncate">{aula.titulo}</p>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{aula.duracao}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
