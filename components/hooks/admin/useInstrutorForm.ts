// hooks/admin/useInstrutorForm.ts
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function useInstrutorForm(onSuccess?: (instrutor: any) => void) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    bio: "",
    avatar: "",
  });

  const handleSubmit = async () => {
    if (!formData.nome) {
      toast({
        title: "Erro",
        description: "Nome do instrutor é obrigatório",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/admin/instrutores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          nome: "",
          bio: "",
          avatar: "",
        });
        toast({
          title: "Sucesso",
          description: "Instrutor criado com sucesso!",
        });
        onSuccess?.(data.instrutor);
      } else {
        const error = await response.json();
        toast({
          title: "Erro",
          description: error.error || "Erro ao criar instrutor",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao criar instrutor:", error);
      toast({
        title: "Erro",
        description: "Erro ao criar instrutor",
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
