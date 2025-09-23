import { Card } from "@/components/ui/card";
import { BookOpen, TrendingUp, Award, ShoppingCart } from "lucide-react";

interface StatsCardsProps {
  cursosAdquiridos: number;
  cursosAtivos: number;
  cursosConcluidos: number;
  cursosDisponiveis: number;
  loading?: boolean;
}

export function StatsCards({
  cursosAdquiridos,
  cursosAtivos,
  cursosConcluidos,
  cursosDisponiveis,
  loading = false,
}: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 flex-shrink-0">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2 w-20"></div>
                <div className="h-8 bg-gray-200 rounded mb-1 w-12"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 flex-shrink-0">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Meus Cursos
            </p>
            <p className="text-2xl font-bold">{cursosAdquiridos}</p>
            <p className="text-xs text-muted-foreground">Cursos adquiridos</p>
          </div>
          <BookOpen className="h-8 w-8 text-muted-foreground" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Em Andamento
            </p>
            <p className="text-2xl font-bold">{cursosAtivos}</p>
            <p className="text-xs text-muted-foreground">Estudando agora</p>
          </div>
          <TrendingUp className="h-8 w-8 text-muted-foreground" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Concluídos
            </p>
            <p className="text-2xl font-bold">{cursosConcluidos}</p>
            <p className="text-xs text-muted-foreground">Finalizados</p>
          </div>
          <Award className="h-8 w-8 text-muted-foreground" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Disponíveis
            </p>
            <p className="text-2xl font-bold">{cursosDisponiveis}</p>
            <p className="text-xs text-muted-foreground">Para adquirir</p>
          </div>
          <ShoppingCart className="h-8 w-8 text-muted-foreground" />
        </div>
      </Card>
    </div>
  );
}
