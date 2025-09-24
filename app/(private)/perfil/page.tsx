"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";

export default function PerfilPage() {
  const user = useAppSelector((state) => state.user.user);
  const [mounted, setMounted] = useState(false);
  
  // Estados para o formulário de informações
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  // Estados para o formulário de segurança
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setMounted(true);
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Evita problemas de hidratação
  if (!mounted) {
    return (
      <div className="p-6">
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
    );
  }

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar as informações
    console.log("Salvando informações:", { name, email });
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Limpar formulário
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        
        // Aqui você pode adicionar uma notificação de sucesso
        alert("Senha alterada com sucesso!");
      } else {
        // Aqui você pode adicionar uma notificação de erro
        alert(data.error || "Erro ao alterar senha");
      }
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      alert("Erro ao alterar senha");
    }
  };

  const isInfoFormValid = name.trim().length > 0;
  const isSecurityFormValid = 
    currentPassword.length > 0 && 
    newPassword.length >= 6 && 
    confirmPassword === newPassword;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações da Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
              <TabsTrigger value="billing">Pagamentos</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <form onSubmit={handleInfoSubmit} className="space-y-4">
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome" 
                />
                <Input 
                  value={email} 
                  disabled 
                />
                <Button type="submit" disabled={!isInfoFormValid}>
                  Salvar
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="security">
              <form onSubmit={handleSecuritySubmit} className="space-y-4">
                <Input 
                  type="password" 
                  placeholder="Senha atual"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Input 
                  type="password" 
                  placeholder="Nova senha (mínimo 6 caracteres)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input 
                  type="password" 
                  placeholder="Confirmar senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {newPassword.length > 0 && newPassword.length < 6 && (
                  <p className="text-sm text-red-500">A senha deve ter pelo menos 6 caracteres</p>
                )}
                {confirmPassword.length > 0 && confirmPassword !== newPassword && (
                  <p className="text-sm text-red-500">As senhas não coincidem</p>
                )}
                <Button type="submit" disabled={!isSecurityFormValid}>
                  Alterar senha
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="billing">
              <p>
                Aqui futuramente entra integração com Stripe (histórico de
                compras, métodos de pagamento, etc).
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
