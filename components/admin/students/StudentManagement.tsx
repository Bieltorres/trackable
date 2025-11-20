"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Search,
  RefreshCcw,
  BookOpen,
  GraduationCap,
  BarChart3,
  Loader2,
  MoreVertical,
  Mail,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ManageCoursesDialog } from "./ManageCoursesDialog";

type CursoResumo = {
  id: string;
  titulo: string;
  status: string;
  progresso: number;
  aulasAssistidas: number;
  totalAulas: number;
  dataInicio: string | null;
  dataCompra: string | null;
  suspenso?: boolean;
  reembolsado?: boolean;
};

type AlunoResumo = {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  criadoEm: string;
  atualizadoEm: string;
  totalCursos: number;
  totalConcluidos: number;
  progressoMedio: number;
  info: {
    genero: string | null;
    avatar: string | null;
    cidade: string | null;
    estado: string | null;
    pais: string | null;
  } | null;
  cursos: CursoResumo[];
};

const formatDate = (value: string) => {
  try {
    return new Date(value).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return value;
  }
};

const getInitials = (name: string) => {
  if (!name) return "AL";
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
};

const statusLabels: Record<string, string> = {
  "nao-iniciado": "Nao iniciado",
  "em-andamento": "Em andamento",
  concluido: "Concluido",
};

export function StudentManagement() {
  const { toast } = useToast();
  const [alunos, setAlunos] = useState<AlunoResumo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cursoFiltro, setCursoFiltro] = useState<string>("todos");
  const [sendingEmailTo, setSendingEmailTo] = useState<string | null>(null);
  const [managingCoursesAluno, setManagingCoursesAluno] = useState<AlunoResumo | null>(null);

  const carregarAlunos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/alunos");

      if (!response.ok) {
        throw new Error("Nao foi possivel carregar os alunos");
      }

      const data = await response.json();
      setAlunos(data.alunos ?? []);
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
      toast({
        title: "Erro ao carregar alunos",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  const enviarEmailRedefinicao = async (alunoId: string, alunoNome: string) => {
    try {
      setSendingEmailTo(alunoId);
      const response = await fetch(`/api/admin/usuarios/${alunoId}/send-reset-email`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar email");
      }

      toast({
        title: "Email enviado",
        description: `Link de redefinição enviado para ${alunoNome} com sucesso!`,
      });
    } catch (error) {
      console.error("Erro ao enviar email de redefinição:", error);
      toast({
        title: "Erro ao enviar email",
        description: "Não foi possível enviar o email. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSendingEmailTo(null);
    }
  };

  const cursosDisponiveis = useMemo(() => {
    const mapa = new Map<string, string>();

    alunos.forEach((aluno) => {
      aluno.cursos.forEach((curso) => {
        if (curso.id) {
          mapa.set(curso.id, curso.titulo);
        }
      });
    });

    return Array.from(mapa.entries()).map(([id, titulo]) => ({
      id,
      titulo,
    }));
  }, [alunos]);

  const filteredAlunos = useMemo(() => {
    const termo = searchTerm.trim().toLowerCase();

    return alunos.filter((aluno) => {
      const matchesSearch =
        termo.length === 0 ||
        aluno.nome.toLowerCase().includes(termo) ||
        aluno.email.toLowerCase().includes(termo);

      const matchesCourse =
        cursoFiltro === "todos" ||
        aluno.cursos.some((curso) => curso.id === cursoFiltro);

      return matchesSearch && matchesCourse;
    });
  }, [alunos, searchTerm, cursoFiltro]);

  const estatisticas = useMemo(() => {
    const totalAlunos = alunos.length;
    const totalMatriculas = alunos.reduce(
      (acc, aluno) => acc + aluno.totalCursos,
      0
    );
    const totalConcluidos = alunos.reduce(
      (acc, aluno) => acc + aluno.totalConcluidos,
      0
    );
    const progressoMedioGeral =
      totalAlunos > 0
        ? Math.round(
            alunos.reduce((acc, aluno) => acc + aluno.progressoMedio, 0) /
              totalAlunos
          )
        : 0;

    return {
      totalAlunos,
      totalMatriculas,
      totalConcluidos,
      progressoMedioGeral,
    };
  }, [alunos]);

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
            <Users className="h-5 w-5" />
            Gerenciamento de Alunos
          </CardTitle>
          <Button onClick={carregarAlunos} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Atualizando...
              </>
            ) : (
              <>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Atualizar lista
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Consulte os alunos cadastrados na plataforma e acompanhe o andamento
          das matriculas.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Total de alunos</span>
              <Users className="h-4 w-4" />
            </div>
            <p className="mt-2 text-2xl font-semibold">
              {estatisticas.totalAlunos}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Matriculas ativas</span>
              <BookOpen className="h-4 w-4" />
            </div>
            <p className="mt-2 text-2xl font-semibold">
              {estatisticas.totalMatriculas}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Cursos concluidos</span>
              <GraduationCap className="h-4 w-4" />
            </div>
            <p className="mt-2 text-2xl font-semibold">
              {estatisticas.totalConcluidos}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Progresso medio</span>
              <BarChart3 className="h-4 w-4" />
            </div>
            <p className="mt-2 text-2xl font-semibold">
              {estatisticas.progressoMedioGeral}%
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Buscar por nome ou email"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <Select value={cursoFiltro} onValueChange={setCursoFiltro}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Filtrar por curso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os cursos</SelectItem>
              {cursosDisponiveis.map((curso) => (
                <SelectItem key={curso.id} value={curso.id}>
                  {curso.titulo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center rounded-lg border py-10 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Carregando alunos...
          </div>
        ) : filteredAlunos.length === 0 ? (
          <div className="rounded-lg border border-dashed py-16 text-center">
            <p className="text-muted-foreground">
              Nenhum aluno encontrado com os filtros selecionados.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAlunos.map((aluno) => (
              <div
                key={aluno.id}
                className="rounded-lg border bg-card p-5 shadow-sm transition hover:border-primary"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      {aluno.info?.avatar ? (
                        <AvatarImage src={aluno.info.avatar} alt={aluno.nome} />
                      ) : null}
                      <AvatarFallback>{getInitials(aluno.nome)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-semibold">{aluno.nome}</p>
                      <p className="text-sm text-muted-foreground">
                        {aluno.email}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>
                          Cadastrado em {formatDate(aluno.criadoEm)}
                        </span>
                        {aluno.telefone ? (
                          <span>• Telefone: {aluno.telefone}</span>
                        ) : null}
                        {aluno.info?.cidade ? (
                          <span>
                            • {aluno.info.cidade}
                            {aluno.info?.estado ? `/${aluno.info.estado}` : ""}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                    <div className="flex flex-col items-start gap-2 md:items-end">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        {aluno.totalCursos} matriculas
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        {aluno.totalConcluidos} cursos concluidos
                      </div>
                      <Badge variant="secondary">
                        Progresso medio: {aluno.progressoMedio}%
                      </Badge>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        disabled={sendingEmailTo === aluno.id}
                      >
                        {sendingEmailTo === aluno.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MoreVertical className="h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setManagingCoursesAluno(aluno)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Gerenciar cursos
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => enviarEmailRedefinicao(aluno.id, aluno.nome)}
                        disabled={sendingEmailTo === aluno.id}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Enviar link de redefinição
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {aluno.cursos.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm font-medium">Cursos matriculados</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {aluno.cursos.map((curso) => {
                        const progresso = Math.max(
                          0,
                          Math.min(100, curso.progresso)
                        );
                        const totalAulas = Math.max(0, curso.totalAulas);
                        const aulasAssistidas = Math.max(
                          0,
                          curso.aulasAssistidas
                        );
                        const statusTexto =
                          statusLabels[curso.status] ?? curso.status;
                        const aulasInfo =
                          totalAulas > 0
                            ? `${aulasAssistidas}/${totalAulas} aulas assistidas`
                            : `${aulasAssistidas} aulas registradas`;
                        const isSuspenso = curso.suspenso ?? false;
                        const isReembolsado = curso.reembolsado ?? false;

                        return (
                          <div
                            key={curso.id}
                            className={`rounded-md border p-4 ${
                              isReembolsado
                                ? "border-red-300 bg-red-50/50 dark:bg-red-950/10"
                                : isSuspenso
                                ? "border-orange-300 bg-orange-50/50 dark:bg-orange-950/10"
                                : "bg-muted/20"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-medium">
                                  {curso.titulo}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {aulasInfo}
                                </p>
                              </div>
                              <div className="flex flex-col gap-1 items-end">
                                {isReembolsado && (
                                  <Badge
                                    variant="outline"
                                    className="border-red-500 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                                  >
                                    Reembolsado
                                  </Badge>
                                )}
                                {isSuspenso && (
                                  <Badge
                                    variant="outline"
                                    className="border-orange-500 bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400"
                                  >
                                    Suspenso
                                  </Badge>
                                )}
                                <Badge
                                  variant={
                                    curso.status === "concluido"
                                      ? "default"
                                      : "outline"
                                  }
                                >
                                  {statusTexto}
                                </Badge>
                              </div>
                            </div>
                            <Progress value={progresso} className="mt-3" />
                            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                              <span>{progresso}%</span>
                              {totalAulas > 0 ? (
                                <span>
                                  {aulasAssistidas} de {totalAulas} aulas
                                </span>
                              ) : (
                                <span>{aulasAssistidas} aulas registradas</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Este aluno ainda nao possui matriculas registradas.
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <ManageCoursesDialog
        open={managingCoursesAluno !== null}
        onOpenChange={(open) => !open && setManagingCoursesAluno(null)}
        aluno={managingCoursesAluno}
        onSuccess={carregarAlunos}
      />
    </Card>
  );
}
