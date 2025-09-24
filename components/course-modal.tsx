"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, User, Crown, Sparkles, ShoppingCart, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CourseModalProps {
  cursoId: string | null
  isOpen: boolean
  onClose: () => void
}

export function CourseModal({ cursoId, isOpen, onClose }: CourseModalProps) {
  const [curso, setCurso] = useState<any>(null)
  const [avaliacoes, setAvaliacoes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "pagarme">("stripe")
  const { toast } = useToast()

  // Buscar dados do curso quando o modal abrir
  useEffect(() => {
    const fetchCursoData = async () => {
      if (!cursoId || !isOpen) return

      try {
        setLoading(true)
        
        // Buscar dados do curso
        const cursoResponse = await fetch(`/api/cursos/public/${cursoId}`)
        if (!cursoResponse.ok) {
          throw new Error("Erro ao carregar curso")
        }
        const cursoData = await cursoResponse.json()
        setCurso(cursoData.data)

        // Buscar avaliações do curso
        const avaliacoesResponse = await fetch(`/api/cursos/${cursoId}/avaliacoes`)
        if (avaliacoesResponse.ok) {
          const avaliacoesData = await avaliacoesResponse.json()
          setAvaliacoes(avaliacoesData.avaliacoes || [])
        }
        
      } catch (error) {
        console.error("Erro ao carregar dados do curso:", error)
        toast({
          title: "Erro",
          description: "Erro ao carregar dados do curso",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCursoData()
  }, [cursoId, isOpen, toast])

  const handlePurchase = async () => {
    if (!curso) return

    setIsProcessingPayment(true)

    try {
      // TODO: Implementar integração real com gateway de pagamento
      const response = await fetch(`/api/cursos/${curso.id}/comprar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod,
          preco: curso.preco,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro no processamento do pagamento")
      }

      const data = await response.json()
      
      toast({
        title: "Sucesso!",
        description: "Pagamento processado com sucesso! Você já tem acesso ao curso.",
      })
      
      onClose()
    } catch (error) {
      console.error("Erro no pagamento:", error)
      toast({
        title: "Erro",
        description: "Erro no processamento do pagamento. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const getSpecialBadges = (curso: any) => {
    const badges = []

    if (curso?.bestseller) {
      badges.push(
        <Badge key="bestseller" className="bg-orange-100 text-orange-800">
          <Crown className="h-3 w-3 mr-1" />
          Bestseller
        </Badge>,
      )
    }

    if (curso?.novo) {
      badges.push(
        <Badge key="novo" className="bg-green-100 text-green-800">
          <Sparkles className="h-3 w-3 mr-1" />
          Novo
        </Badge>,
      )
    }

    // Badge baseado na data de criação (curso criado nos últimos 30 dias)
    if (curso?.createdAt) {
      const isNovo = new Date(curso.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      if (isNovo) {
        badges.push(
          <Badge key="novo-auto" className="bg-green-100 text-green-800">
            <Sparkles className="h-3 w-3 mr-1" />
            Novo
          </Badge>,
        )
      }
    }

    return badges
  }

  if (!isOpen) return null

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Carregando dados do curso...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!curso) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Curso não encontrado</p>
              <Button onClick={onClose}>Fechar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold mb-2">{curso.titulo}</DialogTitle>
              <DialogDescription className="text-base mb-4">{curso.descricao}</DialogDescription>
            </div>
            <div className="flex gap-2 ml-4">{getSpecialBadges(curso)}</div>
          </div>
        </DialogHeader>

        {/* Vídeo Centralizado */}
        <div className="px-6 mb-6">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative max-w-4xl mx-auto">
            {curso.videoPreview ? (
              <video className="w-full h-full object-cover" controls poster={curso.thumbnail}>
                <source src={curso.videoPreview} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            ) : curso.thumbnail ? (
              <img 
                src={curso.thumbnail} 
                alt={curso.titulo}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Preview não disponível</p>
              </div>
            )}

            {/* Overlay com informações do vídeo */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/70 text-white p-3 rounded-lg">
                <h4 className="font-semibold mb-1">
                  {curso.videoPreview ? "Apresentação do Curso" : "Thumbnail do Curso"}
                </h4>
                <p className="text-sm opacity-90">
                  {curso.videoPreview 
                    ? "Conheça o conteúdo completo e metodologia do curso"
                    : "Visualize o conteúdo que você irá aprender"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Avaliações Reais */}
        {avaliacoes.length > 0 && (
          <div className="px-6 mb-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-center mb-6">O que nossos alunos dizem:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {avaliacoes.slice(0, 3).map((avaliacao, index) => {
                  const colors = [
                    { bg: "bg-blue-100", text: "text-blue-600" },
                    { bg: "bg-green-100", text: "text-green-600" },
                    { bg: "bg-purple-100", text: "text-purple-600" },
                  ]
                  const color = colors[index % colors.length]

                  return (
                    <div key={avaliacao.id} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 ${color.bg} rounded-full flex items-center justify-center mr-3`}>
                          <User className={`h-6 w-6 ${color.text}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold">{avaliacao.usuario?.name || "Usuário"}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < avaliacao.nota 
                                    ? "fill-yellow-400 text-yellow-400" 
                                    : "text-gray-300"
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        "{avaliacao.comentario || "Excelente curso, recomendo!"}"
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Informações do Curso e Botão */}
        <div className="px-6 pb-6">
          <div className="max-w-md mx-auto">
            {/* Preço */}
            {curso.preco && (
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-green-600">
                  R$ {curso.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                {curso.precoOriginal && curso.precoOriginal > curso.preco && (
                  <p className="text-lg text-gray-500 line-through">
                    R$ {curso.precoOriginal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                )}
              </div>
            )}

            {/* Informações adicionais */}
            <div className="text-center mb-6 text-sm text-muted-foreground">
              <p>✓ Acesso vitalício</p>
              <p>✓ Certificado de conclusão</p>
              <p>✓ Suporte do instrutor</p>
              {curso._count?.usuarioCursos && (
                <p>✓ {curso._count.usuarioCursos} alunos já matriculados</p>
              )}
            </div>

            <Button
              onClick={handlePurchase}
              disabled={isProcessingPayment}
              className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 shadow-lg"
            >
              {isProcessingPayment ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Adquirir Agora
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
