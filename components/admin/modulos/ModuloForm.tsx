// components/admin/course-management/modulos/ModuloForm.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Save } from "lucide-react";

interface ModuloFormData {
  titulo: string;
  descricao: string;
  ordem: string;
  aulasSelecionadas: string[];
  cursosSelecionados: string[];
}

interface ModuloFormProps {
  formData: ModuloFormData;
  cursos: Array<{ id: string; titulo: string }>;
  aulas: Array<{ id: string; titulo: string }>;
  isLoading: boolean;
  onChange: (data: ModuloFormData) => void;
  onSubmit: () => void;
  isEditing?: boolean;
}

export function ModuloForm({
  formData,
  cursos,
  aulas,
  isLoading,
  onChange,
  onSubmit,
  isEditing = false,
}: ModuloFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? "Editar Módulo" : "Adicionar Novo Módulo"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Título do Módulo</Label>
          <Input
            placeholder="Título do Módulo"
            value={formData.titulo}
            onChange={(e) => onChange({ ...formData, titulo: e.target.value })}
          />
        </div>

        <div>
          <Label>Ordem do Módulo</Label>
          <Input
            type="number"
            placeholder="Ordem do Módulo"
            value={formData.ordem}
            onChange={(e) => onChange({ ...formData, ordem: e.target.value })}
          />
        </div>

        <div>
          <Label>Descrição do Módulo</Label>
          <Textarea
            placeholder="Descrição do Módulo"
            value={formData.descricao}
            onChange={(e) =>
              onChange({ ...formData, descricao: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <p className="font-medium text-sm">Vincular Cursos</p>
          <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
            {cursos.length === 0 ? (
              <p className="text-sm text-muted-foreground p-2">
                Nenhum curso disponível. Crie um curso primeiro.
              </p>
            ) : (
              cursos.map((curso) => (
                <label
                  key={curso.id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={curso.id}
                    checked={
                      Array.isArray(formData.cursosSelecionados) &&
                      formData.cursosSelecionados.includes(curso.id)
                    }
                    onChange={(e) => {
                      const currentCursos = Array.isArray(
                        formData.cursosSelecionados
                      )
                        ? formData.cursosSelecionados
                        : [];
                      const newCursos = e.target.checked
                        ? [...currentCursos, curso.id]
                        : currentCursos.filter((id) => id !== curso.id);
                      onChange({
                        ...formData,
                        cursosSelecionados: newCursos,
                      });
                    }}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">{curso.titulo}</span>
                </label>
              ))
            )}
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-sm">Vincular Aulas</p>
          <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
            {aulas.length === 0 ? (
              <p className="text-sm text-muted-foreground p-2">
                Nenhuma aula disponível. Crie uma aula primeiro.
              </p>
            ) : (
              aulas.map((aula) => (
                <label
                  key={aula.id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={aula.id}
                    checked={
                      Array.isArray(formData.aulasSelecionadas) &&
                      formData.aulasSelecionadas.includes(aula.id)
                    }
                    onChange={(e) => {
                      const currentAulas = Array.isArray(
                        formData.aulasSelecionadas
                      )
                        ? formData.aulasSelecionadas
                        : [];
                      const newAulas = e.target.checked
                        ? [...currentAulas, aula.id]
                        : currentAulas.filter((id) => id !== aula.id);
                      onChange({
                        ...formData,
                        aulasSelecionadas: newAulas,
                      });
                    }}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">{aula.titulo}</span>
                </label>
              ))
            )}
          </div>
        </div>

        <Button onClick={onSubmit} disabled={isLoading} className="w-full">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Salvando...
            </div>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? "Atualizar Módulo" : "Salvar Módulo"}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
