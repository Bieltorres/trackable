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
  quantidadeAulas?: number; // Novo campo da API
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

function mapCursoResponseToCursoComProgresso(curso: any): CursoComProgresso {
  const usuarioCurso = curso.usuarioCursos?.[0];
  const instrutor = curso.instrutores?.[0]?.instrutor;

  // IMPORTANTE: Usar quantidadeAulas que vem da API (já calculada)
  const quantidadeAulas = curso.quantidadeAulas ?? 0;

  // IMPORTANTE: Usar duracaoTotal que vem da API (já calculada e formatada)
  const duracaoTotal = curso.duracaoTotal || "0min";

  // DEBUG: Descomente para ver os valores
  console.log("Mapeando curso:", curso.titulo);
  console.log("  - quantidadeAulas da API:", curso.quantidadeAulas);
  console.log("  - duracaoTotal da API:", curso.duracaoTotal);

  return {
    id: curso.id,
    titulo: curso.titulo,
    descricao: curso.descricao,
    thumbnail: curso.thumbnail,
    progresso: usuarioCurso?.progresso ?? 0,
    duracaoTotal: duracaoTotal, // Usar valor da API
    quantidadeAulas: quantidadeAulas, // Usar valor da API
    aulasTotal: quantidadeAulas, // Manter compatibilidade
    aulasAssistidas: 0, // você pode calcular depois com base nas aulas concluídas
    categoria: curso.categoria?.nome ?? "",
    nivel: curso.nivel,
    instrutor: instrutor?.nome ?? "Sem instrutor",
    avaliacao: curso.mediaAvaliacoes ?? 0,
    status: usuarioCurso?.status ?? "nao-iniciado",
    adquirido: !!usuarioCurso,
    preco: Number(curso.preco),
    precoOriginal: curso.precoOriginal ? Number(curso.precoOriginal) : null,
    desconto: curso.desconto ? Number(curso.desconto) : null,
    mediaAvaliacoes: curso.mediaAvaliacoes,
  };
}

export function CoursesTabs({
  activeTab,
  onTabChange,
  cursosFiltrados,
  cursosFavoritos,
  onToggleFavorito,
  onCourseClick,
}: CoursesTabsProps) {
  console.log("cursos filtrados", cursosFiltrados);
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

// Exportar a função de mapeamento para uso em outros componentes
export { mapCursoResponseToCursoComProgresso };
