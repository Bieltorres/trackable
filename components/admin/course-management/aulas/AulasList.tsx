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
      {aulas.map((aula, index) => {
        const key =
          aula.id ??
          aula.tempKey ?? // use uma key temporária que você cria ao adicionar no estado
          `${aula.slug || aula.titulo || "aula"}-${index}`;

        return (
          <AulaCard
            key={String(key)}
            aula={aula}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        );
      })}
    </div>
  );
}
