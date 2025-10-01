// components/hooks/admin/useAulaForm.ts
import { useState } from "react";

interface AulaFormData {
  titulo: string;
  descricao: string;
  videoUrl: string;
  duracao?: string;
  ordem: string;
  moduloIds: string[];
  arquivos?: any[];
}

export function useAulaForm(onSuccess: (aula: any) => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AulaFormData>({
    titulo: "",
    descricao: "",
    videoUrl: "",
    duracao: "",
    ordem: "1",
    moduloIds: [],
    arquivos: [],
  });

  const handleSubmit = async () => {
    if (!formData.titulo.trim()) {
      alert("Por favor, preencha o título da aula");
      return;
    }

    if (formData.moduloIds.length === 0) {
      alert("Por favor, selecione pelo menos um módulo");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/aulas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: formData.titulo,
          descricao: formData.descricao,
          videoUrl: formData.videoUrl,
          duracao: formData.duracao,
          ordem: parseInt(formData.ordem) || 1,
          moduloIds: formData.moduloIds,
          arquivos: formData.arquivos || [],
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar aula");
      }

      const novaAula = await response.json();

      // Resetar formulário
      setFormData({
        titulo: "",
        descricao: "",
        videoUrl: "",
        duracao: "",
        ordem: "1",
        moduloIds: [],
        arquivos: [],
      });

      onSuccess(novaAula);
    } catch (error) {
      console.error("Erro ao criar aula:", error);
      alert("Erro ao criar aula. Tente novamente.");
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
