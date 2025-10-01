// components/admin/dialogs/InstrutorDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useInstrutorForm } from "@/components/hooks/admin/useInstrutorForm";

interface InstrutorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInstrutorCreated: (instrutor: any) => void;
}

export function InstrutorDialog({
  open,
  onOpenChange,
  onInstrutorCreated,
}: InstrutorDialogProps) {
  const instrutorForm = useInstrutorForm((newInstrutor) => {
    onInstrutorCreated(newInstrutor);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Instrutor</DialogTitle>
          <DialogDescription>
            Adicione um novo instrutor para os cursos.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Nome do instrutor"
            value={instrutorForm.formData.nome}
            onChange={(e) =>
              instrutorForm.setFormData({
                ...instrutorForm.formData,
                nome: e.target.value,
              })
            }
          />
          <Textarea
            placeholder="Biografia do instrutor"
            value={instrutorForm.formData.bio}
            onChange={(e) =>
              instrutorForm.setFormData({
                ...instrutorForm.formData,
                bio: e.target.value,
              })
            }
          />
          <Input
            placeholder="URL do avatar"
            value={instrutorForm.formData.avatar}
            onChange={(e) =>
              instrutorForm.setFormData({
                ...instrutorForm.formData,
                avatar: e.target.value,
              })
            }
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={instrutorForm.handleSubmit}
            disabled={instrutorForm.isLoading}
          >
            {instrutorForm.isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
