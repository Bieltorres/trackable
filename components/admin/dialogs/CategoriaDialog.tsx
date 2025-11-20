// components/admin/dialogs/CategoriaDialog.tsx
import { useEffect, useState, useRef, type ElementType } from "react";
import * as Icons from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useCategoriaForm } from "@/components/hooks/admin/useCategoriaForm";
import { toast } from "sonner";

interface CategoriaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoriaCreated: (categoria: any) => void;
  editingCategoria?: { id: string; nome: string; cor: string; icone: string; customSvgUrl?: string } | null;
}

export function CategoriaDialog({
  open,
  onOpenChange,
  onCategoriaCreated,
  editingCategoria,
}: CategoriaDialogProps) {
  const categoriaForm = useCategoriaForm(
    (newCategoria) => {
      onCategoriaCreated(newCategoria);
    },
    async () => {
      // Callback para fazer upload do SVG antes de salvar
      if (svgContent) {
        return await uploadSvgToS3(svgContent);
      }
      return null;
    }
  );

  const [useCustomSvg, setUseCustomSvg] = useState(false);
  const [svgUrl, setSvgUrl] = useState<string | null>(null);
  const [svgPreview, setSvgPreview] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Debug: monitorar mudanças no svgPreview
  useEffect(() => {
    console.log("🔍 svgPreview mudou para:", svgPreview);
  }, [svgPreview]);

  // Preencher formulário quando estiver editando
  useEffect(() => {
    if (editingCategoria && open) {
      categoriaForm.setFormData({
        nome: editingCategoria.nome,
        cor: editingCategoria.cor,
        icone: editingCategoria.icone || categoriaForm.formData.icone,
        customSvgUrl: editingCategoria.customSvgUrl || null,
      });
      categoriaForm.setEditingId(editingCategoria.id);

      if (editingCategoria.customSvgUrl) {
        setUseCustomSvg(true);
        setSvgUrl(editingCategoria.customSvgUrl);
        setSvgPreview(editingCategoria.customSvgUrl);
        setSvgContent(null);
      } else {
        setUseCustomSvg(false);
        setSvgUrl(null);
        setSvgPreview(null);
        setSvgContent(null);
      }
    } else if (!open) {
      // Resetar ao fechar
      categoriaForm.setFormData({
        nome: "",
        cor: "#3B82F6",
        icone: "BookOpen",
        customSvgUrl: null,
      });
      categoriaForm.setEditingId(null);
      setUseCustomSvg(false);
      setSvgUrl(null);
      setSvgPreview(null);
      setSvgContent(null);
    }
  }, [editingCategoria, open]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("📁 Arquivo selecionado:", file.name, file.type, file.size);

    try {
      // Ler o arquivo para preview imediato
      const text = await file.text();
      console.log("📄 Conteúdo lido, tamanho:", text.length);
      console.log("📄 Primeiros 100 caracteres:", text.substring(0, 100));

      // Validar se contém SVG (pode ser um arquivo SVG puro ou HTML contendo SVG)
      if (!text.includes("<svg")) {
        toast.error("O arquivo não parece conter um SVG válido");
        console.error("❌ SVG não encontrado, conteúdo:", text.substring(0, 200));
        return;
      }

      // Se for HTML do Edge contendo SVG, extrair apenas o SVG
      let extractedSvg = text;
      if (text.includes("<!DOCTYPE") || text.includes("<html")) {
        console.log("📋 Detectado HTML, extraindo SVG...");
        const svgMatch = text.match(/<svg[\s\S]*?<\/svg>/i);
        if (svgMatch) {
          extractedSvg = svgMatch[0];
          console.log("✂️ SVG extraído, tamanho:", extractedSvg.length);
        } else {
          toast.error("Não foi possível extrair o SVG do arquivo HTML");
          return;
        }
      }

      // Armazenar o conteúdo SVG para upload posterior
      setSvgContent(extractedSvg);

      // Criar URL de preview local com o SVG extraído
      const blob = new Blob([extractedSvg], { type: "image/svg+xml" });
      const previewUrl = URL.createObjectURL(blob);
      console.log("🖼️ Preview URL criada:", previewUrl);
      setSvgPreview(previewUrl);
      console.log("✅ State svgPreview atualizado (upload será feito ao salvar)");

    } catch (error: any) {
      console.error("❌ Erro ao processar arquivo:", error);
      toast.error(error.message || "Erro ao processar o arquivo SVG");
      setSvgPreview(null);
      setSvgContent(null);
    }
  };

  const handleRemoveSvg = () => {
    // Revogar URL de preview se existir
    if (svgPreview && svgPreview.startsWith("blob:")) {
      URL.revokeObjectURL(svgPreview);
    }

    setSvgUrl(null);
    setSvgPreview(null);
    setSvgContent(null);
    categoriaForm.setFormData({
      ...categoriaForm.formData,
      customSvgUrl: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadSvgToS3 = async (svgContent: string): Promise<string | null> => {
    try {
      setUploadingFile(true);
      console.log("⬆️ Fazendo upload do SVG para S3...");

      const svgFile = new File([svgContent], `category-icon-${Date.now()}.svg`, {
        type: "image/svg+xml",
      });
      const formData = new FormData();
      formData.append("svg", svgFile);

      const response = await fetch("/api/upload/svg", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao fazer upload do SVG");
      }

      const data = await response.json();
      const uploadedUrl = data.url;
      console.log("✅ Upload concluído, URL:", uploadedUrl);

      setSvgUrl(uploadedUrl);
      toast.success("SVG enviado com sucesso!");
      return uploadedUrl;
    } catch (error: any) {
      console.error("❌ Erro ao fazer upload:", error);
      toast.error(error.message || "Erro ao fazer upload do SVG");
      return null;
    } finally {
      setUploadingFile(false);
    }
  };

  const handleIconTypeChange = (useSvg: boolean) => {
    setUseCustomSvg(useSvg);
    if (!useSvg) {
      handleRemoveSvg();
    }
  };

  const iconRecord = Icons as Record<string, ElementType>;
  const IconPreview =
    iconRecord[categoriaForm.formData.icone] ?? Icons.BookOpen;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingCategoria ? "Editar Categoria" : "Nova Categoria"}
          </DialogTitle>
          <DialogDescription>
            {editingCategoria
              ? "Edite as informações da categoria."
              : "Adicione uma nova categoria para os cursos."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label>Nome da Categoria</Label>
            <Input
              placeholder="Nome da categoria"
              value={categoriaForm.formData.nome}
              onChange={(e) =>
                categoriaForm.setFormData({
                  ...categoriaForm.formData,
                  nome: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cor">Cor de Fundo</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="cor"
                type="color"
                value={categoriaForm.formData.cor === "transparent" ? "#3B82F6" : categoriaForm.formData.cor}
                onChange={(e) =>
                  categoriaForm.setFormData({
                    ...categoriaForm.formData,
                    cor: e.target.value,
                  })
                }
                className="w-24"
                disabled={categoriaForm.formData.cor === "transparent"}
              />
              <Button
                type="button"
                variant={categoriaForm.formData.cor === "transparent" ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  categoriaForm.setFormData({
                    ...categoriaForm.formData,
                    cor: categoriaForm.formData.cor === "transparent" ? "#3B82F6" : "transparent",
                  })
                }
              >
                {categoriaForm.formData.cor === "transparent" ? "✓ Transparente" : "Transparente"}
              </Button>
              {categoriaForm.formData.cor !== "transparent" && (
                <span className="text-xs text-muted-foreground">
                  {categoriaForm.formData.cor}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Tipo de Ícone</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="iconType"
                  checked={!useCustomSvg}
                  onChange={() => handleIconTypeChange(false)}
                  className="h-4 w-4"
                />
                <span>Ícone da Biblioteca</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="iconType"
                  checked={useCustomSvg}
                  onChange={() => handleIconTypeChange(true)}
                  className="h-4 w-4"
                />
                <span>SVG Customizado</span>
              </label>
            </div>
          </div>

          {!useCustomSvg ? (
            <div className="space-y-2">
              <Label>Ícone Sugerido</Label>
              <div className="flex items-center justify-between rounded-md border border-input bg-muted/40 px-3 py-2">
                <div className="flex items-center gap-2">
                  <IconPreview className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {categoriaForm.formData.icone}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={categoriaForm.randomizeIcon}
                >
                  Gerar outro
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Escolheremos um ícone automaticamente ao salvar.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Upload de SVG</Label>
              {!svgPreview ? (
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">
                    Arraste um arquivo SVG ou clique para selecionar
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingFile}
                  >
                    {uploadingFile ? "Enviando..." : "Selecionar SVG"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".svg,image/svg+xml"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={uploadingFile}
                  />
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-muted-foreground">
                      💡 <strong>Tamanho ideal:</strong> até 100KB (maioria dos SVGs: 5-20KB)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      O SVG será salvo no S3 e ficará disponível publicamente.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Label>Preview do SVG</Label>
                      {svgUrl ? (
                        <span className="text-xs text-green-600">
                          ✓ Salvo no S3
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Será enviado ao salvar
                        </span>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveSvg}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center p-4 bg-muted/40 rounded-md">
                    <img
                      src={svgPreview}
                      alt="SVG Preview"
                      className="max-w-[100px] max-h-[100px]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={categoriaForm.handleSubmit}
            disabled={categoriaForm.isLoading}
          >
            {categoriaForm.isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
