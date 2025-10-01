// components/admin/dialogs/BunnyDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BunnyDialogProps {
  open: boolean;
  apiKey: string;
  onOpenChange: (open: boolean) => void;
  onApiKeyChange: (key: string) => void;
  onSave: () => void;
}

export function BunnyDialog({
  open,
  apiKey,
  onOpenChange,
  onApiKeyChange,
  onSave,
}: BunnyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Conectar com Bunny.net</DialogTitle>
          <DialogDescription>
            Insira sua API Key da sua Video Library do Bunny.net para conectar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="bunny-api-key"
            placeholder="Sua API Key"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave}>Salvar e Conectar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
