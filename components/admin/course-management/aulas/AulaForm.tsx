// components/admin/course-management/aulas/AulaForm.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, Upload } from "lucide-react";

interface AulaFormData {
  titulo: string;
  descricao: string;
  videoUrl: string;
  duracao?: string;
  ordem: string;
  moduloIds: string[];
  arquivos?: any[];
}

interface AulaFormProps {
  formData: AulaFormData;
  modulos: Array<{ id: string; titulo: string }>;
  isLoading: boolean;
  onChange: (data: AulaFormData) => void;
  onSubmit: () => void;
  isEditing?: boolean;
}

export function AulaForm({
  formData,
  modulos,
  isLoading,
  onChange,
  onSubmit,
  isEditing = false,
}: AulaFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? "Editar Aula" : "Adicionar Nova Aula"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Título da Aula</Label>
          <Input
            placeholder="Título da Aula"
            value={formData.titulo}
            onChange={(e) => onChange({ ...formData, titulo: e.target.value })}
          />
        </div>

        <div>
          <Label>Descrição da Aula</Label>
          <Textarea
            placeholder="Descrição da Aula"
            value={formData.descricao}
            onChange={(e) =>
              onChange({ ...formData, descricao: e.target.value })
            }
          />
        </div>

        <div>
          <Label>URL da Aula</Label>
          <Input
            placeholder="URL do Vídeo (Bunny.net)"
            value={formData.videoUrl}
            onChange={(e) =>
              onChange({ ...formData, videoUrl: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Duração da Aula</Label>
          <Input
            placeholder="Ex: 10:30"
            value={formData.duracao || ""}
            onChange={(e) => onChange({ ...formData, duracao: e.target.value })}
          />
        </div>

        <div>
          <Label>Ordem da Aula</Label>
          <Input
            type="number"
            placeholder="Ordem da Aula (ex: 1, 2, 3...)"
            value={formData.ordem}
            onChange={(e) => onChange({ ...formData, ordem: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <p className="font-medium text-sm">Vincular Módulos</p>
          <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
            {modulos.length === 0 ? (
              <p className="text-sm text-muted-foreground p-2">
                Nenhum módulo disponível. Crie um módulo primeiro.
              </p>
            ) : (
              modulos.map((modulo) => {
                console.log(
                  "Módulo:",
                  modulo.id,
                  "Checked?",
                  formData.moduloIds?.includes(modulo.id),
                  "moduloIds:",
                  formData.moduloIds
                );
                return (
                  <label
                    key={modulo.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={modulo.id}
                      checked={
                        Array.isArray(formData.moduloIds) &&
                        formData.moduloIds.includes(modulo.id)
                      }
                      onChange={(e) => {
                        const currentModulos = Array.isArray(formData.moduloIds)
                          ? formData.moduloIds
                          : [];
                        const newModulos = e.target.checked
                          ? [...currentModulos, modulo.id]
                          : currentModulos.filter((id) => id !== modulo.id);
                        onChange({
                          ...formData,
                          moduloIds: newModulos,
                        });
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{modulo.titulo}</span>
                  </label>
                );
              })
            )}
          </div>
        </div>

        <div>
          <Label>Arquivos de apoio da Aula</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Arraste e solte arquivos ou clique para enviar
            </p>
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
              {isEditing ? "Atualizar Aula" : "Salvar Aula"}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
