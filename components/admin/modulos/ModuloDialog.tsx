// components/admin/course-management/modulos/ModuloDialog.tsx
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
import { Settings, Save } from "lucide-react";
import { toast } from "sonner";

interface ModuloFormData {
  titulo: string;
  descricao: string;
  ordem: string;
  aulasSelecionadas: string[];
  cursosSelecionados: string[];
}

interface ModuloDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cursos: Array<{ id: string; titulo: string }>;
  aulas: Array<{ id: string; titulo: string }>;
  onModuloCreated: (modulo: any) => void;
  editingModulo?: any;
  editingId?: string | null;
}

export function ModuloDialog({
  open,
  onOpenChange,
  cursos,
  aulas,
  onModuloCreated,
  editingModulo,
  editingId,
}: ModuloDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ModuloFormData>({
    titulo: "",
    descricao: "",
    ordem: "",
    aulasSelecionadas: [],
    cursosSelecionados: [],
  });

  // Preencher formulário quando estiver editando
  useEffect(() => {
    if (editingModulo && editingId) {
      console.log("Preenchendo formulário com dados do módulo:", editingModulo);

      // Extrair IDs dos cursos
      const cursosSelecionados = editingModulo.cursoModulos
        ? editingModulo.cursoModulos.map((cm: any) => cm.cursoId)
        : [];

      // Extrair IDs das aulas
      const aulasSelecionadas = editingModulo.moduloAulas
        ? editingModulo.moduloAulas.map((ma: any) => ma.aulaId)
        : [];

      setFormData({
        titulo: editingModulo.titulo || "",
        descricao: editingModulo.descricao || "",
        ordem: editingModulo.ordem?.toString() || "",
        aulasSelecionadas,
        cursosSelecionados,
      });
    } else {
      // Resetar formulário ao criar novo
      setFormData({
        titulo: "",
        descricao: "",
        ordem: "",
        aulasSelecionadas: [],
        cursosSelecionados: [],
      });
    }
  }, [editingModulo, editingId, open]);

  const handleSubmit = async () => {
    console.log("ModuloDialog handleSubmit, editingId:", editingId);

    if (!formData.titulo || !formData.ordem) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setIsLoading(true);

    try {
      const url = editingId
        ? `/api/admin/modulos/${editingId}`
        : "/api/admin/modulos";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: formData.titulo,
          descricao: formData.descricao,
          ordem: parseInt(formData.ordem),
          aulasSelecionadas: formData.aulasSelecionadas,
          cursosSelecionados: formData.cursosSelecionados,
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(
          editingId ? "Erro ao atualizar módulo" : "Erro ao criar módulo"
        );
      }

      const moduloSalvo = await response.json();
      console.log("Módulo salvo:", moduloSalvo);

      toast.success(
        editingId
          ? "Módulo atualizado com sucesso!"
          : "Módulo criado com sucesso!"
      );
      onModuloCreated(moduloSalvo);
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao salvar módulo:", error);
      toast.error(
        editingId ? "Erro ao atualizar módulo" : "Erro ao criar módulo"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            {editingId ? "Editar Módulo" : "Adicionar Novo Módulo"}
          </DialogTitle>
        </DialogHeader>

        <div className="w-full space-y-6">
          <div>
            <Label>Título do Módulo</Label>
            <Input
              placeholder="Título do Módulo"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Ordem do Módulo</Label>
            <Input
              type="number"
              placeholder="Ordem do Módulo"
              value={formData.ordem}
              onChange={(e) =>
                setFormData({ ...formData, ordem: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Descrição do Módulo</Label>
            <Textarea
              placeholder="Descrição do Módulo"
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Vincular Cursos</Label>
            <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
              {cursos.length === 0 ? (
                <p className="text-sm text-muted-foreground p-2">
                  Nenhum curso disponível. Crie um curso primeiro.
                </p>
              ) : (
                cursos.map((curso) => (
                  <label
                    key={curso.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={curso.id}
                      checked={
                        Array.isArray(formData.cursosSelecionados) &&
                        formData.cursosSelecionados.includes(curso.id)
                      }
                      onChange={(e) => {
                        const currentCursos = Array.isArray(
                          formData.cursosSelecionados
                        )
                          ? formData.cursosSelecionados
                          : [];
                        const newCursos = e.target.checked
                          ? [...currentCursos, curso.id]
                          : currentCursos.filter((id) => id !== curso.id);
                        setFormData({
                          ...formData,
                          cursosSelecionados: newCursos,
                        });
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{curso.titulo}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Vincular Aulas</Label>
            <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
              {aulas.length === 0 ? (
                <p className="text-sm text-muted-foreground p-2">
                  Nenhuma aula disponível. Crie uma aula primeiro.
                </p>
              ) : (
                aulas.map((aula) => (
                  <label
                    key={aula.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={aula.id}
                      checked={
                        Array.isArray(formData.aulasSelecionadas) &&
                        formData.aulasSelecionadas.includes(aula.id)
                      }
                      onChange={(e) => {
                        const currentAulas = Array.isArray(
                          formData.aulasSelecionadas
                        )
                          ? formData.aulasSelecionadas
                          : [];
                        const newAulas = e.target.checked
                          ? [...currentAulas, aula.id]
                          : currentAulas.filter((id) => id !== aula.id);
                        setFormData({
                          ...formData,
                          aulasSelecionadas: newAulas,
                        });
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{aula.titulo}</span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Salvando...
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {editingId ? "Atualizar Módulo" : "Salvar Módulo"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
