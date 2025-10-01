// hooks/admin/usePaymentWebhooks.ts
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type PaymentPlatform = "stripe" | "ticto";

export function usePaymentWebhooks() {
  const { toast } = useToast();
  const [connectedWebhooks, setConnectedWebhooks] = useState<PaymentPlatform[]>(
    []
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPlatform, setCurrentPlatform] =
    useState<PaymentPlatform | null>(null);

  const handleOpenDialog = (platform: PaymentPlatform) => {
    setCurrentPlatform(platform);
    setDialogOpen(true);
  };

  const handleConnect = () => {
    if (currentPlatform) {
      setConnectedWebhooks((prev) => {
        if (prev.includes(currentPlatform)) {
          return prev;
        }
        return [...prev, currentPlatform];
      });
      toast({
        title: "Sucesso",
        description: `Webhook do ${currentPlatform} conectado com sucesso!`,
      });
    }
    setDialogOpen(false);
    setCurrentPlatform(null);
  };

  return {
    connectedWebhooks,
    dialogOpen,
    currentPlatform,
    setDialogOpen,
    handleOpenDialog,
    handleConnect,
  };
}
