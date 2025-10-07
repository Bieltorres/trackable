// components/admin/course-management/modulos/ModulosTab.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ModulosList } from "./ModulosList";
import { ModuloDialog } from "./ModuloDialog";
import { LoadingSpinner } from "@/components/layout/LoadingSpinner";
import {
  ConfirmDialog,
  useConfirmDialog,
} from "@/components/layout/ConfirmDialog";
import { toast } from "sonner";

interface ModulosTabProps {
  modulos: any[];
  cursos: any[];
  aulas: any[];
  setModulos: (modulos: any[]) => void;
  isLoading: boolean;
}

export function ModulosTab({
  modulos,
  cursos,
  aulas,
  setModulos,
  isLoading,
}: ModulosTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingModulo, setEditingModulo] = useState<any>(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [moduloToDelete, setModuloToDelete] = useState<{
    id: string;
    titulo: string;
  } | null>(null);

  const confirmDialog = useConfirmDialog();

  // Remove duplicados por id
  const modulosUnicos = Array.from(
    new Map(modulos.map((modulo: any) => [modulo.id, modulo])).values()
  );

  const handleEdit = async (id: string) => {
    try {
      setLoadingEdit(true);
      console.log("📝 Carregando módulo para edição:", id);

      // Buscar módulo completo com todas as relações da API
      const response = await fetch(`/api/admin/modulos/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar módulo");
      }

      const modulo = await response.json();
      console.log("✅ Módulo carregado:", modulo);

      setEditingId(id);
      setEditingModulo(modulo);
      setDialogOpen(true);
    } catch (error) {
      console.error("❌ Erro ao carregar módulo para edição:", error);
      toast.error("Erro ao carregar módulo para edição");
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleModuloCreated = (modulo: any) => {
    if (editingId) {
      // Atualizar módulo existente
      setModulos(modulos.map((m) => (m.id === editingId ? modulo : m)));
      toast.success("Módulo atualizado com sucesso!");
    } else {
      // Adicionar novo módulo
      setModulos([modulo, ...modulos]);
      toast.success("Módulo criado com sucesso!");
    }

    // Resetar estado
    setDialogOpen(false);
    setEditingId(null);
    setEditingModulo(null);
  };

  const handleDelete = async (id: string) => {
    const modulo = modulos.find((m) => m.id === id);
    if (!modulo) return;

    setModuloToDelete({ id: modulo.id, titulo: modulo.titulo });
    confirmDialog.openDialog(async () => {
      try {
        console.log("🗑️ Deletando módulo:", id);

        const response = await fetch(`/api/admin/modulos/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erro ao deletar módulo");
        }

        setModulos(modulos.filter((m) => m.id !== id));
        toast.success("Módulo deletado com sucesso!");
      } catch (error) {
        console.error("❌ Erro ao deletar módulo:", error);
        toast.error("Erro ao deletar módulo");
        throw error;
      } finally {
        setModuloToDelete(null);
      }
    });
  };

  const handleOpenDialog = () => {
    setEditingId(null);
    setEditingModulo(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = (open: boolean) => {
    if (!open) {
      setEditingId(null);
      setEditingModulo(null);
    }
    setDialogOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Módulos Cadastrados</h3>
        <Button onClick={handleOpenDialog} disabled={loadingEdit}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Novo Módulo
        </Button>
      </div>

      {loadingEdit && (
        <LoadingSpinner message="Carregando dados do módulo..." />
      )}

      {!loadingEdit && (
        <ModulosList
          modulos={modulosUnicos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <ModuloDialog
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
        cursos={cursos}
        aulas={aulas}
        onModuloCreated={handleModuloCreated}
        editingModulo={editingModulo}
        editingId={editingId}
      />

      <ConfirmDialog
        open={confirmDialog.isOpen}
        onOpenChange={confirmDialog.setIsOpen}
        onConfirm={confirmDialog.handleConfirm}
        title="Excluir Módulo"
        description={
          moduloToDelete
            ? `Tem certeza que deseja excluir o módulo "${moduloToDelete.titulo}"? Esta ação não pode ser desfeita e removerá todos os vínculos com cursos e aulas.`
            : "Tem certeza que deseja excluir este módulo?"
        }
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="destructive"
        isLoading={confirmDialog.isLoading}
      />
    </div>
  );
}
