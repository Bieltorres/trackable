// components/admin/dialogs/CategoriaDialog.tsx
import type { ElementType } from "react";
import * as Icons from "lucide-react";
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
  const iconRecord = Icons as Record<string, ElementType>;
  const IconPreview =
    iconRecord[categoriaForm.formData.icone] ?? Icons.BookOpen;

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
          <div className="space-y-2">
            <Label>Icone sugerido</Label>
            <div className="flex items-center justify-between rounded-md border border-input bg-muted/40 px-3 py-2">
              <div className="flex items-center gap-2">
                <IconPreview className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {categoriaForm.formData.icone}
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={categoriaForm.randomizeIcon}
              >
                Gerar outro
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Escolheremos um icone automaticamente ao salvar.
            </p>
          </div>
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
