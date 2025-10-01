import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Entity {
  id: string;
  titulo?: string;
  nome?: string;
}

interface EntitySelectorProps {
  entities: Entity[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  label: string;
  emptyMessage?: string;
}

export function EntitySelector({
  entities,
  selectedIds,
  onChange,
  label,
  emptyMessage = "Nenhum item disponível",
}: EntitySelectorProps) {
  const handleToggle = (id: string, checked: boolean) => {
    const newIds = checked
      ? [...selectedIds, id]
      : selectedIds.filter((selectedId) => selectedId !== id);
    onChange(newIds);
  };

  return (
    <div className="space-y-2">
      <Label className="font-medium text-sm">{label}</Label>
      {entities.length === 0 ? (
        <p className="text-sm text-muted-foreground p-2">{emptyMessage}</p>
      ) : (
        <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
          {entities.map((entity) => (
            <div key={entity.id} className="flex items-center gap-2">
              <Checkbox
                id={`entity-${entity.id}`}
                checked={selectedIds.includes(entity.id)}
                onCheckedChange={(checked) =>
                  handleToggle(entity.id, checked as boolean)
                }
              />
              <label
                htmlFor={`entity-${entity.id}`}
                className="text-sm cursor-pointer"
              >
                {entity.titulo || entity.nome}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}