import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  PlayCircle,
  Heart,
  Crown,
  Sparkles,
  ShoppingCart,
  BookOpen,
  Clock,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CursoComProgresso {
  id: string;
  titulo: string;
  descricao: string;
  thumbnail?: string | null;
  progresso: number;
  duracaoTotal: string;
  quantidadeAulas?: number; // Novo campo da API
  aulasTotal: number;
  aulasAssistidas: number;
  categoria: string;
  nivel: string;
  instrutor: string;
  avaliacao: number;
  status: string;
  adquirido: boolean;
  preco: number;
  precoOriginal?: number | null;
  desconto?: number | null;
  mediaAvaliacoes?: number;
}

interface CourseCardProps {
  curso: CursoComProgresso;
  isFavorito: boolean;
  onToggleFavorito: (cursoId: string) => void;
  onCourseClick: (curso: CursoComProgresso) => void;
}

export function CourseCard({
  curso,
  isFavorito,
  onToggleFavorito,
  onCourseClick,
}: CourseCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Concluído
          </Badge>
        );
      case "em-andamento":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <PlayCircle className="h-3 w-3 mr-1" />
            Em Andamento
          </Badge>
        );
      case "nao-iniciado":
        return <Badge variant="outline">Não Iniciado</Badge>;
      default:
        return null;
    }
  };

  const getSpecialBadges = (curso: CursoComProgresso) => {
    const badges = [];

    // Verificar se é um curso popular (muitas inscrições)
    if (curso.avaliacao >= 4.5) {
      badges.push(
        <Badge
          key="bestseller"
          className="bg-orange-100 text-orange-800 text-xs"
        >
          <Crown className="h-3 w-3 mr-1" />
          Popular
        </Badge>
      );
    }

    // Verificar se é um curso novo (criado recentemente)
    const isNovo =
      new Date().getTime() - new Date().getTime() < 30 * 24 * 60 * 60 * 1000; // 30 dias
    if (isNovo) {
      badges.push(
        <Badge key="novo" className="bg-green-100 text-green-800 text-xs">
          <Sparkles className="h-3 w-3 mr-1" />
          Novo
        </Badge>
      );
    }

    return badges;
  };

  // Usar quantidadeAulas da API se disponível, senão fallback para aulasTotal
  const totalAulas = curso.quantidadeAulas ?? curso.aulasTotal;

  // Garantir que duracaoTotal sempre tenha um valor
  const duracaoFormatada = curso.duracaoTotal || "0min";
  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer relative h-80"
      onClick={() => onCourseClick(curso)}
    >
      {/* Imagem de fundo que preenche todo o card */}
      <div className="absolute inset-0">
        <img
          src={
            curso.thumbnail ||
            "/placeholder.svg?height=200&width=300&text=" +
              encodeURIComponent(curso.titulo)
          }
          alt={curso.titulo}
          className="w-full h-full object-cover"
        />

        {/* Overlay gradient para melhor legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Badges no topo */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
        <div className="flex gap-2 items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorito(curso.id);
            }}
            className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            title={
              isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
            aria-label={
              isFavorito
                ? "Remover curso dos favoritos"
                : "Adicionar curso aos favoritos"
            }
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isFavorito
                  ? "text-red-500 fill-red-500"
                  : "text-white hover:text-red-300"
              )}
            />
          </button>

          <div className="flex flex-col gap-2">
            {!curso.adquirido && (
              <div className="flex flex-col gap-1">
                {getSpecialBadges(curso)}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status badge */}
          <div>
            {curso.adquirido ? (
              getStatusBadge(curso.status)
            ) : (
              <Badge className="bg-green-500 text-white shadow-lg">
                <ShoppingCart className="h-3 w-3 mr-1" />
                Disponível
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
        {/* Título e descrição */}
        <div className="mb-3">
          <h3 className="text-lg font-bold mb-1 line-clamp-2 leading-tight">
            {curso.titulo}
          </h3>
          <p className="text-sm text-gray-200 line-clamp-2 mb-2">
            {curso.descricao}
          </p>

          {/* Avaliação e instrutor - apenas quando disponível */}
          {curso.avaliacao > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {curso.avaliacao}
              </span>
              <span>•</span>
              <span>{curso.instrutor}</span>
            </div>
          )}
        </div>

        {/* Ação */}
        <div className="flex items-center justify-between">
          {!curso.adquirido ? (
            <>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {totalAulas} aulas
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {duracaoFormatada}
                </span>
              </div>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  onCourseClick(curso);
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Adquirir
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {curso.aulasAssistidas}/{totalAulas} aulas
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {duracaoFormatada}
                </span>
              </div>

              {curso.progresso > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${curso.progresso}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-300">
                    {curso.progresso}%
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5" />
    </Card>
  );
}
