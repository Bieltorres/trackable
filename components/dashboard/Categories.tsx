import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoriaPersonalizada {
  nome: string;
  icon: React.ElementType;
  cor: string;
  descricao: string;
  cursos: number;
}

interface CategoriesProps {
  categorias: CategoriaPersonalizada[];
  categoriaSelecionada: string | null;
  onCategoriaSelect: (categoria: string | null) => void;
  loading?: boolean;
}

export function Categories({
  categorias,
  categoriaSelecionada,
  onCategoriaSelect,
  loading = false,
}: CategoriesProps) {
  if (loading) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Categorias</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Categorias</h3>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Categoria
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categorias.map((categoria) => (
          <Card
            key={categoria.nome}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-lg",
              categoriaSelecionada === categoria.nome
                ? "ring-2 ring-blue-500"
                : ""
            )}
            onClick={() =>
              onCategoriaSelect(
                categoriaSelecionada === categoria.nome
                  ? null
                  : categoria.nome
              )
            }
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("p-2 rounded-lg", categoria.cor)}>
                  <categoria.icon className="h-5 w-5 text-white" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">
                {categoria.nome}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {categoria.descricao}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {categoria.cursos} cursos
                </span>
                {categoriaSelecionada === categoria.nome && (
                  <Badge variant="secondary" className="text-xs">
                    Selecionado
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
