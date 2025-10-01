// components/admin/course-management/cursos/CursosTab.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CursosList } from "./CursosList";
import { CursoDialog } from "./CursoDialog";
import { LoadingSpinner } from "@/components/layout/LoadingSpinner";
import {
  ConfirmDialog,
  useConfirmDialog,
} from "@/components/layout/ConfirmDialog";
import { toast } from "sonner";

interface CursosTabProps {
  cursos: any[];
  categorias: any[];
  instrutores: any[];
  modulos: any[];
  setCursos: (cursos: any[]) => void;
  setCategorias: (categorias: any[]) => void;
  setInstrutores: (instrutores: any[]) => void;
  isLoading: boolean;
}

export function CursosTab({
  cursos,
  categorias,
  instrutores,
  modulos,
  setCursos,
  setCategorias,
  setInstrutores,
  isLoading,
}: CursosTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [cursoToDelete, setCursoToDelete] = useState<{
    id: string;
    titulo: string;
  } | null>(null);
  const [editingCurso, setEditingCurso] = useState<any>(null);

  const confirmDialog = useConfirmDialog();

  // Remove duplicados
  const cursosUnicos = Array.from(
    new Map(cursos.map((curso: any) => [curso.id, curso])).values()
  );

  const handleEdit = async (id: string) => {
    try {
      setLoadingEdit(true);
      console.log("📝 Carregando curso para edição:", id);

      const response = await fetch(`/api/admin/cursos/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar curso");
      }

      const curso = await response.json();
      console.log("✅ Curso carregado:", curso);

      setEditingId(id);
      setEditingCurso(curso);
      setDialogOpen(true);
    } catch (error) {
      console.error("❌ Erro ao carregar curso para edição:", error);
      toast.error("Erro ao carregar curso para edição");
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleDelete = async (id: string) => {
    const curso = cursos.find((c) => c.id === id);
    if (!curso) return;

    setCursoToDelete({ id: curso.id, titulo: curso.titulo });
    confirmDialog.openDialog(async () => {
      try {
        console.log("🗑️ Deletando curso:", id);

        const response = await fetch(`/api/admin/cursos/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erro ao deletar curso");
        }

        setCursos(cursos.filter((c) => c.id !== id));
        toast.success("Curso deletado com sucesso!");
      } catch (error) {
        console.error("❌ Erro ao deletar curso:", error);
        toast.error("Erro ao deletar curso");
        throw error;
      } finally {
        setCursoToDelete(null);
      }
    });
  };

  const handleCursoCreated = (newCurso: any) => {
    if (editingId) {
      // Atualização
      setCursos(cursos.map((c) => (c.id === editingId ? newCurso : c)));
      toast.success("Curso atualizado com sucesso!");
    } else {
      // Criação
      setCursos([newCurso, ...cursos]);
      toast.success("Curso criado com sucesso!");
    }
    setDialogOpen(false);
    setEditingId(null);
    setEditingCurso(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingId(null);
    setEditingCurso(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Cursos Cadastrados</h3>
        <Button
          onClick={() => {
            setEditingId(null);
            setEditingCurso(null);
            setDialogOpen(true);
          }}
          disabled={loadingEdit}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Novo Curso
        </Button>
      </div>

      {loadingEdit && <LoadingSpinner message="Carregando dados do curso..." />}

      {!loadingEdit && (
        <CursosList
          cursos={cursosUnicos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CursoDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        categorias={categorias}
        instrutores={instrutores}
        modulos={modulos}
        onCursoCreated={handleCursoCreated}
        onCategoriaCreated={(cat) => setCategorias([cat, ...categorias])}
        onInstrutorCreated={(inst) => setInstrutores([inst, ...instrutores])}
        editingCurso={editingCurso}
        editingId={editingId}
      />

      <ConfirmDialog
        open={confirmDialog.isOpen}
        onOpenChange={confirmDialog.setIsOpen}
        onConfirm={confirmDialog.handleConfirm}
        title="Excluir Curso"
        description={
          cursoToDelete
            ? `Tem certeza que deseja excluir o curso "${cursoToDelete.titulo}"? Esta ação não pode ser desfeita e removerá todos os vínculos com módulos e instrutores.`
            : "Tem certeza que deseja excluir este curso?"
        }
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="destructive"
        isLoading={confirmDialog.isLoading}
      />
    </div>
  );
}
