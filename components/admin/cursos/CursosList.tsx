// components/admin/course-management/cursos/CursosList.tsx
import { CursoCard } from "./CursosCard";

interface CursosListProps {
  cursos: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function CursosList({ cursos, onEdit, onDelete }: CursosListProps) {
  if (cursos.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">Nenhum curso cadastrado ainda.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cursos.map((curso) => (
        <CursoCard
          key={curso.id}
          curso={curso}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
