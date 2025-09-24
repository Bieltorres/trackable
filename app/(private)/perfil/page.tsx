"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";

export default function PerfilPage() {
  const user = useAppSelector((state) => state.user.user);

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
              <form className="space-y-4">
                <Input defaultValue={user?.name || ""} placeholder="Nome" />
                <Input defaultValue={user?.email || ""} disabled />
                <Button>Salvar</Button>
              </form>
            </TabsContent>

            <TabsContent value="security">
              <form className="space-y-4">
                <Input type="password" placeholder="Senha atual" />
                <Input type="password" placeholder="Nova senha" />
                <Input type="password" placeholder="Confirmar senha" />
                <Button>Alterar senha</Button>
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
