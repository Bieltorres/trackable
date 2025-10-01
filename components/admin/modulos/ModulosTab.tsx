// components/admin/course-management/modulos/ModulosTab.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ModulosList } from "./ModulosList";
import { ModuloForm } from "./ModuloForm";
import { LoadingSpinner } from "@/components/layout/LoadingSpinner";
import { ConfirmDialog, useConfirmDialog } from "@/components/layout/ConfirmDialog";
import { useModuloForm } from "@/components/hooks/admin/useModuloForm";
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
  const [showForm, setShowForm] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [moduloToDelete, setModuloToDelete] = useState<{
    id: string;
    titulo: string;
  } | null>(null);

  const confirmDialog = useConfirmDialog();

  const moduloForm = useModuloForm((newModulo) => {
    setModulos([newModulo, ...modulos]);
    toast.success("Módulo criado com sucesso!");
    setShowForm(false);
  });

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

      // Extrair os IDs das aulas vinculadas
      const aulasSelecionadas = modulo.aulaModulos
        ? modulo.aulaModulos.map((am: any) => am.aulaId)
        : [];

      // Extrair os IDs dos cursos vinculados
      const cursosSelecionados = modulo.cursoModulos
        ? modulo.cursoModulos.map((cm: any) => cm.cursoId)
        : [];

      console.log("Aulas selecionadas:", aulasSelecionadas);
      console.log("Cursos selecionados:", cursosSelecionados);

      moduloForm.setFormData({
        titulo: modulo.titulo,
        descricao: modulo.descricao || "",
        ordem: modulo.ordem?.toString() || "0",
        aulasSelecionadas,
        cursosSelecionados,
      });

      setShowForm(true);
    } catch (error) {
      console.error("❌ Erro ao carregar módulo para edição:", error);
      toast.error("Erro ao carregar módulo para edição");
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleSubmitEdit = async () => {
    console.log("🔘 handleSubmitEdit chamado, editingId:", editingId);

    if (!editingId) {
      console.log("➡️ Modo CRIAÇÃO - chamando moduloForm.handleSubmit");
      moduloForm.handleSubmit();
      return;
    }

    console.log("➡️ Modo EDIÇÃO - fazendo PUT");

    try {
      console.log("📤 Enviando PUT para:", `/api/admin/modulos/${editingId}`);

      const response = await fetch(`/api/admin/modulos/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: moduloForm.formData.titulo,
          descricao: moduloForm.formData.descricao,
          ordem: parseInt(moduloForm.formData.ordem) || 0,
          aulasSelecionadas: moduloForm.formData.aulasSelecionadas,
          cursosSelecionados: moduloForm.formData.cursosSelecionados,
        }),
      });

      console.log("📥 Response status:", response.status, response.ok);

      if (!response.ok) {
        throw new Error("Erro ao atualizar módulo");
      }

      const moduloAtualizado = await response.json();
      console.log("✅ Módulo atualizado:", moduloAtualizado);

      setModulos(
        modulos.map((m) => (m.id === editingId ? moduloAtualizado : m))
      );

      console.log("🎉 Chamando toast.success");
      toast.success("Módulo atualizado com sucesso!");

      handleCancelEdit();
    } catch (error) {
      console.error("❌ Erro ao atualizar módulo:", error);
      toast.error("Erro ao atualizar módulo");
    }
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

  const handleCancelEdit = () => {
    setEditingId(null);
    setShowForm(false);
    moduloForm.setFormData({
      titulo: "",
      descricao: "",
      ordem: "",
      aulasSelecionadas: [],
      cursosSelecionados: [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Módulos Cadastrados</h3>
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
            : "Novo Módulo"}
        </Button>
      </div>

      {loadingEdit && (
        <LoadingSpinner message="Carregando dados do módulo..." />
      )}

      {!loadingEdit && (
        <>
          <ModulosList
            modulos={modulosUnicos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {showForm && (
            <ModuloForm
              formData={moduloForm.formData}
              cursos={cursos}
              aulas={aulas}
              isLoading={moduloForm.isLoading}
              onChange={moduloForm.setFormData}
              onSubmit={editingId ? handleSubmitEdit : moduloForm.handleSubmit}
              isEditing={!!editingId}
            />
          )}
        </>
      )}

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
