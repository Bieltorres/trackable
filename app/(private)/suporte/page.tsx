"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle,
  Send,
  Search,
  Book,
  Video,
  FileText
} from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

// Dados simulados de tickets
const tickets = [
  {
    id: "TICK-001",
    assunto: "Problema com acesso ao curso",
    status: "aberto",
    prioridade: "alta",
    dataAbertura: "2024-01-15",
    ultimaResposta: "2024-01-16",
  },
  {
    id: "TICK-002",
    assunto: "Dúvida sobre certificado",
    status: "respondido",
    prioridade: "media",
    dataAbertura: "2024-01-10",
    ultimaResposta: "2024-01-12",
  },
  {
    id: "TICK-003",
    assunto: "Erro no pagamento",
    status: "resolvido",
    prioridade: "alta",
    dataAbertura: "2024-01-05",
    ultimaResposta: "2024-01-08",
  },
]

// FAQ simulado
const faqItems = [
  {
    pergunta: "Como posso acessar meus cursos?",
    resposta: "Após fazer login, você pode acessar seus cursos através do menu 'Meus Cursos' ou diretamente no dashboard.",
  },
  {
    pergunta: "Como obter meu certificado?",
    resposta: "O certificado é liberado automaticamente após completar 100% do curso e ser aprovado na avaliação final.",
  },
  {
    pergunta: "Posso assistir as aulas offline?",
    resposta: "Atualmente não oferecemos download de aulas. Todas as aulas devem ser assistidas online através da plataforma.",
  },
  {
    pergunta: "Como alterar minha senha?",
    resposta: "Vá em Configurações > Segurança e clique em 'Alterar Senha'. Você precisará informar sua senha atual.",
  },
]

export default function SuportePage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("novo-ticket")
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  
  // Estados do formulário de novo ticket
  const [novoTicket, setNovoTicket] = useState({
    assunto: "",
    categoria: "",
    prioridade: "media",
    descricao: "",
  })

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!novoTicket.assunto || !novoTicket.categoria || !novoTicket.descricao) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      
      // Simular envio do ticket
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "Sucesso",
        description: "Seu ticket foi criado com sucesso! Você receberá uma resposta em breve.",
      })
      
      // Limpar formulário
      setNovoTicket({
        assunto: "",
        categoria: "",
        prioridade: "media",
        descricao: "",
      })
      
      // Mudar para aba de tickets
      setActiveTab("meus-tickets")
      
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar ticket. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aberto":
        return <Badge variant="destructive">Aberto</Badge>
      case "respondido":
        return <Badge variant="default">Respondido</Badge>
      case "resolvido":
        return <Badge variant="secondary">Resolvido</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return <Badge variant="destructive">Alta</Badge>
      case "media":
        return <Badge variant="default">Média</Badge>
      case "baixa":
        return <Badge variant="secondary">Baixa</Badge>
      default:
        return <Badge variant="outline">{prioridade}</Badge>
    }
  }

  const filteredFaq = faqItems.filter(item =>
    item.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.resposta.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <HelpCircle className="h-6 w-6" />
          Central de Suporte
        </h1>
        <p className="text-muted-foreground mt-2">
          Estamos aqui para ajudar! Encontre respostas ou entre em contato conosco.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="novo-ticket" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Novo Ticket
          </TabsTrigger>
          <TabsTrigger value="meus-tickets" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Meus Tickets
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="contato" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Contato
          </TabsTrigger>
        </TabsList>

        {/* Novo Ticket */}
        <TabsContent value="novo-ticket" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Criar Novo Ticket
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assunto">Assunto *</Label>
                    <Input
                      id="assunto"
                      value={novoTicket.assunto}
                      onChange={(e) => setNovoTicket({ ...novoTicket, assunto: e.target.value })}
                      placeholder="Descreva brevemente o problema"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria *</Label>
                    <select
                      id="categoria"
                      value={novoTicket.categoria}
                      onChange={(e) => setNovoTicket({ ...novoTicket, categoria: e.target.value })}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md"
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="tecnico">Problema Técnico</option>
                      <option value="curso">Dúvida sobre Curso</option>
                      <option value="pagamento">Pagamento</option>
                      <option value="certificado">Certificado</option>
                      <option value="conta">Conta/Perfil</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prioridade">Prioridade</Label>
                  <select
                    id="prioridade"
                    value={novoTicket.prioridade}
                    onChange={(e) => setNovoTicket({ ...novoTicket, prioridade: e.target.value })}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md"
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição *</Label>
                  <Textarea
                    id="descricao"
                    value={novoTicket.descricao}
                    onChange={(e) => setNovoTicket({ ...novoTicket, descricao: e.target.value })}
                    placeholder="Descreva detalhadamente o problema ou dúvida..."
                    rows={5}
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Enviando...
                    </div>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Ticket
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meus Tickets */}
        <TabsContent value="meus-tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Meus Tickets de Suporte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">#{ticket.id}</span>
                          {getStatusBadge(ticket.status)}
                          {getPrioridadeBadge(ticket.prioridade)}
                        </div>
                        <h3 className="font-medium">{ticket.assunto}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Aberto em {new Date(ticket.dataAbertura).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            Última resposta: {new Date(ticket.ultimaResposta).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Perguntas Frequentes
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar nas perguntas frequentes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFaq.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-start gap-2">
                      <HelpCircle className="h-4 w-4 mt-0.5 text-primary" />
                      {item.pergunta}
                    </h3>
                    <p className="text-muted-foreground pl-6">{item.resposta}</p>
                  </div>
                ))}
                {filteredFaq.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma pergunta encontrada para "{searchTerm}"</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contato */}
        <TabsContent value="contato" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">suporte@plataforma.com</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-muted-foreground">+55 (11) 9999-9999</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Horário de Atendimento</p>
                    <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                    <p className="text-muted-foreground">Sábado: 9h às 14h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Recursos de Ajuda
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Tutoriais em Vídeo
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Book className="h-4 w-4 mr-2" />
                  Guia do Usuário
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat ao Vivo
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tempo de Resposta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="font-medium">Alta Prioridade</p>
                  <p className="text-sm text-muted-foreground">Até 2 horas</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="font-medium">Média Prioridade</p>
                  <p className="text-sm text-muted-foreground">Até 24 horas</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="font-medium">Baixa Prioridade</p>
                  <p className="text-sm text-muted-foreground">Até 48 horas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
