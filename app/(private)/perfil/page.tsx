"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Calendar, MapPin, Shield, Key, CreditCard, Eye, EyeOff, Save, Trash2, Plus, Check, AlertTriangle } from 'lucide-react'
import { useAppSelector } from "@/store/hooks"
import { useToast } from "@/components/ui/use-toast"

// Dados simulados de métodos de pagamento
const metodosPagemento = [
  {
    id: 1,
    tipo: "credit",
    bandeira: "Visa",
    numero: "**** **** **** 1234",
    nome: "João Silva",
    validade: "12/26",
    principal: true,
  },
  {
    id: 2,
    tipo: "credit",
    bandeira: "Mastercard",
    numero: "**** **** **** 5678",
    nome: "João Silva",
    validade: "08/25",
    principal: false,
  },
]

export default function PerfilPage() {
  const user = useAppSelector((state) => state.user.user)
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  
  const [activeTab, setActiveTab] = useState("dados-gerais")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isStripeLoading, setIsStripeLoading] = useState(false)

  // Estados para os formulários
  const [dadosGerais, setDadosGerais] = useState({
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    endereco: {
      cep: "",
      rua: "",
      cidade: "",
      estado: "",
      pais: "Brasil",
    },
    bio: "",
  })
  const [senhas, setSenhas] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  })
  const [configuracoesSecurity, setConfiguracoesSecurity] = useState({
    autenticacaoDoisFatores: false,
    notificacaoLogin: true,
    sessaoUnica: false,
  })

  useEffect(() => {
    setMounted(true)
    if (user) {
      setDadosGerais(prev => ({
        ...prev,
        nome: user.name || "",
        email: user.email || "",
      }))
    }
  }, [user])

  // Evita problemas de hidratação
  if (!mounted) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Configurações da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSalvarDadosGerais = async () => {
    try {
      setIsLoading(true)
      
      const response = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: dadosGerais.nome,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Informações atualizadas com sucesso!",
        })
      } else {
        toast({
          title: "Erro",
          description: data.error || "Erro ao atualizar informações",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao atualizar informações:", error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar informações",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAlterarSenha = async () => {
    if (senhas.novaSenha !== senhas.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem!",
        variant: "destructive",
      })
      return
    }
    if (senhas.novaSenha.length < 6) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 6 caracteres!",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: senhas.senhaAtual,
          newPassword: senhas.novaSenha,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSenhas({ senhaAtual: "", novaSenha: "", confirmarSenha: "" })
        toast({
          title: "Sucesso",
          description: "Senha alterada com sucesso!",
        })
      } else {
        toast({
          title: "Erro",
          description: data.error || "Erro ao alterar senha",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao alterar senha:", error)
      toast({
        title: "Erro",
        description: "Erro ao alterar senha",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoverCartao = (id: number) => {
    if (confirm("Tem certeza que deseja remover este cartão?")) {
      // Simular remoção
      alert("Cartão removido com sucesso!")
    }
  }

  const handleDefinirPrincipal = (id: number) => {
    // Simular definir como principal
    alert("Cartão definido como principal!")
  }

  async function handleOpenStripePortal() {
    try {
      setIsStripeLoading(true)
      const res = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Optional: include a customerId if you have it in session/context
        body: JSON.stringify({}),
      })
      if (!res.ok) {
        throw new Error("Falha ao criar sessão do Portal de Cobrança")
      }
      const data = await res.json()
      if (data?.url) {
        window.location.href = data.url
      } else {
        alert("Não foi possível abrir o portal da Stripe.")
      }
    } catch (e) {
      alert("Erro ao redirecionar para a Stripe. Tente novamente.")
    } finally {
      setIsStripeLoading(false)
    }
  }

  const getBandeiraIcon = (bandeira: string) => {
    switch (bandeira.toLowerCase()) {
      case "visa":
        return "💳"
      case "mastercard":
        return "💳"
      case "amex":
        return "💳"
      default:
        return "💳"
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6" />
          Configurações da Conta
        </h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Dados Gerais
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="pagamento" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Método de Pagamento
          </TabsTrigger>
        </TabsList>

        {/* Dados Gerais */}
        <TabsContent value="dados-gerais" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={dadosGerais.nome}
                    onChange={(e) => setDadosGerais({ ...dadosGerais, nome: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={dadosGerais.email}
                      disabled
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
                      value={dadosGerais.telefone}
                      onChange={(e) => setDadosGerais({ ...dadosGerais, telefone: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dataNascimento"
                      type="date"
                      value={dadosGerais.dataNascimento}
                      onChange={(e) => setDadosGerais({ ...dadosGerais, dataNascimento: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  value={dadosGerais.bio}
                  onChange={(e) => setDadosGerais({ ...dadosGerais, bio: e.target.value })}
                  rows={3}
                  placeholder="Conte um pouco sobre você..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={dadosGerais.endereco.cep}
                    onChange={(e) =>
                      setDadosGerais({
                        ...dadosGerais,
                        endereco: { ...dadosGerais.endereco, cep: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rua">Endereço</Label>
                  <Input
                    id="rua"
                    value={dadosGerais.endereco.rua}
                    onChange={(e) =>
                      setDadosGerais({
                        ...dadosGerais,
                        endereco: { ...dadosGerais.endereco, rua: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={dadosGerais.endereco.cidade}
                    onChange={(e) =>
                      setDadosGerais({
                        ...dadosGerais,
                        endereco: { ...dadosGerais.endereco, cidade: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select
                    value={dadosGerais.endereco.estado}
                    onValueChange={(value) =>
                      setDadosGerais({
                        ...dadosGerais,
                        endereco: { ...dadosGerais.endereco, estado: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      {/* Adicionar outros estados */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              onClick={handleSalvarDadosGerais} 
              disabled={isLoading || !dadosGerais.nome.trim()}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Salvando...
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        {/* Segurança */}
        <TabsContent value="seguranca" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Alterar Senha
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="senhaAtual">Senha Atual</Label>
                <div className="relative">
                  <Input
                    id="senhaAtual"
                    type={showCurrentPassword ? "text" : "password"}
                    value={senhas.senhaAtual}
                    onChange={(e) => setSenhas({ ...senhas, senhaAtual: e.target.value })}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="novaSenha">Nova Senha</Label>
                <div className="relative">
                  <Input
                    id="novaSenha"
                    type={showNewPassword ? "text" : "password"}
                    value={senhas.novaSenha}
                    onChange={(e) => setSenhas({ ...senhas, novaSenha: e.target.value })}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmarSenha"
                    type={showConfirmPassword ? "text" : "password"}
                    value={senhas.confirmarSenha}
                    onChange={(e) => setSenhas({ ...senhas, confirmarSenha: e.target.value })}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                onClick={handleAlterarSenha} 
                disabled={
                  isLoading || 
                  !senhas.senhaAtual || 
                  !senhas.novaSenha || 
                  senhas.novaSenha.length < 6 ||
                  senhas.novaSenha !== senhas.confirmarSenha
                }
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Alterando...
                  </div>
                ) : (
                  <>
                    <Key className="h-4 w-4 mr-2" />
                    Alterar Senha
                  </>
                )}
              </Button>
              {senhas.novaSenha.length > 0 && senhas.novaSenha.length < 6 && (
                <p className="text-sm text-red-500">A senha deve ter pelo menos 6 caracteres</p>
              )}
              {senhas.confirmarSenha.length > 0 && senhas.confirmarSenha !== senhas.novaSenha && (
                <p className="text-sm text-red-500">As senhas não coincidem</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança à sua conta</p>
                </div>
                <Switch
                  checked={configuracoesSecurity.autenticacaoDoisFatores}
                  onCheckedChange={(checked) =>
                    setConfiguracoesSecurity({ ...configuracoesSecurity, autenticacaoDoisFatores: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificação de Login</Label>
                  <p className="text-sm text-muted-foreground">Receba email quando alguém fizer login na sua conta</p>
                </div>
                <Switch
                  checked={configuracoesSecurity.notificacaoLogin}
                  onCheckedChange={(checked) =>
                    setConfiguracoesSecurity({ ...configuracoesSecurity, notificacaoLogin: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sessão Única</Label>
                  <p className="text-sm text-muted-foreground">
                    Desconecte automaticamente de outros dispositivos ao fazer login
                  </p>
                </div>
                <Switch
                  checked={configuracoesSecurity.sessaoUnica}
                  onCheckedChange={(checked) =>
                    setConfiguracoesSecurity({ ...configuracoesSecurity, sessaoUnica: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Método de Pagamento */}
        <TabsContent value="pagamento" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Gerenciar Pagamentos (Stripe)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  O gerenciamento de cartões e métodos de pagamento é feito diretamente na Stripe.
                  Clique no botão abaixo para acessar sua área segura e atualizar, adicionar ou remover cartões.
                </p>
              </div>
              <Button onClick={handleOpenStripePortal} disabled={isStripeLoading}>
                {isStripeLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Redirecionando...
                  </div>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Gerenciar pagamento na Stripe
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">
                Você será redirecionado para o portal de faturamento da Stripe em uma nova página segura.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Informações Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Segurança:</strong> Seus dados de pagamento são criptografados e protegidos por SSL na Stripe.
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Cobrança:</strong> O cartão principal definido na Stripe será usado para renovações automáticas.
                </p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Cancelamento:</strong> Você pode gerenciar sua assinatura direto pelo portal da Stripe.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
