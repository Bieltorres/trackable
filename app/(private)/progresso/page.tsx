"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchMeusCursos } from "@/store/slices/userSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function ProgressPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { meusCursos, loading } = useSelector((state: RootState) => state.user);

  // dispara busca dos cursos ao montar
  useEffect(() => {
    dispatch(fetchMeusCursos());
  }, [dispatch]);

  if (loading) {
    return <p className="p-6">Carregando...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Meu Progresso</h2>

      {meusCursos.length === 0 ? (
        <p className="text-muted-foreground">
          Você ainda não iniciou nenhum curso.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meusCursos.map((uc) => (
            <Card
              key={uc.id}
              className="shadow-md hover:shadow-lg transition-all pt-5"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{uc.curso.titulo}</h3>
                  <Badge
                    variant={
                      uc.status === "concluido"
                        ? "default"
                        : uc.status === "em-andamento"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {uc.status}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {uc.curso.categoria?.nome || "Sem categoria"}
                </p>

                <Progress value={uc.progresso ?? 0} />
                <p className="text-xs text-muted-foreground mt-2">
                  {uc.progresso ?? 0}% concluído
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
