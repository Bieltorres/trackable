// components/admin/payments/PaymentWebhooks.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentCard } from "./PaymentCard";
import { PaymentWebhookDialog } from "../dialogs/PaymentWebhookDialog";
import { usePaymentWebhooks } from "@/components/hooks/admin/usePaymentWebhooks";

export function PaymentWebhooks() {
  const payment = usePaymentWebhooks();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Webhooks de Pagamento</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PaymentCard
          platform="stripe"
          isConnected={payment.connectedWebhooks.includes("stripe")}
          onClick={() => payment.handleOpenDialog("stripe")}
        />
        <PaymentCard
          platform="ticto"
          isConnected={payment.connectedWebhooks.includes("ticto")}
          onClick={() => payment.handleOpenDialog("ticto")}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks Conectados</CardTitle>
        </CardHeader>
        <CardContent>
          {payment.connectedWebhooks.length > 0 ? (
            <ul className="list-disc list-inside">
              {payment.connectedWebhooks.map((p) => (
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

      <PaymentWebhookDialog
        open={payment.dialogOpen}
        platform={payment.currentPlatform}
        onOpenChange={payment.setDialogOpen}
        onConnect={payment.handleConnect}
      />
    </div>
  );
}
