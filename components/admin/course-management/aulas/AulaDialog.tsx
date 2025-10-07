// components/admin/course-management/aulas/AulaDialog.tsx
import { DragEvent, useEffect, useRef, useState } from "react";
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
import { Settings, Save, Upload, FileText, X } from "lucide-react";
import { toast } from "sonner";

interface AulaArquivo {
  nome: string;
  url: string;
  tipo?: string;
}

interface AulaFormData {
  titulo: string;
  descricao: string;
  videoUrl: string;
  duracao?: string;
  ordem: string;
  moduloIds: string[];
  arquivos: AulaArquivo[];
}

interface AulaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modulos: Array<{ id: string; titulo: string }>;
  onAulaCreated: (aula: any) => void;
  editingAula?: any;
  editingId?: string | null;
}

export function AulaDialog({
  open,
  onOpenChange,
  modulos,
  onAulaCreated,
  editingAula,
  editingId,
}: AulaDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<AulaFormData>({
    titulo: "",
    descricao: "",
    videoUrl: "",
    duracao: "",
    ordem: "1",
    moduloIds: [],
    arquivos: [],
  });

  // Preencher formulário quando estiver editando
  useEffect(() => {
    if (editingAula && editingId) {
      console.log("Preenchendo formulário com dados da aula:", editingAula);

      // Extrair IDs dos módulos
      const moduloIds = editingAula.aulaModulos
        ? editingAula.aulaModulos.map((am: any) => am.moduloId)
        : [];

      setFormData({
        titulo: editingAula.titulo || "",
        descricao: editingAula.descricao || "",
        videoUrl: editingAula.videoUrl || "",
        duracao: editingAula.duracao || "",
        ordem: editingAula.ordem?.toString() || "1",
        moduloIds,
        arquivos: Array.isArray(editingAula.arquivos)
          ? editingAula.arquivos.map((arquivo: any) => ({
              nome: arquivo.nome,
              url: arquivo.url,
              tipo: arquivo.tipo,
            }))
          : [],
      });
    } else {
      // Resetar formulário ao criar novo
      setFormData({
        titulo: "",
        descricao: "",
        videoUrl: "",
        duracao: "",
        ordem: "1",
        moduloIds: [],
        arquivos: [],
      });
    }
    setSelectedFiles([]);
    setIsDragActive(false);
    resetFileInput();
  }, [editingAula, editingId, open]);

  const getFileKey = (arquivo: File) =>
    `${arquivo.name}-${arquivo.size}-${arquivo.lastModified}`;

  const getExistingArquivoKey = (arquivo: AulaArquivo) =>
    `${arquivo.url ?? ""}-${arquivo.nome}`;

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addFiles = (filesList: FileList | null) => {
    if (!filesList) return;
    const incomingFiles = Array.from(filesList);
    if (!incomingFiles.length) return;

    setSelectedFiles((prev) => {
      const existing = new Set(prev.map(getFileKey));
      const uniqueIncoming = incomingFiles.filter(
        (arquivo) => !existing.has(getFileKey(arquivo))
      );
      return [...prev, ...uniqueIncoming];
    });
    resetFileInput();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    addFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const nextTarget = event.relatedTarget as Node | null;
    if (nextTarget && event.currentTarget.contains(nextTarget)) {
      return;
    }
    setIsDragActive(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removePendingFile = (arquivo: File) => {
    setSelectedFiles((prev) =>
      prev.filter((item) => getFileKey(item) !== getFileKey(arquivo))
    );
  };

  const removeExistingArquivo = (arquivoParaRemover: AulaArquivo) => {
    setFormData((prev) => ({
      ...prev,
      arquivos: prev.arquivos.filter(
        (arquivo) =>
          getExistingArquivoKey(arquivo) !==
          getExistingArquivoKey(arquivoParaRemover)
      ),
    }));
  };

  const handleSubmit = async () => {
    console.log("AulaDialog handleSubmit, editingId:", editingId);

    if (!formData.titulo || !formData.ordem) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setIsLoading(true);

    try {
      const url = editingId
        ? `/api/admin/aulas/${editingId}`
        : "/api/admin/aulas";

      const method = editingId ? "PUT" : "POST";

      let arquivosParaEnviar = [...formData.arquivos];

      if (selectedFiles.length) {
        const uploadFormData = new FormData();
        selectedFiles.forEach((arquivo) => {
          uploadFormData.append("files", arquivo);
        });

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          const errTxt = await uploadResponse.text();
          console.error("Upload response error:", errTxt);
          throw new Error("UPLOAD_FAILED");
        }

        const uploadResult = await uploadResponse.json();
        const novosArquivos = Array.isArray(uploadResult.uploads)
          ? uploadResult.uploads
          : [];

        arquivosParaEnviar = [
          ...arquivosParaEnviar,
          ...novosArquivos.map((arquivo: any) => ({
            nome: arquivo.nome,
            tipo: arquivo.tipo,
            url: arquivo.url,
          })),
        ];
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: formData.titulo,
          descricao: formData.descricao,
          videoUrl: formData.videoUrl,
          duracao: formData.duracao,
          ordem: parseInt(formData.ordem, 10),
          moduloIds: formData.moduloIds,
          arquivos: arquivosParaEnviar,
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(
          editingId ? "Erro ao atualizar aula" : "Erro ao criar aula"
        );
      }

      const aulaSalva = await response.json();
      console.log("Aula salva:", aulaSalva);

      toast.success(
        editingId ? "Aula atualizada com sucesso!" : "Aula criada com sucesso!"
      );
      setFormData((prev) => ({
        ...prev,
        arquivos: arquivosParaEnviar,
      }));
      setSelectedFiles([]);
      resetFileInput();
      setIsDragActive(false);
      onAulaCreated(aulaSalva);
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao salvar aula:", error);
      if (error instanceof Error && error.message === "UPLOAD_FAILED") {
        toast.error("Erro ao enviar arquivos de apoio");
      } else {
        toast.error(
          editingId ? "Erro ao atualizar aula" : "Erro ao criar aula"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            {editingId ? "Editar Aula" : "Adicionar Nova Aula"}
          </DialogTitle>
        </DialogHeader>

        <div className="w-full space-y-6">
          <div>
            <Label>Título da Aula</Label>
            <Input
              placeholder="Título da Aula"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Descrição da Aula</Label>
            <Textarea
              placeholder="Descrição da Aula"
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
            />
          </div>

          <div>
            <Label>URL da Aula</Label>
            <Input
              placeholder="URL do Vídeo (Bunny.net)"
              value={formData.videoUrl}
              onChange={(e) =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Duração da Aula</Label>
            <Input
              placeholder="Ex: 10:30"
              value={formData.duracao || ""}
              onChange={(e) =>
                setFormData({ ...formData, duracao: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Ordem da Aula</Label>
            <Input
              type="number"
              placeholder="Ordem da Aula (ex: 1, 2, 3...)"
              value={formData.ordem}
              onChange={(e) =>
                setFormData({ ...formData, ordem: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Vincular Módulos</Label>
            <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
              {modulos.length === 0 ? (
                <p className="text-sm text-muted-foreground p-2">
                  Nenhum módulo disponível. Crie um módulo primeiro.
                </p>
              ) : (
                modulos.map((modulo) => (
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
                        setFormData({
                          ...formData,
                          moduloIds: newModulos,
                        });
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{modulo.titulo}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div>
            <Label>Arquivos de apoio da Aula</Label>
            <div
              className={`border-2 border-dashed border-border rounded-lg p-6 text-center transition-colors ${
                isDragActive ? "border-primary bg-primary/10" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              role="presentation"
            >
              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">
                Arraste e solte arquivos aqui
              </p>
              <p className="text-sm text-muted-foreground">ou</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={openFileDialog}
              >
                Selecionar arquivos
              </Button>
              <input
                ref={fileInputRef}
                id="lesson-files"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
              />
            </div>
            {formData.arquivos.length > 0 && (
              <div className="mt-4 space-y-2 text-sm">
                <p className="font-medium">Arquivos adicionados</p>
                <ul className="space-y-1">
                  {formData.arquivos.map((arquivo) => (
                    <li
                      key={getExistingArquivoKey(arquivo)}
                      className="flex items-center justify-between rounded border px-3 py-2"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {arquivo.nome}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExistingArquivo(arquivo)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedFiles.length > 0 && (
              <div className="mt-4 space-y-2 text-sm">
                <p className="font-medium">Arquivos prontos para envio</p>
                <ul className="space-y-1">
                  {selectedFiles.map((arquivo) => (
                    <li
                      key={getFileKey(arquivo)}
                      className="flex items-center justify-between rounded border px-3 py-2"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {arquivo.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePendingFile(arquivo)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Salvando...
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {editingId ? "Atualizar Aula" : "Salvar Aula"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
