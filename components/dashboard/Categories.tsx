import { useState } from "react";
import type { ElementType } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight, MoreVertical, Edit3, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoriaDialog } from "@/components/admin/dialogs/CategoriaDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ConfirmDialog,
  useConfirmDialog,
} from "@/components/layout/ConfirmDialog";
import { toast } from "sonner";

interface CategoriaPersonalizada {
  id?: string;
  nome: string;
  icon: ElementType;
  cor: string;
  descricao: string;
  cursos: number;
  customSvgUrl?: string;
}

interface NovaCategoria {
  id: string;
  nome: string;
  cor: string;
  icone: string;
  totalCursos?: number;
  customSvgUrl?: string;
}

interface CategoriesProps {
  categorias: CategoriaPersonalizada[];
  categoriaSelecionada: string | null;
  onCategoriaSelect: (categoria: string | null) => void;
  loading?: boolean;
  isAdmin?: boolean;
  onCategoriaCreated?: (categoria: NovaCategoria) => void;
  onCategoriaUpdated?: (categoria: NovaCategoria) => void;
  onCategoriaDeleted?: (categoriaId: string) => void;
}

export function Categories({
  categorias,
  categoriaSelecionada,
  onCategoriaSelect,
  loading = false,
  isAdmin = false,
  onCategoriaCreated,
  onCategoriaUpdated,
  onCategoriaDeleted,
}: CategoriesProps) {
  const [isCategoriaDialogOpen, setIsCategoriaDialogOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<NovaCategoria | null>(null);
  const [categoriaToDelete, setCategoriaToDelete] = useState<{ id: string; nome: string } | null>(null);
  const confirmDialog = useConfirmDialog();

  const handleEdit = async (categoria: CategoriaPersonalizada, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!categoria.id) return;

    // Buscar os dados completos da categoria do banco
    try {
      const response = await fetch(`/api/admin/categorias/${categoria.id}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar categoria");
      }
      const data = await response.json();

      setEditingCategoria({
        id: data.categoria.id,
        nome: data.categoria.nome,
        cor: data.categoria.cor,
        icone: data.categoria.icone || "BookOpen",
        customSvgUrl: data.categoria.customSvgUrl,
      });
      setIsCategoriaDialogOpen(true);
    } catch (error) {
      console.error("Erro ao buscar categoria:", error);
      toast.error("Erro ao buscar detalhes da categoria");
    }
  };

  const handleDelete = async (categoria: CategoriaPersonalizada, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!categoria.id) return;

    setCategoriaToDelete({ id: categoria.id, nome: categoria.nome });
    confirmDialog.openDialog(async () => {
      try {
        const response = await fetch(`/api/admin/categorias/${categoria.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erro ao deletar categoria");
        }

        if (categoria.id) {
          onCategoriaDeleted?.(categoria.id);
        }
        toast.success("Categoria deletada com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar categoria:", error);
        toast.error("Erro ao deletar categoria");
        throw error;
      } finally {
        setCategoriaToDelete(null);
      }
    });
  };

  const handleDialogClose = () => {
    setIsCategoriaDialogOpen(false);
    setEditingCategoria(null);
  };

  const handleCategoriaSubmit = (categoria: NovaCategoria) => {
    if (editingCategoria) {
      onCategoriaUpdated?.(categoria);
      toast.success("Categoria atualizada com sucesso!");
    } else {
      onCategoriaCreated?.(categoria);
      toast.success("Categoria criada com sucesso!");
    }
    handleDialogClose();
  };

  if (loading) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Categorias</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Categorias</h3>
        {isAdmin && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCategoriaDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Categoria
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categorias.map((categoria) => {
          if (categoria.customSvgUrl) {
            console.log("🎨 Categoria com SVG customizado:", categoria.nome, categoria.customSvgUrl);
          }
          return (
            <Card
              key={categoria.nome}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-lg",
                categoriaSelecionada === categoria.nome
                  ? "ring-2 ring-blue-500"
                  : ""
              )}
              onClick={() =>
                onCategoriaSelect(
                  categoriaSelecionada === categoria.nome ? null : categoria.nome
                )
              }
            >
              <CardContent className="p-4 mt-5">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      categoria.cor === "transparent"
                        ? "bg-transparent"
                        : categoria.cor?.startsWith("#") || categoria.cor?.startsWith("rgb")
                        ? undefined
                        : categoria.cor || "bg-primary"
                    )}
                    style={
                      categoria.cor === "transparent"
                        ? { backgroundColor: "transparent" }
                        : categoria.cor?.startsWith("#") || categoria.cor?.startsWith("rgb")
                        ? { backgroundColor: categoria.cor }
                        : undefined
                    }
                  >
                    {categoria.customSvgUrl ? (
                      <img
                        src={categoria.customSvgUrl}
                        alt={categoria.nome}
                        className={cn(
                          "h-5 w-5",
                          categoria.cor === "transparent" ? "" : "text-white"
                        )}
                        style={categoria.cor === "transparent" ? undefined : { filter: "brightness(0) invert(1)" }}
                      />
                    ) : (
                      <categoria.icon className={cn(
                        "h-5 w-5",
                        categoria.cor === "transparent" ? "text-gray-700" : "text-white"
                      )} />
                    )}
                  </div>
                <div className="flex items-center gap-2">
                  {isAdmin && categoria.id && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => handleEdit(categoria, e)}>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => handleDelete(categoria, e)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">
                {categoria.nome}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {categoria.descricao}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {categoria.cursos} cursos
                </span>
                {categoriaSelecionada === categoria.nome && (
                  <Badge variant="secondary" className="text-xs">
                    Selecionado
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>
      {isAdmin && (
        <>
          <CategoriaDialog
            open={isCategoriaDialogOpen}
            onOpenChange={handleDialogClose}
            onCategoriaCreated={handleCategoriaSubmit}
            editingCategoria={editingCategoria}
          />
          <ConfirmDialog
            open={confirmDialog.isOpen}
            onOpenChange={confirmDialog.setIsOpen}
            onConfirm={confirmDialog.handleConfirm}
            title="Excluir Categoria"
            description={
              categoriaToDelete
                ? `Tem certeza que deseja excluir a categoria "${categoriaToDelete.nome}"? Esta ação não pode ser desfeita.`
                : "Tem certeza que deseja excluir esta categoria?"
            }
            confirmText="Excluir"
            cancelText="Cancelar"
            variant="destructive"
            isLoading={confirmDialog.isLoading}
          />
        </>
      )}
    </div>
  );
}
