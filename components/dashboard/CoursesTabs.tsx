import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";
import { CourseCard } from "./CourseCard";

interface CursoComProgresso {
  id: string;
  titulo: string;
  descricao: string;
  thumbnail?: string | null;
  progresso: number;
  duracaoTotal: string;
  aulasTotal: number;
  aulasAssistidas: number;
  categoria: string;
  nivel: string;
  instrutor: string;
  avaliacao: number;
  status: string;
  adquirido: boolean;
  preco: number;
  precoOriginal?: number | null;
  desconto?: number | null;
  mediaAvaliacoes?: number;
}

interface CoursesTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  cursosFiltrados: CursoComProgresso[];
  cursosFavoritos: string[];
  onToggleFavorito: (cursoId: string) => void;
  onCourseClick: (curso: CursoComProgresso) => void;
}

export function CoursesTabs({
  activeTab,
  onTabChange,
  cursosFiltrados,
  cursosFavoritos,
  onToggleFavorito,
  onCourseClick,
}: CoursesTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="flex-1 flex flex-col"
    >
      <TabsList className="grid w-full grid-cols-5 flex-shrink-0">
        <TabsTrigger value="todos">
          Todos ({cursosFiltrados.length})
        </TabsTrigger>
        <TabsTrigger value="meus-cursos">
          Meus Cursos ({cursosFiltrados.filter((c) => c.adquirido).length})
        </TabsTrigger>
        <TabsTrigger value="em-andamento">
          Em Andamento (
          {cursosFiltrados.filter((c) => c.status === "em-andamento").length})
        </TabsTrigger>
        <TabsTrigger value="concluidos">
          Concluídos (
          {cursosFiltrados.filter((c) => c.status === "concluido").length})
        </TabsTrigger>
        <TabsTrigger value="disponivel">
          Disponíveis (
          {cursosFiltrados.filter((c) => c.status === "disponivel").length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="flex-1 mt-4">
        {/* Lista de Cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {cursosFiltrados.map((curso) => (
            <CourseCard
              key={curso.id}
              curso={curso}
              isFavorito={cursosFavoritos.includes(curso.id)}
              onToggleFavorito={onToggleFavorito}
              onCourseClick={onCourseClick}
            />
          ))}
        </div>

        {cursosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum curso encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou termo de busca
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
