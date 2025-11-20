// hooks/admin/useCategoriaForm.ts
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function useCategoriaForm(
  onSuccess?: (categoria: any) => void,
  onBeforeSubmit?: () => Promise<string | null>
) {
  const { toast } = useToast();
  const ICON_OPTIONS = [
    "BookOpen",
    "GraduationCap",
    "Code",
    "BarChart3",
    "Lightbulb",
    "Shapes",
    "Puzzle",
    "Globe",
    "Cpu",
    "Palette",
    "Sparkles",
    "Layers",
  ];
  const getRandomIcon = () =>
    ICON_OPTIONS[Math.floor(Math.random() * ICON_OPTIONS.length)];

  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    cor: "#3B82F6",
    icone: getRandomIcon(),
    customSvgUrl: null as string | null,
  });

  const randomizeIcon = () => {
    setFormData((prev) => ({
      ...prev,
      icone: getRandomIcon(),
    }));
  };

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

      // Se houver um callback de pré-envio (ex: upload de SVG), executar primeiro
      let updatedFormData = { ...formData };
      if (onBeforeSubmit) {
        const svgUrl = await onBeforeSubmit();
        if (svgUrl) {
          updatedFormData.customSvgUrl = svgUrl;
          setFormData(updatedFormData);
        }
      }

      const url = editingId
        ? `/api/admin/categorias/${editingId}`
        : "/api/admin/categorias";
      const method = editingId ? "PUT" : "POST";

      console.log("🚀 Enviando para API:", { url, method, formData: updatedFormData });

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          nome: "",
          cor: "#3B82F6",
          icone: getRandomIcon(),
          customSvgUrl: null,
        });
        setEditingId(null);
        toast({
          title: "Sucesso",
          description: editingId
            ? "Categoria atualizada com sucesso!"
            : "Categoria criada com sucesso!",
        });
        onSuccess?.(data.categoria || data);
      } else {
        const error = await response.json();
        toast({
          title: "Erro",
          description:
            error.error ||
            (editingId ? "Erro ao atualizar categoria" : "Erro ao criar categoria"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      toast({
        title: "Erro",
        description: editingId
          ? "Erro ao atualizar categoria"
          : "Erro ao criar categoria",
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
    editingId,
    setEditingId,
    handleSubmit,
    randomizeIcon,
  };
}
