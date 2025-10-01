// hooks/admin/useAdminData.ts
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export function useAdminData() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [aulas, setAulas] = useState<any[]>([]);
  const [modulos, setModulos] = useState<any[]>([]);
  const [cursos, setCursos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [instrutores, setInstrutores] = useState<any[]>([]);

  const loadData = async () => {
    try {
      setIsLoading(true);

      const [aulasRes, modulosRes, cursosRes, categoriasRes, instrutoresRes] =
        await Promise.all([
          fetch("/api/admin/aulas"),
          fetch("/api/admin/modulos"),
          fetch("/api/admin/cursos"),
          fetch("/api/admin/categorias"),
          fetch("/api/admin/instrutores"),
        ]);

      if (aulasRes.ok) {
        const data = await aulasRes.json();
        setAulas(data.aulas || []);
      }

      if (modulosRes.ok) {
        const data = await modulosRes.json();
        setModulos(data.modulos || []);
      }

      if (cursosRes.ok) {
        const data = await cursosRes.json();
        setCursos(data.cursos || []);
      }

      if (categoriasRes.ok) {
        const data = await categoriasRes.json();
        setCategorias(data.categorias || []);
      }

      if (instrutoresRes.ok) {
        const data = await instrutoresRes.json();
        setInstrutores(data.instrutores || []);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados da plataforma",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    isLoading,
    aulas,
    modulos,
    cursos,
    categorias,
    instrutores,
    setAulas,
    setModulos,
    setCursos,
    setCategorias,
    setInstrutores,
    loadData,
  };
}
