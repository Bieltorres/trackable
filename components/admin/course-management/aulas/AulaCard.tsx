// components/admin/course-management/aulas/AulaCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Eye, Edit3, Trash2 } from "lucide-react";

interface AulaCardProps {
  aula: any;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export function AulaCard({ aula, onEdit, onDelete, onView }: AulaCardProps) {
  const getFileIcon = (tipo: string) => {
    switch (tipo) {
      case "pdf":
        return "📄";
      case "excel":
        return "📊";
      case "word":
        return "📝";
      default:
        return "📁";
    }
  };

  return (
    <Card>
      <CardContent className="flex items-start gap-4">
        <div className="w-24 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
          <Play className="h-8 w-8 text-gray-400" />
        </div>

        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-semibold text-lg truncate">{aula.titulo}</h4>
            {aula.duracao && (
              <Badge variant="secondary" className="flex-shrink-0">
                {aula.duracao}
              </Badge>
            )}
          </div>
          {aula.descricao && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {aula.descricao}
            </p>
          )}
          {aula.arquivos && aula.arquivos.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {aula.arquivos.map((arq: any) => (
                <Badge
                  key={arq.id}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {getFileIcon(arq.tipo)} {arq.nome}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-shrink-0">
          {onView && (
            <Button variant="outline" size="sm" onClick={() => onView(aula.id)}>
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {onEdit && (
            <Button variant="outline" size="sm" onClick={() => onEdit(aula.id)}>
              <Edit3 className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(aula.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
