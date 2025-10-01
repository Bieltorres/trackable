// components/admin/course-management/modulos/ModulosList.tsx
import { ModuloCard } from "./ModuloCard";

interface ModulosListProps {
  modulos: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ModulosList({ modulos, onEdit, onDelete }: ModulosListProps) {
  if (modulos.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">Nenhum módulo cadastrado ainda.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {modulos.map((modulo) => (
        <ModuloCard
          key={modulo.id}
          modulo={modulo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
