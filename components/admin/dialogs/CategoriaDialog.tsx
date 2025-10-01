// components/admin/dialogs/CategoriaDialog.tsx
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
import { useCategoriaForm } from "@/components/hooks/admin/useCategoriaForm";

interface CategoriaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoriaCreated: (categoria: any) => void;
}

export function CategoriaDialog({
  open,
  onOpenChange,
  onCategoriaCreated,
}: CategoriaDialogProps) {
  const categoriaForm = useCategoriaForm((newCategoria) => {
    onCategoriaCreated(newCategoria);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Categoria</DialogTitle>
          <DialogDescription>
            Adicione uma nova categoria para os cursos.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Nome da categoria"
            value={categoriaForm.formData.nome}
            onChange={(e) =>
              categoriaForm.setFormData({
                ...categoriaForm.formData,
                nome: e.target.value,
              })
            }
          />
          <div className="space-y-2">
            <Label htmlFor="cor">Cor</Label>
            <Input
              id="cor"
              type="color"
              value={categoriaForm.formData.cor}
              onChange={(e) =>
                categoriaForm.setFormData({
                  ...categoriaForm.formData,
                  cor: e.target.value,
                })
              }
            />
          </div>
          <Input
            placeholder="Ícone (ex: BookOpen, Video, Code)"
            value={categoriaForm.formData.icone}
            onChange={(e) =>
              categoriaForm.setFormData({
                ...categoriaForm.formData,
                icone: e.target.value,
              })
            }
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={categoriaForm.handleSubmit}
            disabled={categoriaForm.isLoading}
          >
            {categoriaForm.isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
