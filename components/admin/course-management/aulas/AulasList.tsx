// components/admin/course-management/aulas/AulasList.tsx
import { AulaCard } from "./AulaCard";

interface AulasListProps {
  aulas: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export function AulasList({ aulas, onEdit, onDelete, onView }: AulasListProps) {
  if (aulas.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">Nenhuma aula cadastrada ainda.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {aulas.map((aula) => (
        <AulaCard
          key={aula.id}
          aula={aula}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
}
