// components/admin/course-management/aulas/AulasTab.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AulasList } from "./AulasList";
import { AulaDialog } from "./AulaDialog";
import { LoadingSpinner } from "@/components/layout/LoadingSpinner";
import {
  ConfirmDialog,
  useConfirmDialog,
} from "@/components/layout/ConfirmDialog";
import { toast } from "sonner";

interface AulasTabProps {
  aulas: any[];
  modulos: any[];
  setAulas: (aulas: any[]) => void;
  isLoading: boolean;
}

export function AulasTab({
  aulas,
  modulos,
  setAulas,
  isLoading,
}: AulasTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingAula, setEditingAula] = useState<any>(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [aulaToDelete, setAulaToDelete] = useState<{
    id: string;
    titulo: string;
  } | null>(null);

  const confirmDialog = useConfirmDialog();

  // Remove duplicadas por id
  const aulasUnicas = Array.from(
    new Map(aulas.map((aula: any) => [aula.id, aula])).values()
  );

  const handleEdit = async (id: string) => {
    try {
      setLoadingEdit(true);
      console.log("📝 Carregando aula para edição:", id);

      // Buscar aula completa com todas as relações da API
      const response = await fetch(`/api/admin/aulas/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar aula");
      }

      const aula = await response.json();
      console.log("✅ Aula carregada:", aula);

      setEditingId(id);
      setEditingAula(aula);
      setDialogOpen(true);
    } catch (error) {
      console.error("❌ Erro ao carregar aula para edição:", error);
      toast.error("Erro ao carregar aula para edição");
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleAulaCreated = (aula: any) => {
    if (editingId) {
      // Atualizar aula existente
      setAulas(aulas.map((a) => (a.id === editingId ? aula : a)));
      toast.success("Aula atualizada com sucesso!");
    } else {
      // Adicionar nova aula
      setAulas([aula, ...aulas]);
      toast.success("Aula criada com sucesso!");
    }

    // Resetar estado
    setDialogOpen(false);
    setEditingId(null);
    setEditingAula(null);
  };

  const handleDelete = async (id: string) => {
    const aula = aulas.find((a) => a.id === id);
    if (!aula) return;

    setAulaToDelete({ id: aula.id, titulo: aula.titulo });
    confirmDialog.openDialog(async () => {
      try {
        console.log("🗑️ Deletando aula:", id);

        const response = await fetch(`/api/admin/aulas/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erro ao deletar aula");
        }

        setAulas(aulas.filter((a) => a.id !== id));
        toast.success("Aula deletada com sucesso!");
      } catch (error) {
        console.error("❌ Erro ao deletar aula:", error);
        toast.error("Erro ao deletar aula");
        throw error;
      } finally {
        setAulaToDelete(null);
      }
    });
  };

  const handleOpenDialog = () => {
    setEditingId(null);
    setEditingAula(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = (open: boolean) => {
    if (!open) {
      setEditingId(null);
      setEditingAula(null);
    }
    setDialogOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Aulas Cadastradas</h3>
        <Button onClick={handleOpenDialog} disabled={loadingEdit}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nova Aula
        </Button>
      </div>

      {loadingEdit && <LoadingSpinner message="Carregando dados da aula..." />}

      {!loadingEdit && (
        <AulasList
          aulas={aulasUnicas}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <AulaDialog
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
        modulos={modulos}
        onAulaCreated={handleAulaCreated}
        editingAula={editingAula}
        editingId={editingId}
      />

      <ConfirmDialog
        open={confirmDialog.isOpen}
        onOpenChange={confirmDialog.setIsOpen}
        onConfirm={confirmDialog.handleConfirm}
        title="Excluir Aula"
        description={
          aulaToDelete
            ? `Tem certeza que deseja excluir a aula "${aulaToDelete.titulo}"? Esta ação não pode ser desfeita.`
            : "Tem certeza que deseja excluir esta aula?"
        }
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="destructive"
        isLoading={confirmDialog.isLoading}
      />
    </div>
  );
}
