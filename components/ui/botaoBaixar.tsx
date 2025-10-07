import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function extractKeyFromS3Url(url: string) {
  // aceita https://bucket.s3.REGION.amazonaws.com/algum/caminho/arquivo.ext
  try {
    const u = new URL(url);
    return decodeURIComponent(u.pathname.replace(/^\/+/, "")); // tira a barra inicial
  } catch {
    return url; // se já vier só o key
  }
}

export function BotaoBaixar({
  arquivo,
}: {
  arquivo: { key?: string; url: string; nome: string };
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      // use o key salvo; se não tiver, extraia do URL salvo
      const key = arquivo.key ?? extractKeyFromS3Url(arquivo.url);

      const res = await fetch("/api/files/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, filename: arquivo.nome }),
      });

      if (!res.ok) {
        const t = await res.text();
        console.error("Falha ao gerar link de download:", t);
        return;
      }

      const { url } = await res.json(); // URL pré-assinada (expira em ~60s)
      // abre em nova aba (ou use window.location.href = url para mesma aba)
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={loading}
    >
      <Download className="h-4 w-4 mr-2" />
      {loading ? "Gerando..." : "Baixar"}
    </Button>
  );
}
