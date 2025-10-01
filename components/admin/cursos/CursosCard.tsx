// components/admin/course-management/cursos/CursoCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";
import Image from "next/image";

interface CursoCardProps {
  curso: any;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function CursoCard({ curso, onEdit, onDelete }: CursoCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex items-start gap-4">
        <Image
          src={curso.thumbnail || "/placeholder.svg"}
          alt={curso.titulo}
          width={120}
          height={80}
          className="rounded-md object-cover flex-shrink-0"
        />
        <div className="flex-grow min-w-0">
          <h4 className="font-semibold text-lg truncate">{curso.titulo}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {curso.descricao}
          </p>

          <div className="text-xs text-muted-foreground mt-2">
            <span>Categoria: {curso.categoria}</span> |{" "}
            <span>
              Instrutores:{" "}
              {Array.isArray(curso.instrutores) && curso.instrutores.length > 0
                ? curso.instrutores.join(", ")
                : "Nenhum instrutor"}
            </span>{" "}
            |{" "}
            <span>
              Preço:{" "}
              {curso.preco && Number(curso.preco) > 0
                ? `R$ ${Number(curso.preco).toFixed(2)}`
                : "Gratuito"}
            </span>
          </div>

          <div className="text-xs text-muted-foreground mt-1">
            <span>{curso.totalModulos} módulos</span> |{" "}
            <span>{curso.totalAlunos} alunos</span>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(curso.id)}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(curso.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
