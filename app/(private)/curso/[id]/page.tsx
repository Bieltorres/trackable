"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function CursoRedirectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState("Carregando curso...");

  useEffect(() => {
    if (!id) {
      setStatus("Curso nao encontrado.");
      router.replace("/dashboard/cursos");
      return;
    }

    let cancelled = false;

    const redirectToAula = async () => {
      try {
        setStatus("Buscando sua proxima aula...");
        const response = await fetch(`/api/cursos/${id}/player`, {
          credentials: "include",
        });

        if (!response.ok) {
          if (cancelled) return;
          const description =
            response.status === 403
              ? "Voce nao tem acesso a este curso."
              : "Nao foi possivel carregar os dados do curso.";
          toast({
            title: "Nao foi possivel abrir o curso",
            description,
            variant: "destructive",
          });
          router.replace("/dashboard/cursos");
          return;
        }

        const data = await response.json();
        const aulaId = data?.data?.aulaRedirect?.id;

        if (aulaId) {
          if (cancelled) return;
          router.replace(`/curso/${id}/aula/${aulaId}`);
          return;
        }

        if (cancelled) return;
        toast({
          title: "Curso sem aulas disponiveis",
          description: "Nenhuma aula encontrada para este curso.",
          variant: "destructive",
        });
        router.replace("/dashboard/cursos");
      } catch (error) {
        if (cancelled) return;
        toast({
          title: "Erro ao abrir o curso",
          description: "Tente novamente em instantes.",
          variant: "destructive",
        });
        router.replace("/dashboard/cursos");
      }
    };

    redirectToAula();

    return () => {
      cancelled = true;
    };
  }, [id, router, toast]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        <p className="text-sm text-muted-foreground">{status}</p>
      </div>
    </div>
  );
}
