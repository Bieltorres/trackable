"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { StudentDetailsModal } from "./student-details-modal"
import {
  Settings,
  BookOpen,
  Video,
  CreditCard,
  Users,
  Search,
  Download,
  Plus,
  Eye,
  X,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit3,
  Trash2,
  Save,
  Upload,
  Play,
  Folder,
} from "lucide-react"

interface AdminConfigModalProps {
  isOpen: boolean
  onClose: () => void
}

// Dados simulados das aulas
const aulasSimuladas = [
  {
    id: 1,
    titulo: "Introdução ao Marketing Digital",
    descricao: "Conceitos fundamentais do marketing digital e sua importância no mundo atual.",
    videoUrl: "https://youtube.com/watch?v=abc123",
    videoPlataforma: "youtube",
    duracao: "15:30",
    arquivos: [
      { id: 1, nome: "Slides Introdução.pdf", tamanho: "2.5 MB", tipo: "pdf" },
      { id: 2, nome: "Checklist Marketing.xlsx", tamanho: "1.2 MB", tipo: "excel" },
    ],
    modulosVinculados: [1, 2],
  },
  {
    id: 2,
    titulo: "Definindo Personas",
    descricao: "Como criar personas detalhadas para suas campanhas de marketing.",
    videoUrl: "https://vimeo.com/123456789",
    videoPlataforma: "vimeo",
    duracao: "22:45",
    arquivos: [{ id: 3, nome: "Template Personas.docx", tamanho: "800 KB", tipo: "word" }],
    modulosVinculados: [1],
  },
]

// Dados simulados dos módulos
const modulosSimulados = [
  {
    id: 1,
    titulo: "Fundamentos do Marketing",
    descricao: "Módulo introdutório sobre os conceitos básicos do marketing digital.",
    aulas: [1, 2],
    cursosVinculados: [1, 2],
    ordem: 1,
  },
  {
    id: 2,
    titulo: "Estratégias Avançadas",
    descricao: "Técnicas avançadas para otimizar suas campanhas de marketing.",
    aulas: [1],
    cursosVinculados: [1],
    ordem: 2,
  },
]

// Dados simulados dos cursos
const cursosSimulados = [
  {
    id: 1,
    titulo: "Marketing Digital Completo",
    descricao: "Curso completo de marketing digital do básico ao avançado.",
    instrutor: "João Silva",
    categoria: "Marketing",
    preco: 297,
    status: "ativo",
    modulos: [1, 2],
    thumbnail: "/placeholder.svg?height=100&width=150",
    dataLancamento: "2024-01-15",
  },
  {
    id: 2,
    titulo: "Fundamentos de Marketing",
    descricao: "Curso básico para iniciantes em marketing digital.",
    instrutor: "Maria Santos",
    categoria: "Marketing",
    preco: 197,
    status: "ativo",
    modulos: [1],
    thumbnail: "/placeholder.svg?height=100&width=150",
    dataLancamento: "2024-02-01",
  },
]

// Dados simulados dos alunos
const alunosSimulados = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana@email.com",
    telefone: "+55 (11) 99999-1111",
    dataRegistro: "2024-01-09",
    ultimoAcesso: "2024-01-27",
    cursos: 3,
    status: "ativo",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    nome: "Carlos Santos",
    email: "carlos@email.com",
    telefone: "+55 (11) 99999-2222",
    dataRegistro: "2024-01-14",
    ultimoAcesso: "2024-01-26",
    cursos: 2,
    status: "ativo",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    nome: "Mariana Costa",
    email: "mariana@email.com",
    telefone: "+55 (11) 99999-3333",
    dataRegistro: "2024-01-31",
    ultimoAcesso: "2024-01-19",
    cursos: 1,
    status: "suspenso",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Dados simulados dos cursos para filtro
const cursosDisponiveis = [
  { id: 1, titulo: "Marketing Digital Completo" },
  { id: 2, titulo: "Vendas de Alto Impacto" },
  { id: 3, titulo: "Copywriting Persuasivo" },
  { id: 4, titulo: "Gestão de Tráfego Pago" },
  { id: 5, titulo: "Funil de Vendas Automatizado" },
]

export function AdminConfigModal({ isOpen, onClose }: AdminConfigModalProps) {
  const [activeTab, setActiveTab] = useState("cursos")
  const [courseManagementTab, setCourseManagementTab] = useState("aulas")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [cursoFilter, setCursoFilter] = useState("todos")
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Estados para formulários
  const [novaAula, setNovaAula] = useState({
    titulo: "",
    descricao: "",
    videoUrl: "",
    videoPlataforma: "",
    arquivos: [],
  })

  const [novoModulo, setNovoModulo] = useState({
    titulo: "",
    descricao: "",
    aulasSelecionadas: [],
  })

  const [novoCurso, setNovoCurso] = useState({
    titulo: "",
    descricao: "",
    instrutor: "",
    categoria: "",
    preco: "",
    modulosSelecionados: [],
  })

  // Plataformas de streaming ativas (simulado)
  const plataformasAtivas = ["youtube", "vimeo", "wistia"]

  // Plataformas de streaming selecionadas
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["youtube", "vimeo"])

  // Configurações de pagamento
  const [paymentPlatforms, setPaymentPlatforms] = useState({
    stripe: { enabled: true, webhookUrl: "", secretKey: "" },
    pagarme: { enabled: false, webhookUrl: "", secretKey: "" },
    ticto: { enabled: true, webhookUrl: "", secretKey: "" },
  })

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms((prev) => (prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]))
  }

  const handlePaymentToggle = (platform: string) => {
    setPaymentPlatforms((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], enabled: !prev[platform].enabled },
    }))
  }

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student)
    setIsStudentModalOpen(true)
  }

  const handleCloseStudentModal = () => {
    setIsStudentModalOpen(false)
    setSelectedStudent(null)
  }

  // Funções para gerenciamento de cursos
  const handleSalvarAula = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setNovaAula({ titulo: "", descricao: "", videoUrl: "", videoPlataforma: "", arquivos: [] })
    alert("Aula salva com sucesso!")
  }

  const handleSalvarModulo = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setNovoModulo({ titulo: "", descricao: "", aulasSelecionadas: [] })
    alert("Módulo salvo com sucesso!")
  }

  const handleSalvarCurso = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setNovoCurso({ titulo: "", descricao: "", instrutor: "", categoria: "", preco: "", modulosSelecionados: [] })
    alert("Curso salvo com sucesso!")
  }

  const handleExcluirAula = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta aula?")) {
      alert("Aula excluída com sucesso!")
    }
  }

  const handleExcluirModulo = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este módulo?")) {
      alert("Módulo excluído com sucesso!")
    }
  }

  const handleExcluirCurso = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este curso?")) {
      alert("Curso excluído com sucesso!")
    }
  }

  // Filtrar alunos
  const alunosFiltrados = alunosSimulados.filter((aluno) => {
    const matchesSearch =
      aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || aluno.status === statusFilter
    const matchesCurso = cursoFilter === "todos" // Simplificado para o exemplo

    return matchesSearch && matchesStatus && matchesCurso
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Ativo
          </Badge>
        )
      case "suspenso":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Suspenso
          </Badge>
        )
      case "pendente":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        )
      default:
        return null
    }
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações de Administrador
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cursos" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Gerenciamento de Cursos
              </TabsTrigger>
              <TabsTrigger value="streaming" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Streaming de Vídeo
              </TabsTrigger>
              <TabsTrigger value="pagamentos" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Pagamentos
              </TabsTrigger>
              <TabsTrigger value="alunos" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Gerenciamento de Alunos
              </TabsTrigger>
            </TabsList>

            {/* Gerenciamento de Cursos */}
            <TabsContent value="cursos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Cursos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={courseManagementTab} onValueChange={setCourseManagementTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="aulas" className="flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        Aulas
                      </TabsTrigger>
                      <TabsTrigger value="modulos" className="flex items-center gap-2">
                        <Folder className="h-4 w-4" />
                        Módulos
                      </TabsTrigger>
                      <TabsTrigger value="cursos" className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Cursos
                      </TabsTrigger>
                    </TabsList>

                    {/* Gerenciamento de Aulas */}
                    <TabsContent value="aulas" className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Aulas</h3>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Nova Aula
                        </Button>
                      </div>

                      {/* Lista de Aulas */}
                      <div className="space-y-4">
                        {aulasSimuladas.map((aula) => (
                          <Card key={aula.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className="w-20 h-14 bg-gray-100 rounded flex items-center justify-center">
                                  <Play className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-lg">{aula.titulo}</h4>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline">{aula.videoPlataforma}</Badge>
                                      <Badge variant="secondary">{aula.duracao}</Badge>
                                    </div>
                                  </div>
                                  <p className="text-muted-foreground mb-3">{aula.descricao}</p>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                    <span>📁 {aula.arquivos.length} arquivos</span>
                                    <span>📚 {aula.modulosVinculados.length} módulos vinculados</span>
                                  </div>
                                  {aula.arquivos.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                      {aula.arquivos.map((arquivo) => (
                                        <Badge key={arquivo.id} variant="outline" className="text-xs">
                                          {getFileIcon(arquivo.tipo)} {arquivo.nome}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Edit3 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleExcluirAula(aula.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Formulário Nova Aula */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Adicionar Nova Aula</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="titulo-aula">Título da Aula</Label>
                              <Input
                                id="titulo-aula"
                                value={novaAula.titulo}
                                onChange={(e) => setNovaAula({ ...novaAula, titulo: e.target.value })}
                                placeholder="Ex: Introdução ao Marketing Digital"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="plataforma-video">Plataforma de Vídeo</Label>
                              <Select
                                value={novaAula.videoPlataforma}
                                onValueChange={(value) => setNovaAula({ ...novaAula, videoPlataforma: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione a plataforma" />
                                </SelectTrigger>
                                <SelectContent>
                                  {plataformasAtivas.map((plataforma) => (
                                    <SelectItem key={plataforma} value={plataforma}>
                                      {plataforma.charAt(0).toUpperCase() + plataforma.slice(1)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="video-url">URL do Vídeo</Label>
                            <Input
                              id="video-url"
                              value={novaAula.videoUrl}
                              onChange={(e) => setNovaAula({ ...novaAula, videoUrl: e.target.value })}
                              placeholder="https://youtube.com/watch?v=..."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="descricao-aula">Descrição</Label>
                            <Textarea
                              id="descricao-aula"
                              rows={3}
                              value={novaAula.descricao}
                              onChange={(e) => setNovaAula({ ...novaAula, descricao: e.target.value })}
                              placeholder="Descreva o conteúdo da aula..."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Arquivos da Aula</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Arraste arquivos aqui ou clique para selecionar</p>
                              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                                Selecionar Arquivos
                              </Button>
                            </div>
                          </div>
                          <Button onClick={handleSalvarAula} disabled={isLoading}>
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Salvando...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                Salvar Aula
                              </div>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Gerenciamento de Módulos */}
                    <TabsContent value="modulos" className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Módulos</h3>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Novo Módulo
                        </Button>
                      </div>

                      {/* Lista de Módulos */}
                      <div className="space-y-4">
                        {modulosSimulados.map((modulo) => (
                          <Card key={modulo.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Folder className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-lg">{modulo.titulo}</h4>
                                    <Badge variant="outline">Ordem: {modulo.ordem}</Badge>
                                  </div>
                                  <p className="text-muted-foreground mb-3">{modulo.descricao}</p>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>🎥 {modulo.aulas.length} aulas</span>
                                    <span>📚 {modulo.cursosVinculados.length} cursos vinculados</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Edit3 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleExcluirModulo(modulo.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Formulário Novo Módulo */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Adicionar Novo Módulo</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="titulo-modulo">Título do Módulo</Label>
                            <Input
                              id="titulo-modulo"
                              value={novoModulo.titulo}
                              onChange={(e) => setNovoModulo({ ...novoModulo, titulo: e.target.value })}
                              placeholder="Ex: Fundamentos do Marketing"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="descricao-modulo">Descrição</Label>
                            <Textarea
                              id="descricao-modulo"
                              rows={3}
                              value={novoModulo.descricao}
                              onChange={(e) => setNovoModulo({ ...novoModulo, descricao: e.target.value })}
                              placeholder="Descreva o conteúdo do módulo..."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Aulas do Módulo</Label>
                            <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                              {aulasSimuladas.map((aula) => (
                                <div key={aula.id} className="flex items-center space-x-2 py-2">
                                  <Checkbox
                                    id={`aula-${aula.id}`}
                                    checked={novoModulo.aulasSelecionadas.includes(aula.id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setNovoModulo({
                                          ...novoModulo,
                                          aulasSelecionadas: [...novoModulo.aulasSelecionadas, aula.id],
                                        })
                                      } else {
                                        setNovoModulo({
                                          ...novoModulo,
                                          aulasSelecionadas: novoModulo.aulasSelecionadas.filter(
                                            (id) => id !== aula.id,
                                          ),
                                        })
                                      }
                                    }}
                                  />
                                  <Label htmlFor={`aula-${aula.id}`} className="flex-1 cursor-pointer">
                                    <div className="flex items-center gap-2">
                                      <Play className="h-4 w-4 text-gray-400" />
                                      <span>{aula.titulo}</span>
                                      <Badge variant="outline" className="text-xs">
                                        {aula.duracao}
                                      </Badge>
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Button onClick={handleSalvarModulo} disabled={isLoading}>
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Salvando...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                Salvar Módulo
                              </div>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Gerenciamento de Cursos */}
                    <TabsContent value="cursos" className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Cursos</h3>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Novo Curso
                        </Button>
                      </div>

                      {/* Lista de Cursos */}
                      <div className="space-y-4">
                        {cursosSimulados.map((curso) => (
                          <Card key={curso.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <img
                                  src={curso.thumbnail || "/placeholder.svg"}
                                  alt={curso.titulo}
                                  className="w-20 h-14 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-lg">{curso.titulo}</h4>
                                    {getStatusBadge(curso.status)}
                                  </div>
                                  <p className="text-muted-foreground mb-3">{curso.descricao}</p>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                                    <div>
                                      <span className="font-medium">Instrutor:</span> {curso.instrutor}
                                    </div>
                                    <div>
                                      <span className="font-medium">Categoria:</span> {curso.categoria}
                                    </div>
                                    <div>
                                      <span className="font-medium">Módulos:</span> {curso.modulos.length}
                                    </div>
                                    <div>
                                      <span className="font-medium">Preço:</span> R$ {curso.preco}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Edit3 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleExcluirCurso(curso.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Formulário Novo Curso */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Adicionar Novo Curso</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="titulo-curso">Título do Curso</Label>
                              <Input
                                id="titulo-curso"
                                value={novoCurso.titulo}
                                onChange={(e) => setNovoCurso({ ...novoCurso, titulo: e.target.value })}
                                placeholder="Ex: Marketing Digital Completo"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="instrutor-curso">Instrutor</Label>
                              <Input
                                id="instrutor-curso"
                                value={novoCurso.instrutor}
                                onChange={(e) => setNovoCurso({ ...novoCurso, instrutor: e.target.value })}
                                placeholder="Nome do instrutor"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="categoria-curso">Categoria</Label>
                              <Select
                                value={novoCurso.categoria}
                                onValueChange={(value) => setNovoCurso({ ...novoCurso, categoria: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="marketing">Marketing</SelectItem>
                                  <SelectItem value="vendas">Vendas</SelectItem>
                                  <SelectItem value="copywriting">Copywriting</SelectItem>
                                  <SelectItem value="design">Design</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="preco-curso">Preço (R$)</Label>
                              <Input
                                id="preco-curso"
                                type="number"
                                value={novoCurso.preco}
                                onChange={(e) => setNovoCurso({ ...novoCurso, preco: e.target.value })}
                                placeholder="297"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="descricao-curso">Descrição</Label>
                            <Textarea
                              id="descricao-curso"
                              rows={3}
                              value={novoCurso.descricao}
                              onChange={(e) => setNovoCurso({ ...novoCurso, descricao: e.target.value })}
                              placeholder="Descreva o curso..."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Módulos do Curso</Label>
                            <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                              {modulosSimulados.map((modulo) => (
                                <div key={modulo.id} className="flex items-center space-x-2 py-2">
                                  <Checkbox
                                    id={`modulo-${modulo.id}`}
                                    checked={novoCurso.modulosSelecionados.includes(modulo.id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setNovoCurso({
                                          ...novoCurso,
                                          modulosSelecionados: [...novoCurso.modulosSelecionados, modulo.id],
                                        })
                                      } else {
                                        setNovoCurso({
                                          ...novoCurso,
                                          modulosSelecionados: novoCurso.modulosSelecionados.filter(
                                            (id) => id !== modulo.id,
                                          ),
                                        })
                                      }
                                    }}
                                  />
                                  <Label htmlFor={`modulo-${modulo.id}`} className="flex-1 cursor-pointer">
                                    <div className="flex items-center gap-2">
                                      <Folder className="h-4 w-4 text-blue-600" />
                                      <span>{modulo.titulo}</span>
                                      <Badge variant="outline" className="text-xs">
                                        {modulo.aulas.length} aulas
                                      </Badge>
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Button onClick={handleSalvarCurso} disabled={isLoading}>
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Salvando...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                Salvar Curso
                              </div>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Streaming de Vídeo */}
            <TabsContent value="streaming" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Plataformas de Streaming</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { id: "youtube", name: "YouTube", icon: "🎥" },
                      { id: "vimeo", name: "Vimeo", icon: "📹" },
                      { id: "wistia", name: "Wistia", icon: "🎬" },
                      { id: "bunny", name: "Bunny.net", icon: "🐰" },
                      { id: "cloudflare", name: "Cloudflare Stream", icon: "☁️" },
                      { id: "aws", name: "AWS CloudFront", icon: "📡" },
                    ].map((platform) => (
                      <Card
                        key={platform.id}
                        className={`cursor-pointer transition-all ${
                          selectedPlatforms.includes(platform.id)
                            ? "ring-2 ring-blue-500 bg-blue-50"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => handlePlatformToggle(platform.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl mb-2">{platform.icon}</div>
                          <h3 className="font-medium">{platform.name}</h3>
                          {selectedPlatforms.includes(platform.id) && (
                            <CheckCircle className="h-5 w-5 text-blue-500 mx-auto mt-2" />
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Plataformas Selecionadas</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlatforms.map((platformId) => {
                        const platform = [
                          { id: "youtube", name: "YouTube" },
                          { id: "vimeo", name: "Vimeo" },
                          { id: "wistia", name: "Wistia" },
                          { id: "bunny", name: "Bunny.net" },
                          { id: "cloudflare", name: "Cloudflare Stream" },
                          { id: "aws", name: "AWS CloudFront" },
                        ].find((p) => p.id === platformId)
                        return (
                          <Badge key={platformId} variant="secondary">
                            {platform?.name}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pagamentos */}
            <TabsContent value="pagamentos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(paymentPlatforms).map(([key, platform]) => (
                      <Card
                        key={key}
                        className={`cursor-pointer transition-all ${
                          platform.enabled ? "ring-2 ring-green-500 bg-green-50" : "hover:bg-gray-50"
                        }`}
                        onClick={() => handlePaymentToggle(key)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl mb-2">
                            {key === "stripe" && "💳"}
                            {key === "pagarme" && "💰"}
                            {key === "ticto" && "🎫"}
                          </div>
                          <h3 className="font-medium capitalize">{key === "pagarme" ? "Pagar.me" : key}</h3>
                          {platform.enabled && <CheckCircle className="h-5 w-5 text-green-500 mx-auto mt-2" />}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Configurações das plataformas ativas */}
                  {Object.entries(paymentPlatforms)
                    .filter(([, platform]) => platform.enabled)
                    .map(([key, platform]) => (
                      <Card key={key}>
                        <CardHeader>
                          <CardTitle className="capitalize">
                            Configurações {key === "pagarme" ? "Pagar.me" : key}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`${key}-webhook`}>URL do Webhook</Label>
                            <Input
                              id={`${key}-webhook`}
                              placeholder="https://seusite.com/webhook"
                              value={platform.webhookUrl}
                              onChange={(e) =>
                                setPaymentPlatforms((prev) => ({
                                  ...prev,
                                  [key]: { ...prev[key], webhookUrl: e.target.value },
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`${key}-secret`}>Chave Secreta</Label>
                            <Input
                              id={`${key}-secret`}
                              type="password"
                              placeholder="sk_test_..."
                              value={platform.secretKey}
                              onChange={(e) =>
                                setPaymentPlatforms((prev) => ({
                                  ...prev,
                                  [key]: { ...prev[key], secretKey: e.target.value },
                                }))
                              }
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  {/* Dashboard de Webhooks */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Dashboard de Webhooks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { plataforma: "Stripe", status: "sucesso", data: "2024-01-28 14:30" },
                          { plataforma: "Ticto", status: "erro", data: "2024-01-28 14:25" },
                          { plataforma: "Stripe", status: "sucesso", data: "2024-01-28 14:20" },
                        ].map((webhook, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  webhook.status === "sucesso" ? "bg-green-500" : "bg-red-500"
                                }`}
                              ></div>
                              <div>
                                <p className="text-sm font-medium">{webhook.plataforma}</p>
                                <p className="text-xs text-muted-foreground">{webhook.data}</p>
                              </div>
                            </div>
                            <Badge variant={webhook.status === "sucesso" ? "default" : "destructive"}>
                              {webhook.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gerenciamento de Alunos */}
            <TabsContent value="alunos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alunos</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar alunos..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os status</SelectItem>
                          <SelectItem value="ativo">Ativo</SelectItem>
                          <SelectItem value="suspenso">Suspenso</SelectItem>
                          <SelectItem value="pendente">Pendente</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={cursoFilter} onValueChange={setCursoFilter}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os cursos</SelectItem>
                          {cursosDisponiveis.map((curso) => (
                            <SelectItem key={curso.id} value={curso.id.toString()}>
                              {curso.titulo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                      </Button>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Aluno
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alunosFiltrados.map((aluno) => (
                      <div
                        key={aluno.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={aluno.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              <div className="w-full h-full bg-gray-200 rounded-full"></div>
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-medium">{aluno.nome}</h3>
                              {getStatusBadge(aluno.status)}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>✉️ {aluno.email}</span>
                              <span>📞 {aluno.telefone}</span>
                              <span>📚 Cursos: {aluno.cursos}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>📅 Registro: {formatarData(aluno.dataRegistro)}</span>
                              <span>🕒 Último acesso: {formatarData(aluno.ultimoAcesso)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewStudent(aluno)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Modal de detalhes do aluno */}
      <StudentDetailsModal isOpen={isStudentModalOpen} onClose={handleCloseStudentModal} student={selectedStudent} />
    </>
  )
}
