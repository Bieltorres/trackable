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
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Key,
  CreditCard,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Plus,
  Check,
  AlertTriangle,
} from "lucide-react"

interface UserSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

// Dados simulados do usuário
const userData = {
  nome: "João Silva",
  email: "joao@email.com",
  telefone: "+55 (11) 99999-9999",
  dataNascimento: "1990-05-15",
  endereco: {
    cep: "01234-567",
    rua: "Rua das Flores, 123",
    cidade: "São Paulo",
    estado: "SP",
    pais: "Brasil",
  },
  bio: "Empreendedor digital apaixonado por marketing e vendas. Sempre em busca de conhecimento para crescer profissionalmente.",
}

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

export function UserSettingsModal({ isOpen, onClose }: UserSettingsModalProps) {
  const [activeTab, setActiveTab] = useState("dados-gerais")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Estados para os formulários
  const [dadosGerais, setDadosGerais] = useState(userData)
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

  const handleSalvarDadosGerais = async () => {
    setIsLoading(true)
    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    alert("Dados salvos com sucesso!")
  }

  const handleAlterarSenha = async () => {
    if (senhas.novaSenha !== senhas.confirmarSenha) {
      alert("As senhas não coincidem!")
      return
    }
    if (senhas.novaSenha.length < 8) {
      alert("A nova senha deve ter pelo menos 8 caracteres!")
      return
    }

    setIsLoading(true)
    // Simular alteração de senha
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setSenhas({ senhaAtual: "", novaSenha: "", confirmarSenha: "" })
    alert("Senha alterada com sucesso!")
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Configurações da Conta
          </DialogTitle>
        </DialogHeader>

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
                        onChange={(e) => setDadosGerais({ ...dadosGerais, email: e.target.value })}
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
              <Button onClick={handleSalvarDadosGerais} disabled={isLoading}>
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
                  <p className="text-xs text-muted-foreground">Mínimo de 8 caracteres</p>
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

                <Button onClick={handleAlterarSenha} disabled={isLoading}>
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
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Cartões Salvos
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Cartão
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {metodosPagemento.map((cartao) => (
                  <div
                    key={cartao.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{getBandeiraIcon(cartao.bandeira)}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{cartao.bandeira}</p>
                          <span className="text-muted-foreground">{cartao.numero}</span>
                          {cartao.principal && (
                            <Badge variant="secondary" className="text-xs">
                              <Check className="h-3 w-3 mr-1" />
                              Principal
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {cartao.nome} • Válido até {cartao.validade}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!cartao.principal && (
                        <Button variant="outline" size="sm" onClick={() => handleDefinirPrincipal(cartao.id)}>
                          Definir como Principal
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoverCartao(cartao.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
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
                    <strong>Segurança:</strong> Seus dados de pagamento são criptografados e protegidos por SSL.
                  </p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Cobrança:</strong> O cartão principal será usado para renovações automáticas.
                  </p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Cancelamento:</strong> Você pode cancelar sua assinatura a qualquer momento.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
