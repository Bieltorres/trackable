'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { 
  Settings, 
  Book, 
  Video, 
  CreditCard, 
  Users, 
  CheckCircle, 
  PlusCircle, 
  Copy, 
  Play, 
  Folder, 
  BookOpen, 
  Upload, 
  Save, 
  Eye, 
  Edit3, 
  Trash2 
} from 'lucide-react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'

// Mock Data
const aulasSimuladas = [
  {
    id: 1,
    titulo: 'Introdução ao Marketing Digital',
    descricao:
      'Conceitos fundamentais do marketing digital e sua importância no mundo atual.',
    videoUrl: 'https://youtube.com/watch?v=abc123',
    videoPlataforma: 'bunny',
    duracao: '15:30',
    arquivos: [
      { id: 1, nome: 'Slides Introdução.pdf', tamanho: '2.5 MB', tipo: 'pdf' },
      {
        id: 2,
        nome: 'Checklist Marketing.xlsx',
        tamanho: '1.2 MB',
        tipo: 'excel',
      },
    ],
    modulosVinculados: [1, 2],
  },
  {
    id: 2,
    titulo: 'Definindo Personas',
    descricao:
      'Como criar personas detalhadas para suas campanhas de marketing.',
    videoUrl: 'https://vimeo.com/123456789',
    videoPlataforma: 'bunny',
    duracao: '22:45',
    arquivos: [
      {
        id: 3,
        nome: 'Template Personas.docx',
        tamanho: '800 KB',
        tipo: 'word',
      },
    ],
    modulosVinculados: [1],
  },
]

const modulosSimulados = [
  {
    id: 1,
    titulo: 'Fundamentos do Marketing',
    descricao:
      'Módulo introdutório sobre os conceitos básicos do marketing digital.',
    aulas: [1, 2],
    cursosVinculados: [1, 2],
    ordem: 1,
  },
  {
    id: 2,
    titulo: 'Estratégias Avançadas',
    descricao: 'Técnicas avançadas para otimizar suas campanhas de marketing.',
    aulas: [1],
    cursosVinculados: [1],
    ordem: 2,
  },
]

const cursosSimulados = [
  {
    id: 1,
    titulo: 'Marketing Digital Completo',
    descricao: 'Curso completo de marketing digital do básico ao avançado.',
    instrutor: 'João Silva',
    categoria: 'Marketing',
    preco: 297,
    status: 'ativo',
    modulos: [1, 2],
    thumbnail: '/placeholder.svg?height=100&width=150',
    dataLancamento: '2024-01-15',
  },
  {
    id: 2,
    titulo: 'Fundamentos de Marketing',
    descricao: 'Curso básico para iniciantes em marketing digital.',
    instrutor: 'Maria Santos',
    categoria: 'Marketing',
    preco: 197,
    status: 'ativo',
    modulos: [1],
    thumbnail: '/placeholder.svg?height=100&width=150',
    dataLancamento: '2024-02-01',
  },
]

type PaymentPlatform = 'stripe' | 'ticto'

export default function AdminConfigPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('course-management')
  const [courseManagementTab, setCourseManagementTab] = useState('aulas')

  // State for Streaming
  const [bunnyApiKey, setBunnyApiKey] = useState('')
  const [isBunnyConnected, setIsBunnyConnected] = useState(false)
  const [isBunnyModalOpen, setIsBunnyModalOpen] = useState(false)

  // State for Payments
  const [connectedPaymentWebhooks, setConnectedPaymentWebhooks] = useState<
    PaymentPlatform[]
  >([])
  const [isPaymentWebhookDialogOpen, setIsPaymentWebhookDialogOpen] =
    useState(false)
  const [currentPaymentPlatform, setCurrentPaymentPlatform] =
    useState<PaymentPlatform | null>(null)

  // State for Course Management Forms
  const [novaAula, setNovaAula] = useState({
    titulo: '',
    descricao: '',
    videoUrl: '',
    videoPlataforma: 'bunny',
  })
  const [novoModulo, setNovoModulo] = useState({
    titulo: '',
    descricao: '',
    aulasSelecionadas: [] as number[],
  })
  const [novoCurso, setNovoCurso] = useState({
    titulo: '',
    descricao: '',
    instrutor: '',
    categoria: '',
    preco: '',
    modulosSelecionados: [] as number[],
  })

  const handleSaveBunnyKey = () => {
    if (bunnyApiKey.trim()) {
      setIsBunnyConnected(true)
      toast({
        title: "Sucesso",
        description: "Bunny.net conectado com sucesso!",
      })
      console.log('Bunny API Key saved:', bunnyApiKey)
    }
    setIsBunnyModalOpen(false)
  }

  const handleOpenPaymentWebhookDialog = (platform: PaymentPlatform) => {
    setCurrentPaymentPlatform(platform)
    setIsPaymentWebhookDialogOpen(true)
  }

  const handleConnectPaymentWebhook = () => {
    if (currentPaymentPlatform) {
      setConnectedPaymentWebhooks((prev) => {
        if (prev.includes(currentPaymentPlatform)) {
          return prev
        }
        return [...prev, currentPaymentPlatform]
      })
      toast({
        title: "Sucesso",
        description: `Webhook do ${currentPaymentPlatform} conectado com sucesso!`,
      })
    }
    setIsPaymentWebhookDialogOpen(false)
    setCurrentPaymentPlatform(null)
  }

  const getWebhookUrl = (platform: PaymentPlatform | null) => {
    if (!platform) return ''
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || 'https://yoursite.com'
    return `${baseUrl}/api/webhooks/${platform}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado",
      description: "URL copiada para a área de transferência!",
    })
  }

  const getFileIcon = (tipo: string) => {
    switch (tipo) {
      case 'pdf':
        return '📄'
      case 'excel':
        return '📊'
      case 'word':
        return '📝'
      default:
        return '📁'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Configurações de Administrador
        </h1>
        <p className="text-muted-foreground mt-2">
          Gerencie cursos, streaming, pagamentos e alunos da plataforma.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="course-management">
            <Book className="h-4 w-4 mr-2" />
            Gerenciamento de Cursos
          </TabsTrigger>
          <TabsTrigger value="video-streaming">
            <Video className="h-4 w-4 mr-2" />
            Streaming de Vídeo
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard className="h-4 w-4 mr-2" />
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="student-management">
            <Users className="h-4 w-4 mr-2" />
            Gerenciamento de Alunos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="course-management" className="mt-6">
          <Tabs
            value={courseManagementTab}
            onValueChange={setCourseManagementTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="aulas">
                <Play className="h-4 w-4 mr-2" />
                Aulas
              </TabsTrigger>
              <TabsTrigger value="modulos">
                <Folder className="h-4 w-4 mr-2" />
                Módulos
              </TabsTrigger>
              <TabsTrigger value="cursos">
                <BookOpen className="h-4 w-4 mr-2" />
                Cursos
              </TabsTrigger>
            </TabsList>

            {/* Aulas Content */}
            <TabsContent value="aulas" className="mt-4 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Aulas Cadastradas</h3>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nova Aula
                </Button>
              </div>
              <div className="space-y-4">
                {aulasSimuladas.map((aula) => (
                  <Card key={aula.id}>
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="w-24 h-16 bg-gray-100 rounded flex items-center justify-center">
                        <Play className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-lg">{aula.titulo}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{aula.duracao}</Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{aula.descricao}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {aula.arquivos.map(arq => (
                            <Badge key={arq.id} variant="outline">{getFileIcon(arq.tipo)} {arq.nome}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                          <Button variant="outline" size="sm"><Edit3 className="h-4 w-4" /></Button>
                          <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Nova Aula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Título da Aula" />
                  <Textarea placeholder="Descrição da Aula" />
                  <Input placeholder="URL do Vídeo (Bunny.net)" />
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Arraste e solte arquivos ou clique para enviar</p>
                  </div>
                  <Button><Save className="h-4 w-4 mr-2" />Salvar Aula</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Módulos Content */}
            <TabsContent value="modulos" className="mt-4 space-y-6">
               <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Módulos Cadastrados</h3>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Novo Módulo
                </Button>
              </div>
              <div className="space-y-4">
                  {modulosSimulados.map(modulo => (
                      <Card key={modulo.id}>
                          <CardContent className="p-4 flex items-center gap-4">
                              <div className="p-3 bg-blue-100 rounded-lg"><Folder className="h-6 w-6 text-blue-600" /></div>
                              <div className="flex-grow">
                                  <h4 className="font-semibold text-lg">{modulo.titulo}</h4>
                                  <p className="text-sm text-muted-foreground">{modulo.descricao}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{modulo.aulas.length} aulas</p>
                              </div>
                              <div className="flex gap-2">
                                  <Button variant="outline" size="sm"><Edit3 className="h-4 w-4" /></Button>
                                  <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                              </div>
                          </CardContent>
                      </Card>
                  ))}
              </div>
               <Card>
                <CardHeader>
                  <CardTitle>Adicionar Novo Módulo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Título do Módulo" />
                  <Textarea placeholder="Descrição do Módulo" />
                  <div className="space-y-2">
                      <p className="font-medium text-sm">Vincular Aulas</p>
                      <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
                          {aulasSimuladas.map(aula => (
                              <div key={aula.id} className="flex items-center gap-2">
                                  <Checkbox id={`aula-${aula.id}`} />
                                  <label htmlFor={`aula-${aula.id}`} className="text-sm">{aula.titulo}</label>
                              </div>
                          ))}
                      </div>
                  </div>
                  <Button><Save className="h-4 w-4 mr-2" />Salvar Módulo</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cursos Content */}
            <TabsContent value="cursos" className="mt-4 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Cursos Cadastrados</h3>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Novo Curso
                </Button>
              </div>
              <div className="space-y-4">
                  {cursosSimulados.map(curso => (
                      <Card key={curso.id}>
                          <CardContent className="p-4 flex items-start gap-4">
                              <Image src={curso.thumbnail || "/placeholder.svg"} alt={curso.titulo} width={120} height={80} className="rounded-md object-cover" />
                              <div className="flex-grow">
                                  <h4 className="font-semibold text-lg">{curso.titulo}</h4>
                                  <p className="text-sm text-muted-foreground">{curso.descricao}</p>
                                  <div className="text-xs text-muted-foreground mt-2">
                                      <span>Instrutor: {curso.instrutor}</span> | <span>Preço: R$ {curso.preco}</span>
                                  </div>
                              </div>
                               <div className="flex flex-col gap-2">
                                  <Button variant="outline" size="sm"><Edit3 className="h-4 w-4" /></Button>
                                  <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                              </div>
                          </CardContent>
                      </Card>
                  ))}
              </div>
               <Card>
                <CardHeader>
                  <CardTitle>Adicionar Novo Curso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Título do Curso" />
                  <Textarea placeholder="Descrição do Curso" />
                  <Input placeholder="Nome do Instrutor" />
                  <Input type="number" placeholder="Preço (ex: 297.00)" />
                  <div className="space-y-2">
                      <p className="font-medium text-sm">Vincular Módulos</p>
                      <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
                          {modulosSimulados.map(modulo => (
                              <div key={modulo.id} className="flex items-center gap-2">
                                  <Checkbox id={`modulo-${modulo.id}`} />
                                  <label htmlFor={`modulo-${modulo.id}`} className="text-sm">{modulo.titulo}</label>
                              </div>
                          ))}
                      </div>
                  </div>
                  <Button><Save className="h-4 w-4 mr-2" />Salvar Curso</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="video-streaming" className="mt-6">
          <h3 className="text-xl font-semibold mb-4">
            Plataformas de Streaming
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              onClick={() => setIsBunnyModalOpen(true)}
              className={`cursor-pointer transition-all ${
                isBunnyConnected
                  ? 'border-green-500 ring-2 ring-green-500'
                  : 'border-dashed'
              }`}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                <Image
                  src="/images/bunny/icon128x128.png"
                  alt="Bunny.net Logo"
                  width={64}
                  height={64}
                />
                <p className="font-semibold">Bunny.net</p>
                {isBunnyConnected ? (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Conectado
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Clique para conectar
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Plataformas Selecionadas</CardTitle>
            </CardHeader>
            <CardContent>
              {isBunnyConnected ? (
                <p>Bunny.net</p>
              ) : (
                <p className="text-muted-foreground">
                  Nenhuma plataforma conectada ainda.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <h3 className="text-xl font-semibold mb-4">
            Webhooks de Pagamento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              onClick={() => handleOpenPaymentWebhookDialog('stripe')}
              className={`cursor-pointer transition-all ${
                connectedPaymentWebhooks.includes('stripe')
                  ? 'border-green-500 ring-2 ring-green-500'
                  : 'border-dashed'
              }`}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 gap-4 h-48">
                <Image
                  src="/images/payments/stripe-logo.png"
                  alt="Stripe Logo"
                  width={100}
                  height={40}
                  className="object-contain"
                />
                {connectedPaymentWebhooks.includes('stripe') ? (
                  <div className="flex items-center text-green-600 text-sm mt-auto">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Conectado
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-auto">
                    Clique para conectar
                  </p>
                )}
              </CardContent>
            </Card>
            <Card
              onClick={() => handleOpenPaymentWebhookDialog('ticto')}
              className={`cursor-pointer transition-all ${
                connectedPaymentWebhooks.includes('ticto')
                  ? 'border-green-500 ring-2 ring-green-500'
                  : 'border-dashed'
              }`}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 gap-4 h-48">
                <div className="w-20 h-20 bg-black flex items-center justify-center rounded-lg">
                  <Image
                    src="/images/payments/ticto-logo.png"
                    alt="Ticto Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <p className="font-semibold">Ticto</p>
                {connectedPaymentWebhooks.includes('ticto') ? (
                  <div className="flex items-center text-green-600 text-sm mt-auto">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Conectado
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-auto">
                    Clique para conectar
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Webhooks Conectados</CardTitle>
            </CardHeader>
            <CardContent>
              {connectedPaymentWebhooks.length > 0 ? (
                <ul className="list-disc list-inside">
                  {connectedPaymentWebhooks.map((p) => (
                    <li key={p} className="capitalize">
                      {p}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">
                  Nenhum webhook de pagamento conectado ainda.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="student-management" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gerenciamento de Alunos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Funcionalidade de gerenciamento de alunos será implementada em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bunny API Key Modal */}
      <Dialog open={isBunnyModalOpen} onOpenChange={setIsBunnyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conectar com Bunny.net</DialogTitle>
            <DialogDescription>
              Insira sua API Key da sua Video Library do Bunny.net para
              conectar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="bunny-api-key"
              placeholder="Sua API Key"
              value={bunnyApiKey}
              onChange={(e) => setBunnyApiKey(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsBunnyModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveBunnyKey}>Salvar e Conectar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Webhook Dialog */}
      <Dialog
        open={isPaymentWebhookDialogOpen}
        onOpenChange={setIsPaymentWebhookDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Configurar Webhook do{' '}
              {currentPaymentPlatform &&
                currentPaymentPlatform.charAt(0).toUpperCase() +
                  currentPaymentPlatform.slice(1)}
            </DialogTitle>
            <DialogDescription>
              Copie a URL abaixo e cole na seção de webhooks da sua conta{' '}
              {currentPaymentPlatform}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="webhook-url">URL do Webhook</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                id="webhook-url"
                readOnly
                value={getWebhookUrl(currentPaymentPlatform)}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  copyToClipboard(getWebhookUrl(currentPaymentPlatform))
                }
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Após salvar a URL na plataforma de pagamento, clique em Conectar.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPaymentWebhookDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleConnectPaymentWebhook}>Conectar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
