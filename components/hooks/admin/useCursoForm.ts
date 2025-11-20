// hooks/admin/useCursoForm.ts
import { useState } from "react";
import { toast } from "sonner";

interface CursoFormData {
  nomeInterno: string;
  titulo: string;
  descricao: string;
  instrutoresIds: string[];
  categoriaId: string;
  gratuito: boolean;
  preco: string;
  precoOriginal?: string;
  desconto?: string;
  nivel: string;
  modulosSelecionados: string[];
  thumbnail: string | null;
}

export function useCursoForm(onSuccess?: (curso: any) => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CursoFormData>({
    nomeInterno: "",
    titulo: "",
    descricao: "",
    instrutoresIds: [],
    categoriaId: "",
    gratuito: false,
    preco: "",
    precoOriginal: "",
    desconto: "",
    nivel: "iniciante",
    modulosSelecionados: [],
    thumbnail: null,
  });

  const handleSubmit = async (overrideData?: Partial<CursoFormData>) => {
    console.log("🚀 useCursoForm.handleSubmit chamado");

    // Merge formData com overrideData se fornecido
    const dataToSubmit = { ...formData, ...overrideData };

    if (
      !dataToSubmit.nomeInterno ||
      !dataToSubmit.titulo ||
      !dataToSubmit.descricao ||
      !dataToSubmit.categoriaId ||
      dataToSubmit.instrutoresIds.length === 0
    ) {
      toast.error(
        "Nome interno, título, descrição, categoria e pelo menos um instrutor são obrigatórios"
      );
      return;
    }

    // Validar preço se curso for pago
    if (!dataToSubmit.gratuito && (!dataToSubmit.preco || parseFloat(dataToSubmit.preco) <= 0)) {
      toast.error("Cursos pagos devem ter um preço maior que zero");
      return;
    }

    try {
      setIsLoading(true);
      console.log("📤 Enviando requisição para criar curso...");

      const response = await fetch("/api/admin/cursos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      console.log("📥 Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Curso criado:", data.curso);

        setFormData({
          nomeInterno: "",
          titulo: "",
          descricao: "",
          instrutoresIds: [],
          categoriaId: "",
          gratuito: false,
          preco: "",
          precoOriginal: "",
          desconto: "",
          nivel: "iniciante",
          modulosSelecionados: [],
          thumbnail: null,
        });

        console.log("🎉 Chamando onSuccess callback...");
        onSuccess?.(data.curso);

        toast.success("Curso criado com sucesso!");
      } else {
        const error = await response.json();
        console.error("❌ Erro na resposta:", error);
        toast.error(error.error || "Erro ao criar curso");
      }
    } catch (error) {
      console.error("❌ Erro ao criar curso:", error);
      toast.error("Erro ao criar curso");
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
