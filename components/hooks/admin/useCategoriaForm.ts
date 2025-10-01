// hooks/admin/useCategoriaForm.ts
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function useCategoriaForm(onSuccess?: (categoria: any) => void) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cor: "#3B82F6",
    icone: "BookOpen",
  });

  const handleSubmit = async () => {
    if (!formData.nome) {
      toast({
        title: "Erro",
        description: "Nome da categoria é obrigatório",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/admin/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          nome: "",
          cor: "#3B82F6",
          icone: "BookOpen",
        });
        toast({
          title: "Sucesso",
          description: "Categoria criada com sucesso!",
        });
        onSuccess?.(data.categoria);
      } else {
        const error = await response.json();
        toast({
          title: "Erro",
          description: error.error || "Erro ao criar categoria",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      toast({
        title: "Erro",
        description: "Erro ao criar categoria",
        variant: "destructive",
      });
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
