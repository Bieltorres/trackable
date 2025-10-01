// components/admin/course-management/cursos/CursoDialog.tsx
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings, Save, PlusCircle } from "lucide-react";
import { useCursoForm } from "@/components/hooks/admin/useCursoForm";
import { CategoriaDialog } from "../dialogs/CategoriaDialog";
import { InstrutorDialog } from "../dialogs/InstrutorDialog";
import { toast } from "sonner";

interface CursoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categorias: any[];
  instrutores: any[];
  modulos: any[];
  onCursoCreated: (curso: any) => void;
  onCategoriaCreated: (categoria: any) => void;
  onInstrutorCreated: (instrutor: any) => void;
  editingCurso?: any;
  editingId?: string | null;
}

export function CursoDialog({
  open,
  onOpenChange,
  categorias,
  instrutores,
  modulos,
  onCursoCreated,
  onCategoriaCreated,
  onInstrutorCreated,
  editingCurso,
  editingId,
}: CursoDialogProps) {
  const [categoriaDialogOpen, setCategoriaDialogOpen] = useState(false);
  const [instrutorDialogOpen, setInstrutorDialogOpen] = useState(false);

  const cursoForm = useCursoForm((newCurso) => {
    onCursoCreated(newCurso);
  });

  // Preencher formulário quando estiver editando
  useEffect(() => {
    if (editingCurso && editingId) {
      console.log("Preenchendo formulário com dados do curso:", editingCurso);

      // Extrair IDs dos instrutores
      const instrutoresIds = editingCurso.instrutores
        ? editingCurso.instrutores.map((ci: any) => ci.instrutorId)
        : [];

      // Extrair IDs dos módulos
      const modulosSelecionados = editingCurso.cursoModulos
        ? editingCurso.cursoModulos.map((cm: any) => cm.moduloId)
        : [];

      cursoForm.setFormData({
        titulo: editingCurso.titulo || "",
        descricao: editingCurso.descricao || "",
        instrutoresIds,
        categoriaId: editingCurso.categoriaId || "",
        preco: editingCurso.preco?.toString() || "",
        nivel: editingCurso.nivel || "iniciante",
        modulosSelecionados,
      });
    } else {
      // Resetar formulário ao criar novo
      cursoForm.setFormData({
        titulo: "",
        descricao: "",
        instrutoresIds: [],
        categoriaId: "",
        preco: "",
        nivel: "iniciante",
        modulosSelecionados: [],
      });
    }
  }, [editingCurso, editingId, open]);

  const handleSubmit = async () => {
    console.log("CursoDialog handleSubmit, editingId:", editingId);

    if (!editingId) {
      // Modo criação
      console.log("Modo CRIAÇÃO");
      cursoForm.handleSubmit();
      return;
    }

    // Modo edição
    console.log("Modo EDIÇÃO - fazendo PUT");

    try {
      const response = await fetch(`/api/admin/cursos/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: cursoForm.formData.titulo,
          descricao: cursoForm.formData.descricao,
          categoriaId: cursoForm.formData.categoriaId,
          nivel: cursoForm.formData.nivel,
          preco: cursoForm.formData.preco,
          instrutoresIds: cursoForm.formData.instrutoresIds,
          modulosSelecionados: cursoForm.formData.modulosSelecionados,
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Erro ao atualizar curso");
      }

      const cursoAtualizado = await response.json();
      console.log("Curso atualizado:", cursoAtualizado);

      onCursoCreated(cursoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      toast.error("Erro ao atualizar curso");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-7xl h-[90vh] flex flex-col overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6" />
              {editingId ? "Editar Curso" : "Adicionar Novo Curso"}
            </DialogTitle>
          </DialogHeader>

          <div className="w-full space-y-6">
            <div>
              <Label>Título do Curso</Label>
              <Input
                placeholder="Título do Curso"
                value={cursoForm.formData.titulo}
                onChange={(e) =>
                  cursoForm.setFormData({
                    ...cursoForm.formData,
                    titulo: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Descrição</Label>
              <Textarea
                placeholder="Descrição do Curso"
                value={cursoForm.formData.descricao}
                onChange={(e) =>
                  cursoForm.setFormData({
                    ...cursoForm.formData,
                    descricao: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCategoriaDialogOpen(true)}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Nova
                </Button>
              </div>

              <select
                id="categoria"
                value={cursoForm.formData.categoriaId}
                onChange={(e) =>
                  cursoForm.setFormData({
                    ...cursoForm.formData,
                    categoriaId: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="instrutores">Instrutores</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setInstrutorDialogOpen(true)}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Novo
                </Button>
              </div>

              <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
                {instrutores.map((instrutor) => (
                  <label
                    key={instrutor.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={instrutor.id}
                      checked={
                        Array.isArray(cursoForm.formData.instrutoresIds) &&
                        cursoForm.formData.instrutoresIds.includes(instrutor.id)
                      }
                      onChange={(e) => {
                        const currentInstrutores = Array.isArray(
                          cursoForm.formData.instrutoresIds
                        )
                          ? cursoForm.formData.instrutoresIds
                          : [];
                        const newInstrutores = e.target.checked
                          ? [...currentInstrutores, instrutor.id]
                          : currentInstrutores.filter(
                              (id) => id !== instrutor.id
                            );
                        cursoForm.setFormData({
                          ...cursoForm.formData,
                          instrutoresIds: newInstrutores,
                        });
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{instrutor.nome}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label>Preço</Label>
              <Input
                type="number"
                placeholder="Preço (ex: 297.00)"
                value={cursoForm.formData.preco}
                onChange={(e) =>
                  cursoForm.setFormData({
                    ...cursoForm.formData,
                    preco: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="nivel">Nível do Curso</Label>
              <select
                id="nivel"
                value={cursoForm.formData.nivel}
                onChange={(e) =>
                  cursoForm.setFormData({
                    ...cursoForm.formData,
                    nivel: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Vincular Módulos</Label>
              <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
                {modulos.map((modulo) => (
                  <label
                    key={modulo.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={modulo.id}
                      checked={
                        Array.isArray(cursoForm.formData.modulosSelecionados) &&
                        cursoForm.formData.modulosSelecionados.includes(
                          modulo.id
                        )
                      }
                      onChange={(e) => {
                        const currentModulos = Array.isArray(
                          cursoForm.formData.modulosSelecionados
                        )
                          ? cursoForm.formData.modulosSelecionados
                          : [];
                        const newModulos = e.target.checked
                          ? [...currentModulos, modulo.id]
                          : currentModulos.filter((id) => id !== modulo.id);
                        cursoForm.setFormData({
                          ...cursoForm.formData,
                          modulosSelecionados: newModulos,
                        });
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{modulo.titulo}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit} disabled={cursoForm.isLoading}>
              {cursoForm.isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Salvando...
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {editingId ? "Atualizar Curso" : "Salvar Curso"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CategoriaDialog
        open={categoriaDialogOpen}
        onOpenChange={setCategoriaDialogOpen}
        onCategoriaCreated={(cat) => {
          onCategoriaCreated(cat);
          setCategoriaDialogOpen(false);
        }}
      />

      <InstrutorDialog
        open={instrutorDialogOpen}
        onOpenChange={setInstrutorDialogOpen}
        onInstrutorCreated={(inst) => {
          onInstrutorCreated(inst);
          setInstrutorDialogOpen(false);
        }}
      />
    </>
  );
}
