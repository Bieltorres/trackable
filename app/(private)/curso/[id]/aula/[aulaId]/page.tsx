"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  PlayCircle,
  Download,
  Plus,
  Upload,
  Save,
  NotebookPen,
  Edit3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserSettingsModal } from "@/components/user-settings-modal";
import { AdminConfigModal } from "@/components/admin-config-modal";
import { useAppSelector } from "@/store/hooks";
import { useToast } from "@/components/ui/use-toast";
import { BotaoBaixar } from "@/components/ui/botaoBaixar";

interface AulaAnotacao {
  id: string;
  titulo: string;
  conteudo: string;
  cursoId: string;
  aulaId?: string | null;
  cor: string;
  corTexto: string;
  dataCriacao?: string;
  createdAt?: string;
  updatedAt?: string;
  curso?: {
    id: string;
    titulo: string;
  };
  aula?: {
    id: string;
    titulo?: string | null;
  };
}

export default function AulaPage() {
  const params = useParams();
  const { user } = useAppSelector((state) => state.user);
  const { toast } = useToast();
  const isAdmin = user?.role === "admin";
  const cursoId = Array.isArray(params.id) ? params.id[0] : params.id;
  const aulaId = Array.isArray(params.aulaId)
    ? params.aulaId[0]
    : params.aulaId;

  // Estados para dados da API
  const [cursoData, setCursoData] = useState<any>(null);
  const [aulaAtual, setAulaAtual] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Estados existentes
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modulosAbertos, setModulosAbertos] = useState<string[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editandoConteudo, setEditandoConteudo] = useState(false);
  const [tituloAula, setTituloAula] = useState("");
  const [descricaoAula, setDescricaoAula] = useState("");
  const [novoArquivo, setNovoArquivo] = useState({
    nome: "",
    tipo: "",
    tamanho: "",
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminConfigOpen, setIsAdminConfigOpen] = useState(false);
  const [anotacoes, setAnotacoes] = useState<AulaAnotacao[]>([]);
  const [carregandoAnotacoes, setCarregandoAnotacoes] = useState(false);
  const [salvandoAnotacao, setSalvandoAnotacao] = useState(false);
  const [novaAnotacao, setNovaAnotacao] = useState({
    titulo: "",
    conteudo: "",
  });
  const [anotacoesVisiveis, setAnotacoesVisiveis] = useState(true);
  const [isAnotacaoDialogOpen, setIsAnotacaoDialogOpen] = useState(false);

  const carregarAnotacoes = useCallback(async () => {
    if (!cursoId) {
      return;
    }

    try {
      setCarregandoAnotacoes(true);
      const searchParams = new URLSearchParams();
      searchParams.append("cursoId", cursoId);
      if (aulaId) {
        searchParams.append("aulaId", aulaId);
      }

      const response = await fetch(`/api/anotacoes?${searchParams.toString()}`);

      if (!response.ok) {
        throw new Error("Erro ao carregar anotações");
      }

      const data = await response.json();
      setAnotacoes(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.error("Erro ao carregar anotações:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar anotações",
        variant: "destructive",
      });
    } finally {
      setCarregandoAnotacoes(false);
    }
  }, [cursoId, aulaId, toast]);

  useEffect(() => {
    carregarAnotacoes();
  }, [carregarAnotacoes]);

  useEffect(() => {
    const fetchAulaData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/cursos/${cursoId}/aula/${aulaId}`);

        if (!response.ok) {
          throw new Error("Erro ao carregar aula");
        }

        const data = await response.json();
        console.log("Dados recebidos:", data);

        setCursoData(data.curso);
        setAulaAtual(data.aula);
        setTituloAula(data.aula.titulo);
        setDescricaoAula(data.aula.descricao || "");

        // Abrir o módulo da aula atual por padrão
        const moduloAtual = data.curso?.cursoModulos?.find((cm: any) =>
          cm.modulo?.aulaModulos?.some(
            (am: any) => am.aula?.id === data.aula.id
          )
        );
        if (moduloAtual?.modulo?.id) {
          setModulosAbertos([moduloAtual.modulo.id]);
        }
      } catch (error) {
        console.error("Erro ao carregar aula:", error);
        toast({
          title: "Erro",
          description: "Erro ao carregar dados da aula",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (cursoId && aulaId) {
      fetchAulaData();
    }
  }, [cursoId, aulaId, toast]);

  const toggleModulo = (moduloId: string) => {
    setModulosAbertos((prev) =>
      prev.includes(moduloId)
        ? prev.filter((id) => id !== moduloId)
        : [...prev, moduloId]
    );
  };

  const handleSalvarConteudo = async () => {
    try {
      setEditandoConteudo(false);
      toast({
        title: "Sucesso",
        description: "Conteúdo salvo com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar conteúdo",
        variant: "destructive",
      });
    }
  };

  const handleSalvarAnotacao = async () => {
    if (!cursoId) {
      toast({
        title: "Erro",
        description: "Curso não encontrado",
        variant: "destructive",
      });
      return;
    }

    if (
      !novaAnotacao.titulo.trim().length ||
      !novaAnotacao.conteudo.trim().length
    ) {
      toast({
        title: "Atenção",
        description: "Preencha título e conteúdo da anotação",
        variant: "destructive",
      });
      return;
    }

    try {
      setSalvandoAnotacao(true);
      const response = await fetch("/api/anotacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: novaAnotacao.titulo.trim(),
          conteudo: novaAnotacao.conteudo.trim(),
          cursoId,
          aulaId: aulaId || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar anotação");
      }

      const data = await response.json();
      if (data?.data) {
        setAnotacoes((prev) => [data.data, ...prev]);
      } else {
        await carregarAnotacoes();
      }

      setNovaAnotacao({ titulo: "", conteudo: "" });
      setIsAnotacaoDialogOpen(false);
      setAnotacoesVisiveis(true);
      toast({
        title: "Sucesso",
        description: "Anotação salva com sucesso",
      });
    } catch (error) {
      console.error("Erro ao salvar anotação:", error);
      toast({
        title: "Erro",
        description: "Erro ao salvar anotação",
        variant: "destructive",
      });
    } finally {
      setSalvandoAnotacao(false);
    }
  };

  const handleAdicionarArquivo = async () => {
    if (novoArquivo.nome) {
      try {
        console.log("Adicionando arquivo:", novoArquivo);
        setNovoArquivo({ nome: "", tipo: "", tamanho: "" });
        toast({
          title: "Sucesso",
          description: "Arquivo adicionado com sucesso!",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao adicionar arquivo",
          variant: "destructive",
        });
      }
    }
  };

  const getFileIcon = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "pdf":
        return "📄";
      case "excel":
      case "xlsx":
      case "xls":
        return "📊";
      case "word":
      case "docx":
      case "doc":
        return "📝";
      case "video":
      case "mp4":
      case "avi":
        return "🎥";
      case "image":
      case "jpg":
      case "png":
      case "gif":
        return "🖼️";
      default:
        return "📁";
    }
  };

  const formatarDataAnotacao = (valor?: string) => {
    if (!valor) return "";
    const data = new Date(valor);
    if (Number.isNaN(data.getTime())) {
      return "";
    }
    return data.toLocaleDateString("pt-BR");
  };

  async function handleDownload(arquivo: { key: string; nome: string }) {
    const res = await fetch("/api/files/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: arquivo.key, filename: arquivo.nome }),
    });

    if (!res.ok) {
      const t = await res.text();
      console.error("Falha ao gerar link:", t);
      return;
    }

    const { url } = await res.json();
    window.location.href = url;
  }

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!cursoData || !aulaAtual) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Aula não encontrada
          </h2>
          <p className="text-gray-600 mb-4">
            A aula que você está procurando não existe ou você não tem acesso a
            ela.
          </p>
          <Button asChild>
            <Link href="/dashboard">Voltar ao Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Pegar o primeiro instrutor
  const instrutor = cursoData.instrutores?.[0]?.instrutor;

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex overflow-hidden">
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 flex overflow-hidden">
          {/* Vídeo e Conteúdo Principal */}
          <div className="bg-white flex-1 flex flex-col overflow-y-auto">
            {/* Video Player */}
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%",
              }}
            >
              <iframe
                src={aulaAtual?.videoUrl}
                loading="lazy"
                style={{
                  border: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  paddingRight: "24px",
                }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Conteúdo da Aula */}
            <div className="p-6 space-y-6">
              {/* Título e Descrição */}
              <div className="space-y-4">
                {isAdminMode && editandoConteudo ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título da Aula
                      </label>
                      <Input
                        value={tituloAula}
                        onChange={(e) => setTituloAula(e.target.value)}
                        className="text-lg font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição
                      </label>
                      <Textarea
                        value={descricaoAula}
                        onChange={(e) => setDescricaoAula(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSalvarConteudo} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditandoConteudo(false)}
                        size="sm"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {tituloAula}
                      </h1>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={anotacoesVisiveis ? "default" : "outline"}
                          size="sm"
          onClick={() => {
            setAnotacoesVisiveis(true);
            setIsAnotacaoDialogOpen(true);
          }}
          aria-expanded={anotacoesVisiveis}
                        >
                          <NotebookPen className="h-4 w-4 mr-2" />
                          Anotações
                        </Button>
                        {isAdminMode && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditandoConteudo(true)}
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {descricaoAula}
                    </p>
                  </div>
                )}
              </div>

              {/* Materiais da Aula */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Download className="h-5 w-5 mr-2" />
                      Materiais da Aula
                    </CardTitle>
                    {isAdminMode && (
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Material
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aulaAtual.arquivos && aulaAtual.arquivos.length > 0 ? (
                      aulaAtual.arquivos.map((arquivo: any) => (
                        <div
                          key={arquivo.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">
                              {getFileIcon(arquivo.nome)}
                            </span>
                            <div>
                              <p className="font-medium text-gray-900">
                                {arquivo.nome}
                              </p>
                              <p className="text-sm text-gray-500">
                                Arquivo disponível
                              </p>
                            </div>
                          </div>
                          <BotaoBaixar arquivo={arquivo} />
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        Nenhum material disponível para esta aula.
                      </p>
                    )}

                    {/* Formulário para adicionar novo arquivo (Admin) */}
                    {isAdminMode && (
                      <div className="border-t pt-4 mt-4">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Adicionar Novo Material
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <Input
                            placeholder="Nome do arquivo"
                            value={novoArquivo.nome}
                            onChange={(e) =>
                              setNovoArquivo({
                                ...novoArquivo,
                                nome: e.target.value,
                              })
                            }
                          />
                          <Input
                            placeholder="Tipo (pdf, excel, word)"
                            value={novoArquivo.tipo}
                            onChange={(e) =>
                              setNovoArquivo({
                                ...novoArquivo,
                                tipo: e.target.value,
                              })
                            }
                          />
                          <Input
                            placeholder="Tamanho (ex: 2.5 MB)"
                            value={novoArquivo.tamanho}
                            onChange={(e) =>
                              setNovoArquivo({
                                ...novoArquivo,
                                tamanho: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button onClick={handleAdicionarArquivo} size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Adicionar Arquivo
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Anotações da Aula */}
              <Collapsible
                open={anotacoesVisiveis}
                onOpenChange={setAnotacoesVisiveis}
              >
                <CollapsibleContent className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <NotebookPen className="h-5 w-5 mr-2" />
                          Minhas anotações
                        </CardTitle>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setNovaAnotacao({ titulo: "", conteudo: "" });
                            setIsAnotacaoDialogOpen(true);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Nova anotação
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Guarde os principais pontos desta aula.
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {carregandoAnotacoes ? (
                        <div className="flex justify-center py-6">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                        </div>
                      ) : anotacoes.length > 0 ? (
                        anotacoes.map((anotacao) => {
                          const dataReferencia =
                            anotacao.dataCriacao ||
                            anotacao.createdAt ||
                            anotacao.updatedAt;

                          return (
                            <div
                              key={anotacao.id}
                              className="border rounded-md p-3 bg-gray-50"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    {anotacao.titulo}
                                  </h4>
                                  {dataReferencia && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      {formatarDataAnotacao(
                                        dataReferencia as string
                                      )}
                                    </p>
                                  )}
                                </div>
                                {anotacao.aula?.titulo && (
                                  <span className="text-xs text-gray-500">
                                    {anotacao.aula.titulo}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-700 whitespace-pre-line mt-3">
                                {anotacao.conteudo}
                              </p>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">
                          Nenhuma anotação registrada para esta aula.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Sidebar das Aulas */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">
                {cursoData.titulo}
              </h2>
              <p className="text-sm text-gray-500">
                por {instrutor?.nome || "Instrutor não informado"}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {cursoData.cursoModulos?.map((cursoModulo: any) => {
                const modulo = cursoModulo.modulo;
                if (!modulo) return null;

                return (
                  <Collapsible
                    key={modulo.id}
                    open={modulosAbertos.includes(modulo.id)}
                    onOpenChange={() => toggleModulo(modulo.id)}
                  >
                    <CollapsibleTrigger className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {modulo.titulo}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {modulo.aulaModulos?.length || 0} aulas
                          </p>
                        </div>
                        {modulosAbertos.includes(modulo.id) ? (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="bg-gray-50">
                        {modulo.aulaModulos?.map((aulaModulo: any) => {
                          const aula = aulaModulo.aula;
                          if (!aula) return null;

                          return (
                            <Link
                              key={aula.id}
                              href={`/curso/${cursoData.id}/aula/${aula.id}`}
                              className={cn(
                                "block p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors",
                                aula.id === aulaAtual.id &&
                                  "bg-blue-50 border-l-4 border-l-blue-500"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center flex-1">
                                  <PlayCircle className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm text-gray-900 truncate">
                                      {aula.titulo}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>
                                        {aula.duracao ||
                                          "Duração não informada"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Dialog de nova anotação */}
      <Dialog
        open={isAnotacaoDialogOpen}
        onOpenChange={(open) => {
          setIsAnotacaoDialogOpen(open);
          if (!open) {
            setSalvandoAnotacao(false);
            setNovaAnotacao({ titulo: "", conteudo: "" });
          }
        }}
      >
        <DialogContent className="sm:max-w-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90 data-[state=open]:slide-in-from-top-8">
          <DialogHeader>
            <DialogTitle>Nova anotação</DialogTitle>
            <DialogDescription>
              Registre seus principais aprendizados desta aula.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Título da anotação"
              value={novaAnotacao.titulo}
              onChange={(e) =>
                setNovaAnotacao((prev) => ({
                  ...prev,
                  titulo: e.target.value,
                }))
              }
            />
            <Textarea
              placeholder="Escreva os destaques desta aula"
              value={novaAnotacao.conteudo}
              onChange={(e) =>
                setNovaAnotacao((prev) => ({
                  ...prev,
                  conteudo: e.target.value,
                }))
              }
              rows={5}
            />
          </div>
          <DialogFooter className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsAnotacaoDialogOpen(false);
                setNovaAnotacao({ titulo: "", conteudo: "" });
              }}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSalvarAnotacao}
              disabled={salvandoAnotacao}
            >
              {salvandoAnotacao ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Salvando...
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar anotação
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Configurações */}
      <UserSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Modal de Configurações Admin */}
      <AdminConfigModal
        isOpen={isAdminConfigOpen}
        onClose={() => setIsAdminConfigOpen(false)}
      />
    </div>
  );
}
