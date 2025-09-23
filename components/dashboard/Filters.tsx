import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedNivel: string;
  onNivelChange: (value: string) => void;
  categorias: string[];
  niveis: string[];
}

export function Filters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedNivel,
  onNivelChange,
  categorias,
  niveis,
}: FiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-4 flex-shrink-0">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar cursos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex gap-2">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        <select
          value={selectedNivel}
          onChange={(e) => onNivelChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          {niveis.map((nivel) => (
            <option key={nivel} value={nivel}>
              {nivel === 'iniciante' ? 'Iniciante' : 
               nivel === 'intermediario' ? 'Intermediário' :
               nivel === 'avancado' ? 'Avançado' : nivel}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
