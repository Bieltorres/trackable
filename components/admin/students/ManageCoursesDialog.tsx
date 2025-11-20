"use client";

import { useState } from "react";
import { Loader2, Ban, CheckCircle2, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

type CursoResumo = {
  id: string;
  titulo: string;
  status: string;
  progresso: number;
  aulasAssistidas: number;
  totalAulas: number;
  suspenso?: boolean;
  reembolsado?: boolean;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  aluno: {
    id: string;
    nome: string;
    cursos: CursoResumo[];
  } | null;
  onSuccess: () => void;
};

const statusLabels: Record<string, string> = {
  "nao-iniciado": "Não iniciado",
  "em-andamento": "Em andamento",
  concluido: "Concluído",
};

export function ManageCoursesDialog({
  open,
  onOpenChange,
  aluno,
  onSuccess,
}: Props) {
  const { toast } = useToast();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleCourse = (cursoId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(cursoId)
        ? prev.filter((id) => id !== cursoId)
        : [...prev, cursoId]
    );
  };

  const handleSelectAll = () => {
    if (!aluno) return;
    if (selectedCourses.length === aluno.cursos.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(aluno.cursos.map((c) => c.id));
    }
  };

  const handleToggleSuspensao = async (suspender: boolean) => {
    if (!aluno || selectedCourses.length === 0) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/usuarios/${aluno.id}/cursos`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cursoIds: selectedCourses,
          suspenso: suspender,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar cursos");
      }

      const data = await response.json();
      const acao = suspender ? "suspensa(s)" : "reativada(s)";

      toast({
        title: suspender ? "Cursos suspensos" : "Cursos reativados",
        description: `${data.updatedCount} matrícula(s) ${acao} de ${aluno.nome}`,
      });

      setSelectedCourses([]);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao atualizar cursos:", error);
      toast({
        title: "Erro ao atualizar cursos",
        description: "Não foi possível atualizar os cursos. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleReembolso = async (reembolsar: boolean) => {
    if (!aluno || selectedCourses.length === 0) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/usuarios/${aluno.id}/cursos`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cursoIds: selectedCourses,
          reembolsado: reembolsar,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar cursos");
      }

      const data = await response.json();
      const acao = reembolsar ? "marcada(s) como reembolsada(s)" : "desmarcada(s) como reembolsada(s)";

      toast({
        title: reembolsar ? "Cursos reembolsados" : "Reembolso removido",
        description: `${data.updatedCount} matrícula(s) ${acao} de ${aluno.nome}`,
      });

      setSelectedCourses([]);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao atualizar cursos:", error);
      toast({
        title: "Erro ao atualizar cursos",
        description: "Não foi possível atualizar os cursos. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setSelectedCourses([]);
      onOpenChange(false);
    }
  };

  if (!aluno) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gerenciar cursos de {aluno.nome}</DialogTitle>
          <DialogDescription>
            Selecione os cursos para suspender, reativar ou marcar como reembolsado.
            Cursos suspensos ou reembolsados mantêm o histórico mas bloqueiam o acesso.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {aluno.cursos.length === 0 ? (
            <div className="rounded-lg border border-dashed py-8 text-center">
              <p className="text-sm text-muted-foreground">
                Este aluno não possui cursos matriculados.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="select-all"
                    checked={selectedCourses.length === aluno.cursos.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <label
                    htmlFor="select-all"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Selecionar todos ({aluno.cursos.length})
                  </label>
                </div>
                {selectedCourses.length > 0 && (
                  <Badge variant="secondary">
                    {selectedCourses.length} selecionado(s)
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                {aluno.cursos.map((curso) => {
                  const isSelected = selectedCourses.includes(curso.id);
                  const statusTexto = statusLabels[curso.status] ?? curso.status;
                  const isSuspenso = curso.suspenso ?? false;
                  const isReembolsado = curso.reembolsado ?? false;

                  return (
                    <div
                      key={curso.id}
                      className={`rounded-lg border p-4 transition ${
                        isSelected
                          ? isReembolsado
                            ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                            : isSuspenso
                            ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                            : "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                          : isReembolsado
                          ? "border-red-300 bg-red-50/50 dark:bg-red-950/10"
                          : isSuspenso
                          ? "border-orange-300 bg-orange-50/50 dark:bg-orange-950/10"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`curso-${curso.id}`}
                          checked={isSelected}
                          onCheckedChange={() => handleToggleCourse(curso.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-2">
                          <label
                            htmlFor={`curso-${curso.id}`}
                            className="block cursor-pointer"
                          >
                            <p className="font-medium">{curso.titulo}</p>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              {isReembolsado && (
                                <>
                                  <Badge
                                    variant="outline"
                                    className="border-red-500 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                                  >
                                    Reembolsado
                                  </Badge>
                                  <span>•</span>
                                </>
                              )}
                              {isSuspenso && (
                                <>
                                  <Badge
                                    variant="outline"
                                    className="border-orange-500 bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400"
                                  >
                                    Suspenso
                                  </Badge>
                                  <span>•</span>
                                </>
                              )}
                              <Badge
                                variant={
                                  curso.status === "concluido"
                                    ? "default"
                                    : "outline"
                                }
                                className="text-xs"
                              >
                                {statusTexto}
                              </Badge>
                              <span>•</span>
                              <span>{curso.progresso}% concluído</span>
                              <span>•</span>
                              <span>
                                {curso.aulasAssistidas}/{curso.totalAulas} aulas
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
            <Button
              variant="default"
              onClick={() => handleToggleSuspensao(false)}
              disabled={selectedCourses.length === 0 || isLoading}
              className="bg-green-600 hover:bg-green-700 text-sm"
              size="sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Reativar{selectedCourses.length > 0 ? ` (${selectedCourses.length})` : ""}
                </>
              )}
            </Button>
            <Button
              variant="default"
              onClick={() => handleToggleSuspensao(true)}
              disabled={selectedCourses.length === 0 || isLoading}
              className="bg-orange-600 hover:bg-orange-700 text-sm"
              size="sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Ban className="mr-1 h-3 w-3" />
                  Suspender{selectedCourses.length > 0 ? ` (${selectedCourses.length})` : ""}
                </>
              )}
            </Button>
            <Button
              variant="default"
              onClick={() => handleToggleReembolso(true)}
              disabled={selectedCourses.length === 0 || isLoading}
              className="bg-red-600 hover:bg-red-700 text-sm"
              size="sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <DollarSign className="mr-1 h-3 w-3" />
                  Reembolsar{selectedCourses.length > 0 ? ` (${selectedCourses.length})` : ""}
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
