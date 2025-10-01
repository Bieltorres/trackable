// components/admin/course-management/modulos/ModuloCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, Edit3, Trash2 } from "lucide-react";

interface ModuloCardProps {
  modulo: any;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ModuloCard({ modulo, onEdit, onDelete }: ModuloCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
          <Folder className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="font-semibold text-lg truncate">{modulo.titulo}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {modulo.descricao}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {modulo.aulaModulos?.length || 0} aulas
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(modulo.id)}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(modulo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
