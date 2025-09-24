"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchMeusCursos } from "@/store/slices/userSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, User, Calendar, Search, TrendingUp, Award, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function ProgressPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { meusCursos, loading } = useSelector((state: RootState) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [sortBy, setSortBy] = useState("recente");

  // dispara busca dos cursos ao montar
  useEffect(() => {
    dispatch(fetchMeusCursos());
  }, [dispatch]);

  // Estatísticas gerais
  const stats = useMemo(() => {
    if (!meusCursos.length) return { total: 0, concluidos: 0, emAndamento: 0, progressoMedio: 0 };

    const total = meusCursos.length;
    const concluidos = meusCursos.filter(uc => uc.status === "concluido").length;
    const emAndamento = meusCursos.filter(uc => uc.status === "em-andamento").length;
    const progressoMedio = meusCursos.reduce((acc, uc) => acc + (uc.progresso || 0), 0) / total;

    return { total, concluidos, emAndamento, progressoMedio };
  }, [meusCursos]);

  // Filtros e ordenação
  const cursosFiltered = useMemo(() => {
    let filtered = meusCursos.filter(uc => {
      const matchesSearch = uc.curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           uc.curso.categoria?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           uc.curso.instrutor?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "todos" || uc.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "progresso":
          return (b.progresso || 0) - (a.progresso || 0);
        case "titulo":
          return a.curso.titulo.localeCompare(b.curso.titulo);
        case "recente":
        default:
          return new Date(b.dataCompra).getTime() - new Date(a.dataCompra).getTime();
      }
    });

    return filtered;
  }, [meusCursos, searchTerm, statusFilter, sortBy]);

  // Função para calcular total de aulas
  const getTotalAulas = (curso: any) => {
    return curso.modulos?.reduce((total: number, modulo: any) => 
      total + (modulo.aulas?.length || 0), 0) || 0;
  };

  // Função para calcular aulas concluídas (estimativa baseada no progresso)
  const getAulasConcluidas = (curso: any, progresso: number) => {
    const totalAulas = getTotalAulas(curso);
    return Math.floor((totalAulas * progresso) / 100);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Meu Progresso</h2>
        {meusCursos.length > 0 && (
          <div className="text-sm text-muted-foreground">
            {stats.total} curso{stats.total !== 1 ? 's' : ''} • {stats.progressoMedio.toFixed(1)}% progresso médio
          </div>
        )}
      </div>

      {meusCursos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum curso encontrado</h3>
            <p className="text-muted-foreground text-center mb-4">
              Você ainda não iniciou nenhum curso. Explore nosso catálogo e comece sua jornada de aprendizado!
            </p>
            <Button asChild>
              <Link href="/cursos">Explorar Cursos</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Estatísticas */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="flex items-center p-6">
                <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total de Cursos</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <Award className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{stats.concluidos}</p>
                  <p className="text-xs text-muted-foreground">Concluídos</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <TrendingUp className="h-8 w-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{stats.emAndamento}</p>
                  <p className="text-xs text-muted-foreground">Em Andamento</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <Clock className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{stats.progressoMedio.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">Progresso Médio</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por curso, categoria ou instrutor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="nao-iniciado">Não Iniciado</SelectItem>
                    <SelectItem value="em-andamento">Em Andamento</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recente">Mais Recente</SelectItem>
                    <SelectItem value="progresso">Maior Progresso</SelectItem>
                    <SelectItem value="titulo">Nome A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Cursos */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cursosFiltered.map((uc) => {
              const totalAulas = getTotalAulas(uc.curso);
              const aulasConcluidas = getAulasConcluidas(uc.curso, uc.progresso || 0);
              
              return (
                <Card key={uc.id} className="shadow-md hover:shadow-lg transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg line-clamp-2">{uc.curso.titulo}</CardTitle>
                      <Badge
                        variant={
                          uc.status === "concluido"
                            ? "default"
                            : uc.status === "em-andamento"
                            ? "secondary"
                            : "outline"
                        }
                        className="ml-2 shrink-0"
                      >
                        {uc.status === "concluido" ? "Concluído" : 
                         uc.status === "em-andamento" ? "Em Andamento" : "Não Iniciado"}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Informações do curso */}
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{uc.curso.instrutor?.name || "Instrutor não informado"}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{uc.curso.categoria?.nome || "Sem categoria"}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Adquirido em {new Date(uc.dataCompra).toLocaleDateString('pt-BR')}</span>
                      </div>
                      
                      {totalAulas > 0 && (
                        <div className="flex items-center gap-2">
                          <PlayCircle className="h-4 w-4" />
                          <span>{aulasConcluidas} de {totalAulas} aulas</span>
                        </div>
                      )}
                    </div>

                    {/* Progresso */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span className="font-medium">{uc.progresso || 0}%</span>
                      </div>
                      <Progress value={uc.progresso || 0} className="h-2" />
                    </div>

                    {/* Ações */}
                    <div className="flex gap-2 pt-2">
                      <Button asChild className="flex-1" size="sm">
                        <Link href={`/cursos/${uc.curso.id}`}>
                          {uc.status === "nao-iniciado" ? "Iniciar Curso" : "Continuar"}
                        </Link>
                      </Button>
                      
                      {uc.status === "concluido" && (
                        <Button variant="outline" size="sm">
                          <Award className="h-4 w-4 mr-1" />
                          Certificado
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {cursosFiltered.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum curso encontrado</h3>
                <p className="text-muted-foreground text-center">
                  Tente ajustar os filtros ou termo de busca para encontrar seus cursos.
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
