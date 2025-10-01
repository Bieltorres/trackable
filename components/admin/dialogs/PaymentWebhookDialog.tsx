// components/admin/dialogs/PaymentWebhookDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type PaymentPlatform = "stripe" | "ticto";

interface PaymentWebhookDialogProps {
  open: boolean;
  platform: PaymentPlatform | null;
  onOpenChange: (open: boolean) => void;
  onConnect: () => void;
}

export function PaymentWebhookDialog({
  open,
  platform,
  onOpenChange,
  onConnect,
}: PaymentWebhookDialogProps) {
  const { toast } = useToast();

  const getWebhookUrl = () => {
    if (!platform) return "";
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yoursite.com";
    return `${baseUrl}/api/webhooks/${platform}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado",
      description: "URL copiada para a área de transferência!",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Configurar Webhook do{" "}
            {platform && platform.charAt(0).toUpperCase() + platform.slice(1)}
          </DialogTitle>
          <DialogDescription>
            Copie a URL abaixo e cole na seção de webhooks da sua conta{" "}
            {platform}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="webhook-url">URL do Webhook</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input id="webhook-url" readOnly value={getWebhookUrl()} />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(getWebhookUrl())}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Após salvar a URL na plataforma de pagamento, clique em Conectar.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onConnect}>Conectar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
