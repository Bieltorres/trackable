// hooks/admin/useModuloForm.ts
import { useState } from "react";
import { toast } from "sonner";

interface ModuloFormData {
  titulo: string;
  descricao: string;
  ordem: string;
  aulasSelecionadas: string[];
  cursosSelecionados: string[];
}

export function useModuloForm(onSuccess?: (modulo: any) => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ModuloFormData>({
    titulo: "",
    descricao: "",
    ordem: "",
    aulasSelecionadas: [],
    cursosSelecionados: [],
  });

  const handleSubmit = async () => {
    console.log(" useModuloForm.handleSubmit chamado");

    if (!formData.titulo || !formData.descricao) {
      toast.error("Título e descrição são obrigatórios");
      return;
    }

    try {
      setIsLoading(true);
      console.log(" Enviando requisição para criar módulo...");

      const response = await fetch("/api/admin/modulos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log(" Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log(" Módulo criado:", data.modulo);

        setFormData({
          titulo: "",
          descricao: "",
          ordem: "",
          aulasSelecionadas: [],
          cursosSelecionados: [],
        });

        console.log("🎉 Chamando onSuccess callback...");
        onSuccess?.(data.modulo);

        toast.success("Módulo criado com sucesso!");
      } else {
        const error = await response.json();
        console.error("❌ Erro na resposta:", error);
        toast.error(error.error || "Erro ao criar módulo");
      }
    } catch (error) {
      console.error("❌ Erro ao criar módulo:", error);
      toast.error("Erro ao criar módulo");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    isLoading,
    handleSubmit,
  };
}
