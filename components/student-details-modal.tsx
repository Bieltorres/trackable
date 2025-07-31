"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Save,
  Send,
  Key,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react"

interface StudentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  student: any
}

// Dados simulados dos cursos disponíveis com datas de aquisição e expiração
const cursosDisponiveis = [
  {
    id: 1,
    titulo: "Marketing Digital Completo",
    categoria: "Marketing",
    preco: 297,
    ativo: true,
  },
  {
    id: 2,
    titulo: "Vendas de Alto Impacto",
    categoria: "Vendas",
    preco: 247,
    ativo: true,
  },
  {
    id: 3,
    titulo: "Copywriting Persuasivo",
    categoria: "Copywriting",
    preco: 197,
    ativo: true,
  },
  {
    id: 4,
    titulo: "Gestão de Tráfego Pago",
    categoria: "Marketing",
    preco: 347,
    ativo: true,
  },
  {
    id: 5,
    titulo: "Funil de Vendas Automatizado",
    categoria: "Vendas",
    preco: 197,
    ativo: false,
  },
]

export function StudentDetailsModal({ isOpen, onClose, student }: StudentDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("dados")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Estados para edição
  const [dadosAluno, setDadosAluno] = useState({
    nome: student?.nome || "",
    email: student?.email || "",
    telefone: student?.telefone || "",
    status: student?.status || "ativo",
    dataRegistro: student?.dataRegistro || "",
    ultimoAcesso: student?.ultimoAcesso || "",
    dataNascimento: student?.dataNascimento || "",
    genero: student?.genero || "",
    rua: student?.rua || "",
    numero: student?.numero || "",
    cep: student?.cep || "",
    cidade: student?.cidade || "",
    estado: student?.estado || "",
    pais: student?.pais || "Brasil",
  })

  // Dados dos cursos matriculados com datas
  const [cursosMatriculados, setCursosMatriculados] = useState([1, 2, 3]) // IDs dos cursos
  const [dadosCursos, setDadosCursos] = useState({
    1: { dataAquisicao: "2024-01-15", dataExpiracao: "2025-01-15" },
    2: { dataAquisicao: "2024-01-10", dataExpiracao: "2025-01-10" },
    3: { dataAquisicao: "2024-01-20", dataExpiracao: "2025-01-20" },
  })
  const [novaSenha, setNovaSenha] = useState("")

  const handleSalvarDados = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    alert("Dados do aluno salvos com sucesso!")
  }

  const handleSalvarCursos = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    alert("Cursos atualizados com sucesso!")
  }

  const handleReenviarCredenciais = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    alert("Credenciais reenviadas por email!")
  }

  const handleRedefinirSenha = async () => {
    if (!novaSenha || novaSenha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres!")
      return
    }
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setNovaSenha("")
    alert("Senha redefinida e enviada por email!")
  }

  const handleToggleCurso = (cursoId: number) => {
    setCursosMatriculados((prev) => {
      if (prev.includes(cursoId)) {
        // Remove curso e seus dados
        setDadosCursos((prevDados) => {
          const newDados = { ...prevDados }
          delete newDados[cursoId]
          return newDados
        })
        return prev.filter((id) => id !== cursoId)
      } else {
        // Adiciona curso com datas padrão
        const hoje = new Date().toISOString().split("T")[0]
        const umAnoDepois = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

        setDadosCursos((prevDados) => ({
          ...prevDados,
          [cursoId]: {
            dataAquisicao: hoje,
            dataExpiracao: umAnoDepois,
          },
        }))
        return [...prev, cursoId]
      }
    })
  }

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

  if (!student) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={student.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-xl font-bold">{student.nome}</span>
              <div className="flex items-center gap-2 mt-1">
                {getStatusBadge(student.status)}
                <span className="text-sm text-muted-foreground">ID: #{student.id}</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dados" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Dados Pessoais
            </TabsTrigger>
            <TabsTrigger value="cursos" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Cursos
            </TabsTrigger>
            <TabsTrigger value="acesso" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Acesso
            </TabsTrigger>
          </TabsList>

          {/* Dados Pessoais */}
          <TabsContent value="dados" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dados Básicos */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Dados Básicos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        value={dadosAluno.nome}
                        onChange={(e) => setDadosAluno({ ...dadosAluno, nome: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={dadosAluno.email}
                          onChange={(e) => setDadosAluno({ ...dadosAluno, email: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="telefone"
                          value={dadosAluno.telefone}
                          onChange={(e) => setDadosAluno({ ...dadosAluno, telefone: e.target.value })}
                          className="pl-10"
                          placeholder="+55 (11) 99999-9999"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                      <Input
                        id="dataNascimento"
                        type="date"
                        value={dadosAluno.dataNascimento}
                        onChange={(e) => setDadosAluno({ ...dadosAluno, dataNascimento: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genero">Gênero</Label>
                      <Select
                        value={dadosAluno.genero}
                        onValueChange={(value) => setDadosAluno({ ...dadosAluno, genero: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o gênero" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="feminino">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={dadosAluno.status}
                        onValueChange={(value) => setDadosAluno({ ...dadosAluno, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ativo">Ativo</SelectItem>
                          <SelectItem value="suspenso">Suspenso</SelectItem>
                          <SelectItem value="pendente">Pendente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="border-t pt-6">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Endereço</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        value={dadosAluno.cep}
                        onChange={(e) => setDadosAluno({ ...dadosAluno, cep: e.target.value })}
                        placeholder="00000-000"
                        maxLength={9}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="rua">Rua/Logradouro</Label>
                      <Input
                        id="rua"
                        value={dadosAluno.rua}
                        onChange={(e) => setDadosAluno({ ...dadosAluno, rua: e.target.value })}
                        placeholder="Nome da rua, avenida, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numero">Número</Label>
                      <Input
                        id="numero"
                        value={dadosAluno.numero}
                        onChange={(e) => setDadosAluno({ ...dadosAluno, numero: e.target.value })}
                        placeholder="123"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input
                        id="cidade"
                        value={dadosAluno.cidade}
                        onChange={(e) => setDadosAluno({ ...dadosAluno, cidade: e.target.value })}
                        placeholder="Nome da cidade"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <Select
                        value={dadosAluno.estado}
                        onValueChange={(value) => setDadosAluno({ ...dadosAluno, estado: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AC">Acre</SelectItem>
                          <SelectItem value="AL">Alagoas</SelectItem>
                          <SelectItem value="AP">Amapá</SelectItem>
                          <SelectItem value="AM">Amazonas</SelectItem>
                          <SelectItem value="BA">Bahia</SelectItem>
                          <SelectItem value="CE">Ceará</SelectItem>
                          <SelectItem value="DF">Distrito Federal</SelectItem>
                          <SelectItem value="ES">Espírito Santo</SelectItem>
                          <SelectItem value="GO">Goiás</SelectItem>
                          <SelectItem value="MA">Maranhão</SelectItem>
                          <SelectItem value="MT">Mato Grosso</SelectItem>
                          <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="PA">Pará</SelectItem>
                          <SelectItem value="PB">Paraíba</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="PE">Pernambuco</SelectItem>
                          <SelectItem value="PI">Piauí</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          <SelectItem value="RO">Rondônia</SelectItem>
                          <SelectItem value="RR">Roraima</SelectItem>
                          <SelectItem value="SC">Santa Catarina</SelectItem>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="SE">Sergipe</SelectItem>
                          <SelectItem value="TO">Tocantins</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2 lg:col-span-1">
                      <Label htmlFor="pais">País</Label>
                      <Select
                        value={dadosAluno.pais}
                        onValueChange={(value) => setDadosAluno({ ...dadosAluno, pais: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Brasil">Brasil</SelectItem>
                          <SelectItem value="Argentina">Argentina</SelectItem>
                          <SelectItem value="Chile">Chile</SelectItem>
                          <SelectItem value="Colômbia">Colômbia</SelectItem>
                          <SelectItem value="Paraguai">Paraguai</SelectItem>
                          <SelectItem value="Peru">Peru</SelectItem>
                          <SelectItem value="Uruguai">Uruguai</SelectItem>
                          <SelectItem value="Venezuela">Venezuela</SelectItem>
                          <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                          <SelectItem value="Portugal">Portugal</SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Informações do Sistema */}
                <div className="border-t pt-6">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Informações do Sistema</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Data de Registro</Label>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatarData(dadosAluno.dataRegistro)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Último Acesso</Label>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatarData(dadosAluno.ultimoAcesso)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSalvarDados} disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Salvando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Salvar Dados
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cursos */}
          <TabsContent value="cursos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Gerenciar Cursos do Aluno
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Instruções</h4>
                  <p className="text-sm text-blue-800">
                    Selecione os cursos aos quais este aluno deve ter acesso. As alterações serão aplicadas
                    imediatamente após salvar.
                  </p>
                </div>

                <div className="space-y-4">
                  {cursosDisponiveis.map((curso) => (
                    <div key={curso.id} className="border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={`curso-${curso.id}`}
                            checked={cursosMatriculados.includes(curso.id)}
                            onCheckedChange={() => handleToggleCurso(curso.id)}
                          />
                          <div>
                            <Label htmlFor={`curso-${curso.id}`} className="font-medium cursor-pointer">
                              {curso.titulo}
                            </Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {curso.categoria}
                              </Badge>
                              <span className="text-sm text-muted-foreground">R$ {curso.preco}</span>
                              {!curso.ativo && (
                                <Badge variant="secondary" className="text-xs">
                                  Inativo
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        {cursosMatriculados.includes(curso.id) && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>

                      {/* Campos de data para cursos matriculados */}
                      {cursosMatriculados.includes(curso.id) && (
                        <div className="px-4 pb-4 border-t bg-gray-50/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor={`aquisicao-${curso.id}`} className="text-sm font-medium">
                                Data de Aquisição
                              </Label>
                              <Input
                                id={`aquisicao-${curso.id}`}
                                type="date"
                                value={dadosCursos[curso.id]?.dataAquisicao || ""}
                                onChange={(e) =>
                                  setDadosCursos((prev) => ({
                                    ...prev,
                                    [curso.id]: {
                                      ...prev[curso.id],
                                      dataAquisicao: e.target.value,
                                    },
                                  }))
                                }
                                className="text-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`expiracao-${curso.id}`} className="text-sm font-medium">
                                Data de Expiração
                              </Label>
                              <Input
                                id={`expiracao-${curso.id}`}
                                type="date"
                                value={dadosCursos[curso.id]?.dataExpiracao || ""}
                                onChange={(e) =>
                                  setDadosCursos((prev) => ({
                                    ...prev,
                                    [curso.id]: {
                                      ...prev[curso.id],
                                      dataExpiracao: e.target.value,
                                    },
                                  }))
                                }
                                className="text-sm"
                              />
                            </div>
                          </div>

                          {/* Indicador de status do acesso */}
                          <div className="mt-3 flex items-center gap-2">
                            {dadosCursos[curso.id]?.dataExpiracao && (
                              <div className="flex items-center gap-2 text-xs">
                                <Calendar className="h-3 w-3" />
                                <span className="text-muted-foreground">
                                  Acesso válido até:{" "}
                                  {new Date(dadosCursos[curso.id].dataExpiracao).toLocaleDateString("pt-BR")}
                                </span>
                                {new Date(dadosCursos[curso.id].dataExpiracao) < new Date() && (
                                  <Badge variant="destructive" className="text-xs">
                                    Expirado
                                  </Badge>
                                )}
                                {new Date(dadosCursos[curso.id].dataExpiracao) > new Date() &&
                                  new Date(dadosCursos[curso.id].dataExpiracao) <=
                                    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                                    <Badge variant="outline" className="text-xs text-orange-600 border-orange-600">
                                      Expira em breve
                                    </Badge>
                                  )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    {cursosMatriculados.length} de {cursosDisponiveis.length} cursos selecionados
                  </div>
                  <Button onClick={handleSalvarCursos} disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Salvando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Salvar Cursos
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Acesso */}
          <TabsContent value="acesso" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reenviar Credenciais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Reenviar Credenciais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="font-medium text-amber-900 mb-2">Atenção</h4>
                    <p className="text-sm text-amber-800">
                      Isso enviará um email com as credenciais de acesso atuais para o aluno.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm">
                      <p>
                        <strong>Email:</strong> {dadosAluno.email}
                      </p>
                      <p>
                        <strong>Último envio:</strong> Há 3 dias
                      </p>
                    </div>

                    <Button onClick={handleReenviarCredenciais} disabled={isLoading} className="w-full">
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Enviando...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Reenviar Credenciais
                        </div>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Redefinir Senha */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Redefinir Senha
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-900 mb-2">Cuidado</h4>
                    <p className="text-sm text-red-800">
                      Isso irá alterar a senha atual do aluno e enviar a nova senha por email.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="novaSenha">Nova Senha</Label>
                      <div className="relative">
                        <Input
                          id="novaSenha"
                          type={showPassword ? "text" : "password"}
                          placeholder="Digite a nova senha (mín. 6 caracteres)"
                          value={novaSenha}
                          onChange={(e) => setNovaSenha(e.target.value)}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button
                      onClick={handleRedefinirSenha}
                      disabled={isLoading || !novaSenha}
                      variant="destructive"
                      className="w-full"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Redefinindo...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4" />
                          Redefinir Senha
                        </div>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Histórico de Acessos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Histórico de Acessos Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { data: "2024-01-28", hora: "14:30", ip: "192.168.1.1", dispositivo: "Desktop" },
                    { data: "2024-01-27", hora: "09:15", ip: "192.168.1.1", dispositivo: "Mobile" },
                    { data: "2024-01-26", hora: "16:45", ip: "192.168.1.1", dispositivo: "Desktop" },
                  ].map((acesso, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">
                            {formatarData(acesso.data)} às {acesso.hora}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {acesso.dispositivo} • IP: {acesso.ip}
                          </p>
                        </div>
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
  )
}
