"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, User, Crown, Sparkles, ShoppingCart } from "lucide-react"

interface CourseModalProps {
  curso: any
  isOpen: boolean
  onClose: () => void
}

export function CourseModal({ curso, isOpen, onClose }: CourseModalProps) {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "pagarme">("stripe")

  const handlePurchase = async () => {
    setIsProcessingPayment(true)

    try {
      // Simular processamento de pagamento
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Aqui você integraria com Stripe ou Pagar.me
      if (paymentMethod === "stripe") {
        // Integração com Stripe
        console.log("Processando pagamento via Stripe...")
      } else {
        // Integração com Pagar.me
        console.log("Processando pagamento via Pagar.me...")
      }

      // Simular sucesso
      alert("Pagamento processado com sucesso! Você já tem acesso ao curso.")
      onClose()
    } catch (error) {
      alert("Erro no processamento do pagamento. Tente novamente.")
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const getSpecialBadges = (curso: any) => {
    const badges = []

    if (curso.bestseller) {
      badges.push(
        <Badge key="bestseller" className="bg-orange-100 text-orange-800">
          <Crown className="h-3 w-3 mr-1" />
          Bestseller
        </Badge>,
      )
    }

    if (curso.novo) {
      badges.push(
        <Badge key="novo" className="bg-green-100 text-green-800">
          <Sparkles className="h-3 w-3 mr-1" />
          Novo
        </Badge>,
      )
    }

    return badges
  }

  if (!curso) return null

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
            <video className="w-full h-full object-cover" controls poster={curso.thumbnail}>
              <source src="/placeholder-video.mp4" type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>

            {/* Overlay com informações do vídeo */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/70 text-white p-3 rounded-lg">
                <h4 className="font-semibold mb-1">Apresentação do Curso</h4>
                <p className="text-sm opacity-90">Conheça o conteúdo completo e metodologia do curso</p>
              </div>
            </div>
          </div>
        </div>

        {/* Depoimentos Centralizados */}
        <div className="px-6 mb-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-center mb-6">O que nossos alunos dizem:</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Depoimento 1 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Maria Silva</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "Curso incrível! Consegui aplicar as estratégias e aumentei minhas vendas em 300% no primeiro mês."
                </p>
              </div>

              {/* Depoimento 2 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">João Santos</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "Metodologia clara e objetiva. Em 2 semanas já estava implementando tudo que aprendi."
                </p>
              </div>

              {/* Depoimento 3 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Ana Costa</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "Melhor investimento que fiz! O suporte do instrutor é excepcional e o conteúdo é muito completo."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Centralizado */}
        <div className="px-6 pb-6">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handlePurchase}
              disabled={isProcessingPayment}
              className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 shadow-lg"
            >
              {isProcessingPayment ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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
