'use client'

import { useState, useEffect } from 'react'
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

type PaymentPlatform = 'stripe' | 'ticto'

export default function AdminConfigPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('course-management')
  const [courseManagementTab, setCourseManagementTab] = useState('cursos')
  const [isLoading, setIsLoading] = useState(false)

  // State for data
  const [aulas, setAulas] = useState<any[]>([])
  const [modulos, setModulos] = useState<any[]>([])
  const [cursos, setCursos] = useState<any[]>([])

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
    ordem: '',
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

  // Carregar dados ao montar o componente
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      
      // Carregar aulas
      const aulasResponse = await fetch('/api/admin/aulas')
      if (aulasResponse.ok) {
        const aulasData = await aulasResponse.json()
        setAulas(aulasData.aulas || [])
      }

      // Carregar módulos
      const modulosResponse = await fetch('/api/admin/modulos')
      if (modulosResponse.ok) {
        const modulosData = await modulosResponse.json()
        setModulos(modulosData.modulos || [])
      }

      // Carregar cursos
      const cursosResponse = await fetch('/api/admin/cursos')
      if (cursosResponse.ok) {
        const cursosData = await cursosResponse.json()
        setCursos(cursosData.cursos || [])
      }

    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      toast({
        title: "Erro",
        description: "Erro ao carregar dados da plataforma",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSalvarAula = async () => {
    if (!novaAula.titulo || !novaAula.descricao) {
      toast({
        title: "Erro",
        description: "Título e descrição são obrigatórios",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      
      const response = await fetch('/api/admin/aulas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaAula),
      })

      if (response.ok) {
        const data = await response.json()
        setAulas(prev => [data.aula, ...prev])
        setNovaAula({
          titulo: '',
          descricao: '',
          videoUrl: '',
          videoPlataforma: 'bunny',
          ordem: '',
        })
        toast({
          title: "Sucesso",
          description: "Aula criada com sucesso!",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Erro",
          description: error.error || "Erro ao criar aula",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Erro ao criar aula:', error)
      toast({
        title: "Erro",
        description: "Erro ao criar aula",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSalvarModulo = async () => {
    if (!novoModulo.titulo || !novoModulo.descricao) {
      toast({
        title: "Erro",
        description: "Título e descrição são obrigatórios",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      
      const response = await fetch('/api/admin/modulos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...novoModulo,
          aulasSelecionadas: novoModulo.aulasSelecionadas,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setModulos(prev => [data.modulo, ...prev])
        setNovoModulo({
          titulo: '',
          descricao: '',
          aulasSelecionadas: [],
        })
        toast({
          title: "Sucesso",
          description: "Módulo criado com sucesso!",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Erro",
          description: error.error || "Erro ao criar módulo",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Erro ao criar módulo:', error)
      toast({
        title: "Erro",
        description: "Erro ao criar módulo",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSalvarCurso = async () => {
    if (!novoCurso.titulo || !novoCurso.descricao || !novoCurso.instrutor) {
      toast({
        title: "Erro",
        description: "Título, descrição e instrutor são obrigatórios",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      
      const response = await fetch('/api/admin/cursos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...novoCurso,
          modulosSelecionados: novoCurso.modulosSelecionados,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setCursos(prev => [data.curso, ...prev])
        setNovoCurso({
          titulo: '',
          descricao: '',
          instrutor: '',
          categoria: '',
          preco: '',
          modulosSelecionados: [],
        })
        toast({
          title: "Sucesso",
          description: "Curso criado com sucesso!",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Erro",
          description: error.error || "Erro ao criar curso",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Erro ao criar curso:', error)
      toast({
        title: "Erro",
        description: "Erro ao criar curso",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
              <TabsTrigger value="cursos">
                <BookOpen className="h-4 w-4 mr-2" />
                Cursos
              </TabsTrigger>
              <TabsTrigger value="modulos">
                <Folder className="h-4 w-4 mr-2" />
                Módulos
              </TabsTrigger>
              <TabsTrigger value="aulas">
                <Play className="h-4 w-4 mr-2" />
                Aulas
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
                {aulas.map((aula) => (
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
                          {aula.arquivos?.map((arq: any) => (
                            <Badge key={arq.id} variant="outline">{getFileIcon(arq.tipo)} {arq.nome}</Badge>
                          )) || []}
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
                  <Input 
                    placeholder="Título da Aula" 
                    value={novaAula.titulo}
                    onChange={(e) => setNovaAula({...novaAula, titulo: e.target.value})}
                  />
                  <Textarea 
                    placeholder="Descrição da Aula" 
                    value={novaAula.descricao}
                    onChange={(e) => setNovaAula({...novaAula, descricao: e.target.value})}
                  />
                  <Input 
                    placeholder="URL do Vídeo (Bunny.net)" 
                    value={novaAula.videoUrl}
                    onChange={(e) => setNovaAula({...novaAula, videoUrl: e.target.value})}
                  />
                  <Input 
                    type="number" 
                    placeholder="Ordem da Aula (ex: 1, 2, 3...)" 
                    value={novaAula.ordem}
                    onChange={(e) => setNovaAula({...novaAula, ordem: e.target.value})}
                  />
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Arraste e solte arquivos ou clique para enviar</p>
                  </div>
                  <Button onClick={handleSalvarAula} disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Salvando...
                      </div>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Aula
                      </>
                    )}
                  </Button>
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
                  {modulos.map(modulo => (
                      <Card key={modulo.id}>
                          <CardContent className="p-4 flex items-center gap-4">
                              <div className="p-3 bg-blue-100 rounded-lg"><Folder className="h-6 w-6 text-blue-600" /></div>
                              <div className="flex-grow">
                                  <h4 className="font-semibold text-lg">{modulo.titulo}</h4>
                                  <p className="text-sm text-muted-foreground">{modulo.descricao}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{modulo.aulas?.length || 0} aulas</p>
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
                  <Input 
                    placeholder="Título do Módulo" 
                    value={novoModulo.titulo}
                    onChange={(e) => setNovoModulo({...novoModulo, titulo: e.target.value})}
                  />
                  <Textarea 
                    placeholder="Descrição do Módulo" 
                    value={novoModulo.descricao}
                    onChange={(e) => setNovoModulo({...novoModulo, descricao: e.target.value})}
                  />
                  <div className="space-y-2">
                      <p className="font-medium text-sm">Vincular Aulas</p>
                      <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
                          {aulas.map(aula => (
                              <div key={aula.id} className="flex items-center gap-2">
                                  <Checkbox 
                                    id={`aula-${aula.id}`} 
                                    checked={novoModulo.aulasSelecionadas.includes(aula.id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setNovoModulo({
                                          ...novoModulo,
                                          aulasSelecionadas: [...novoModulo.aulasSelecionadas, aula.id]
                                        })
                                      } else {
                                        setNovoModulo({
                                          ...novoModulo,
                                          aulasSelecionadas: novoModulo.aulasSelecionadas.filter(id => id !== aula.id)
                                        })
                                      }
                                    }}
                                  />
                                  <label htmlFor={`aula-${aula.id}`} className="text-sm">{aula.titulo}</label>
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
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Módulo
                      </>
                    )}
                  </Button>
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
                  {cursos.map(curso => (
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
                  <Input 
                    placeholder="Título do Curso" 
                    value={novoCurso.titulo}
                    onChange={(e) => setNovoCurso({...novoCurso, titulo: e.target.value})}
                  />
                  <Textarea 
                    placeholder="Descrição do Curso" 
                    value={novoCurso.descricao}
                    onChange={(e) => setNovoCurso({...novoCurso, descricao: e.target.value})}
                  />
                  <Input 
                    placeholder="Nome do Instrutor" 
                    value={novoCurso.instrutor}
                    onChange={(e) => setNovoCurso({...novoCurso, instrutor: e.target.value})}
                  />
                  <Input 
                    placeholder="Categoria" 
                    value={novoCurso.categoria}
                    onChange={(e) => setNovoCurso({...novoCurso, categoria: e.target.value})}
                  />
                  <Input 
                    type="number" 
                    placeholder="Preço (ex: 297.00)" 
                    value={novoCurso.preco}
                    onChange={(e) => setNovoCurso({...novoCurso, preco: e.target.value})}
                  />
                  <div className="space-y-2">
                      <p className="font-medium text-sm">Vincular Módulos</p>
                      <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
                          {modulos.map(modulo => (
                              <div key={modulo.id} className="flex items-center gap-2">
                                  <Checkbox 
                                    id={`modulo-${modulo.id}`} 
                                    checked={novoCurso.modulosSelecionados.includes(modulo.id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setNovoCurso({
                                          ...novoCurso,
                                          modulosSelecionados: [...novoCurso.modulosSelecionados, modulo.id]
                                        })
                                      } else {
                                        setNovoCurso({
                                          ...novoCurso,
                                          modulosSelecionados: novoCurso.modulosSelecionados.filter(id => id !== modulo.id)
                                        })
                                      }
                                    }}
                                  />
                                  <label htmlFor={`modulo-${modulo.id}`} className="text-sm">{modulo.titulo}</label>
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
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Curso
                      </>
                    )}
                  </Button>
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
