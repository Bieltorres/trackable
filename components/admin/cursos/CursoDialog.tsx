// components/admin/course-management/cursos/CursoDialog.tsx
import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings, Save, PlusCircle, Upload, X } from "lucide-react";
import { useCursoForm } from "@/components/hooks/admin/useCursoForm";
import { CategoriaDialog } from "../dialogs/CategoriaDialog";
import { InstrutorDialog } from "../dialogs/InstrutorDialog";
import { toast } from "sonner";

interface CursoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categorias: any[];
  instrutores: any[];
  modulos: any[];
  onCursoCreated: (curso: any) => void;
  onCategoriaCreated: (categoria: any) => void;
  onInstrutorCreated: (instrutor: any) => void;
  editingCurso?: any;
  editingId?: string | null;
}

export function CursoDialog({
  open,
  onOpenChange,
  categorias,
  instrutores,
  modulos,
  onCursoCreated,
  onCategoriaCreated,
  onInstrutorCreated,
  editingCurso,
  editingId,
}: CursoDialogProps) {
  const [categoriaDialogOpen, setCategoriaDialogOpen] = useState(false);
  const [instrutorDialogOpen, setInstrutorDialogOpen] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cursoForm = useCursoForm((newCurso) => {
    onCursoCreated(newCurso);
  });

  // Preencher formulário quando estiver editando
  useEffect(() => {
    if (editingCurso && editingId) {
      console.log("Preenchendo formulário com dados do curso:", editingCurso);

      // Extrair IDs dos instrutores
      const instrutoresIds = editingCurso.instrutores
        ? editingCurso.instrutores.map((ci: any) => ci.instrutorId)
        : [];

      // Extrair IDs dos módulos
      const modulosSelecionados = editingCurso.cursoModulos
        ? editingCurso.cursoModulos.map((cm: any) => cm.moduloId)
        : [];

      cursoForm.setFormData({
        nomeInterno: editingCurso.nomeInterno || "",
        titulo: editingCurso.titulo || "",
        descricao: editingCurso.descricao || "",
        instrutoresIds,
        categoriaId: editingCurso.categoriaId || editingCurso.categoria?.id || "",
        gratuito: editingCurso.gratuito || false,
        preco: editingCurso.preco?.toString() || "",
        precoOriginal: editingCurso.precoOriginal?.toString() || "",
        desconto: editingCurso.desconto?.toString() || "",
        nivel: editingCurso.nivel || "iniciante",
        modulosSelecionados,
        thumbnail: editingCurso.thumbnail || null,
      });

      // Set thumbnail preview if exists
      if (editingCurso.thumbnail) {
        setThumbnailPreview(editingCurso.thumbnail);
      }
    } else {
      // Resetar formulário ao criar novo
      cursoForm.setFormData({
        nomeInterno: "",
        titulo: "",
        descricao: "",
        instrutoresIds: [],
        categoriaId: "",
        gratuito: false,
        preco: "",
        precoOriginal: "",
        desconto: "",
        nivel: "iniciante",
        modulosSelecionados: [],
        thumbnail: null,
      });
      setThumbnailPreview(null);
      setThumbnailFile(null);
    }
  }, [editingCurso, editingId, open]);

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.startsWith("image/")) {
      toast.error("Apenas arquivos de imagem são permitidos");
      return;
    }

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB");
      return;
    }

    setThumbnailFile(file);
    const previewUrl = URL.createObjectURL(file);
    setThumbnailPreview(previewUrl);
  };

  const handleRemoveThumbnail = () => {
    if (thumbnailPreview && thumbnailPreview.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    setThumbnailPreview(null);
    setThumbnailFile(null);
    cursoForm.setFormData({
      ...cursoForm.formData,
      thumbnail: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadThumbnailToS3 = async (file: File): Promise<string | null> => {
    try {
      setUploadingThumbnail(true);
      const formData = new FormData();
      formData.append("thumbnail", file);

      const response = await fetch("/api/upload/thumbnail", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao fazer upload da thumbnail");
      }

      const data = await response.json();
      return data.url;
    } catch (error: any) {
      console.error("Erro ao fazer upload:", error);
      toast.error(error.message || "Erro ao fazer upload da thumbnail");
      return null;
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handleSubmit = async () => {
    console.log("CursoDialog handleSubmit, editingId:", editingId);

    // Upload da thumbnail se houver arquivo novo
    let thumbnailUrl = cursoForm.formData.thumbnail;
    if (thumbnailFile) {
      const uploadedUrl = await uploadThumbnailToS3(thumbnailFile);
      if (uploadedUrl) {
        thumbnailUrl = uploadedUrl;
      }
    }

    if (!editingId) {
      console.log("Modo CRIAÇÃO");
      // Passar a thumbnail diretamente para o handleSubmit
      cursoForm.handleSubmit({ thumbnail: thumbnailUrl });
      return;
    }

    try {
      const response = await fetch(`/api/admin/cursos/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeInterno: cursoForm.formData.nomeInterno,
          titulo: cursoForm.formData.titulo,
          descricao: cursoForm.formData.descricao,
          categoriaId: cursoForm.formData.categoriaId,
          nivel: cursoForm.formData.nivel,
          gratuito: cursoForm.formData.gratuito,
          preco: cursoForm.formData.preco,
          precoOriginal: cursoForm.formData.precoOriginal,
          desconto: cursoForm.formData.desconto,
          instrutoresIds: cursoForm.formData.instrutoresIds,
          modulosSelecionados: cursoForm.formData.modulosSelecionados,
          thumbnail: thumbnailUrl,
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Erro ao atualizar curso");
      }

      const cursoAtualizado = await response.json();
      console.log("Curso atualizado:", cursoAtualizado);

      onCursoCreated(cursoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      toast.error("Erro ao atualizar curso");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-7xl h-[90vh] flex flex-col overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6" />
              {editingId ? "Editar Curso" : "Adicionar Novo Curso"}
            </DialogTitle>
          </DialogHeader>

          <div className="w-full space-y-6">
            <div>
              <Label>Nome interno</Label>
              <Input
                placeholder="Identificação interna do curso"
                value={cursoForm.formData.nomeInterno}
                onChange={(e) =>
                  cursoForm.setFormData({
                    ...cursoForm.formData,
                    nomeInterno: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Título do Curso</Label>
              <Input
                placeholder="Título do Curso"
                value={cursoForm.formData.titulo}
                onChange={(e) =>
                  cursoForm.setFormData({
                    ...cursoForm.formData,
                    titulo: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Descrição</Label>
              <Textarea
                placeholder="Descrição do Curso"
                value={cursoForm.formData.descricao}
                onChange={(e) =>
                  cursoForm.setFormData({
                    ...cursoForm.formData,
                    descricao: e.target.value,
                  })
                }
              />
            </div>

            {/* Upload de Thumbnail */}
            <div className="space-y-2">
              <Label>Imagem de Capa (Thumbnail)</Label>
              <div className="flex flex-col gap-3 w-full">
                {thumbnailPreview ? (
                  <div className="relative w-full">
                    <img
                      src={thumbnailPreview}
                      alt="Preview da thumbnail"
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={handleRemoveThumbnail}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label
                    htmlFor="thumbnail-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Clique para fazer upload</span> ou arraste a imagem
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG ou WEBP (máx. 5MB)
                      </p>
                    </div>
                    <input
                      id="thumbnail-upload"
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                    />
                  </label>
                )}
                {uploadingThumbnail && (
                  <p className="text-sm text-muted-foreground">
                    Fazendo upload da imagem...
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCategoriaDialogOpen(true)}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Nova
                </Button>
              </div>

              <select
                id="categoria"
                value={cursoForm.formData.categoriaId}
                onChange={(e) =>
                  cursoForm.setFormData({
                    ...cursoForm.formData,
                    categoriaId: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="instrutores">Instrutores</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setInstrutorDialogOpen(true)}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Novo
                </Button>
              </div>

              <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
                {instrutores.map((instrutor) => (
                  <label
                    key={instrutor.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={instrutor.id}
                      checked={
                        Array.isArray(cursoForm.formData.instrutoresIds) &&
                        cursoForm.formData.instrutoresIds.includes(instrutor.id)
                      }
                      onChange={(e) => {
                        const currentInstrutores = Array.isArray(
                          cursoForm.formData.instrutoresIds
                        )
                          ? cursoForm.formData.instrutoresIds
                          : [];
                        const newInstrutores = e.target.checked
                          ? [...currentInstrutores, instrutor.id]
                          : currentInstrutores.filter(
                              (id) => id !== instrutor.id
                            );
                        cursoForm.setFormData({
                          ...cursoForm.formData,
                          instrutoresIds: newInstrutores,
                        });
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{instrutor.nome}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="nivel">Nível do Curso</Label>
              <select
                id="nivel"
                value={cursoForm.formData.nivel}
                onChange={(e) =>
                  cursoForm.setFormData({
                    ...cursoForm.formData,
                    nivel: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
              </select>
            </div>

            <div className="space-y-3">
              <Label>Tipo de Curso</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gratuito"
                    value="true"
                    checked={cursoForm.formData.gratuito === true}
                    onChange={() =>
                      cursoForm.setFormData({
                        ...cursoForm.formData,
                        gratuito: true,
                        preco: "",
                        precoOriginal: "",
                        desconto: "",
                      })
                    }
                    className="h-4 w-4"
                  />
                  <span>Gratuito</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gratuito"
                    value="false"
                    checked={cursoForm.formData.gratuito === false}
                    onChange={() =>
                      cursoForm.setFormData({
                        ...cursoForm.formData,
                        gratuito: false,
                      })
                    }
                    className="h-4 w-4"
                  />
                  <span>Pago</span>
                </label>
              </div>
            </div>

            {cursoForm.formData.gratuito === false && (
              <div className="space-y-4 p-4 border rounded-md bg-muted/30">
                <div>
                  <Label>Preço</Label>
                  <Input
                    type="number"
                    placeholder="Preço (ex: 297.00)"
                    value={cursoForm.formData.preco}
                    onChange={(e) =>
                      cursoForm.setFormData({
                        ...cursoForm.formData,
                        preco: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Preço Original (opcional)</Label>
                  <Input
                    type="number"
                    placeholder="Preço original (ex: 497.00)"
                    value={cursoForm.formData.precoOriginal || ""}
                    onChange={(e) =>
                      cursoForm.setFormData({
                        ...cursoForm.formData,
                        precoOriginal: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Desconto % (opcional)</Label>
                  <Input
                    type="number"
                    placeholder="Desconto em porcentagem (ex: 40)"
                    value={cursoForm.formData.desconto || ""}
                    onChange={(e) =>
                      cursoForm.setFormData({
                        ...cursoForm.formData,
                        desconto: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Vincular Módulos</Label>
              <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
                {modulos.map((modulo) => (
                  <label
                    key={modulo.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={modulo.id}
                      checked={
                        Array.isArray(cursoForm.formData.modulosSelecionados) &&
                        cursoForm.formData.modulosSelecionados.includes(
                          modulo.id
                        )
                      }
                      onChange={(e) => {
                        const currentModulos = Array.isArray(
                          cursoForm.formData.modulosSelecionados
                        )
                          ? cursoForm.formData.modulosSelecionados
                          : [];
                        const newModulos = e.target.checked
                          ? [...currentModulos, modulo.id]
                          : currentModulos.filter((id) => id !== modulo.id);
                        cursoForm.setFormData({
                          ...cursoForm.formData,
                          modulosSelecionados: newModulos,
                        });
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">
                      {modulo.nomeInterno
                        ? `${modulo.nomeInterno} — ${modulo.titulo}`
                        : modulo.titulo}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit} disabled={cursoForm.isLoading}>
              {cursoForm.isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Salvando...
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {editingId ? "Atualizar Curso" : "Salvar Curso"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CategoriaDialog
        open={categoriaDialogOpen}
        onOpenChange={setCategoriaDialogOpen}
        onCategoriaCreated={(cat) => {
          onCategoriaCreated(cat);
          setCategoriaDialogOpen(false);
        }}
      />

      <InstrutorDialog
        open={instrutorDialogOpen}
        onOpenChange={setInstrutorDialogOpen}
        onInstrutorCreated={(inst) => {
          onInstrutorCreated(inst);
          setInstrutorDialogOpen(false);
        }}
      />
    </>
  );
}
