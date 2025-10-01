// components/admin/course-management/aulas/AulasTab.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AulasList } from "./AulasList";
import { AulaForm } from "./AulaForm";
import { LoadingSpinner } from "@/components/layout/LoadingSpinner";
import { ConfirmDialog, useConfirmDialog } from "@/components/layout/ConfirmDialog";
import { useAulaForm } from "@/components/hooks/admin/useAulaForm";
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
  const [showForm, setShowForm] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [aulaToDelete, setAulaToDelete] = useState<{
    id: string;
    titulo: string;
  } | null>(null);

  const confirmDialog = useConfirmDialog();

  const aulaForm = useAulaForm((newAula) => {
    setAulas([newAula, ...aulas]);
    toast.success("Aula criada com sucesso!");
    setShowForm(false);
  });

  // Remove duplicadas por id
  const aulasUnicas = Array.from(
    new Map(aulas.map((aula: any) => [aula.id, aula])).values()
  );

  const handleEdit = async (id: string) => {
    try {
      setLoadingEdit(true);

      // ✅ Buscar aula completa com todas as relações da API
      const response = await fetch(`/api/admin/aulas/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar aula");
      }

      const aula = await response.json();

      setEditingId(id);

      // Extrair os IDs dos módulos do array aulaModulos
      const moduloIds = aula.aulaModulos
        ? aula.aulaModulos.map((am: any) => am.moduloId)
        : [];

      console.log("Aula completa da API:", aula);
      console.log("aulaModulos:", aula.aulaModulos);
      console.log("moduloIds extraídos:", moduloIds);

      aulaForm.setFormData({
        titulo: aula.titulo,
        descricao: aula.descricao || "",
        videoUrl: aula.videoUrl || "",
        duracao: aula.duracao || "",
        ordem: aula.ordem?.toString() || "1",
        moduloIds: moduloIds,
        arquivos: aula.arquivos || [],
      });
      setShowForm(true);
    } catch (error) {
      console.error("Erro ao carregar aula para edição:", error);
      toast.error("Erro ao carregar aula para edição");
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleSubmitEdit = async () => {
    console.log("🔘 handleSubmitEdit chamado, editingId:", editingId);

    if (!editingId) {
      console.log("➡️ Modo CRIAÇÃO - chamando aulaForm.handleSubmit");
      // Criação - deixa o hook fazer tudo
      aulaForm.handleSubmit();
      return;
    }

    console.log("➡️ Modo EDIÇÃO - fazendo PUT");

    // Edição
    try {
      console.log("📤 Enviando PUT para:", `/api/admin/aulas/${editingId}`);

      const response = await fetch(`/api/admin/aulas/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: aulaForm.formData.titulo,
          descricao: aulaForm.formData.descricao,
          videoUrl: aulaForm.formData.videoUrl,
          duracao: aulaForm.formData.duracao,
          ordem: parseInt(aulaForm.formData.ordem) || 1,
          moduloIds: aulaForm.formData.moduloIds,
          arquivos: aulaForm.formData.arquivos || [],
        }),
      });

      console.log("📥 Response status:", response.status, response.ok);

      if (!response.ok) {
        throw new Error("Erro ao atualizar aula");
      }

      const aulaAtualizada = await response.json();
      console.log("✅ Aula atualizada:", aulaAtualizada);

      setAulas(aulas.map((a) => (a.id === editingId ? aulaAtualizada : a)));

      console.log("🎉 Chamando toast.success");
      toast.success("Aula atualizada com sucesso!");

      handleCancelEdit();
    } catch (error) {
      console.error("❌ Erro ao atualizar aula:", error);
      toast.error("Erro ao atualizar aula");
    }
  };

  const handleDelete = async (id: string) => {
    const aula = aulas.find((a) => a.id === id);
    if (!aula) return;

    setAulaToDelete({ id: aula.id, titulo: aula.titulo });
    confirmDialog.openDialog(async () => {
      try {
        const response = await fetch(`/api/admin/aulas/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erro ao deletar aula");
        }

        setAulas(aulas.filter((a) => a.id !== id));
        toast.success("Aula deletada com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar aula:", error);
        toast.error("Erro ao deletar aula");
        throw error; // Re-throw para o hook tratar
      } finally {
        setAulaToDelete(null);
      }
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setShowForm(false);
    aulaForm.setFormData({
      titulo: "",
      descricao: "",
      videoUrl: "",
      duracao: "",
      ordem: "1",
      moduloIds: [],
      arquivos: [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Aulas Cadastradas</h3>
        <Button
          onClick={() => {
            if (editingId) {
              handleCancelEdit();
            } else {
              setShowForm(!showForm);
            }
          }}
          disabled={loadingEdit}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          {editingId
            ? "Cancelar Edição"
            : showForm
            ? "Ocultar Formulário"
            : "Nova Aula"}
        </Button>
      </div>

      {loadingEdit && <LoadingSpinner message="Carregando dados da aula..." />}

      {!loadingEdit && (
        <>
          <AulasList
            aulas={aulasUnicas}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {showForm && (
            <AulaForm
              formData={aulaForm.formData}
              modulos={modulos}
              isLoading={aulaForm.isLoading}
              onChange={aulaForm.setFormData}
              onSubmit={editingId ? handleSubmitEdit : aulaForm.handleSubmit}
              isEditing={!!editingId}
            />
          )}
        </>
      )}

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
