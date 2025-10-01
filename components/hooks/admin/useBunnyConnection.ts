// hooks/admin/useBunnyConnection.ts
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function useBunnyConnection() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSave = () => {
    if (apiKey.trim()) {
      setIsConnected(true);
      toast({
        title: "Sucesso",
        description: "Bunny.net conectado com sucesso!",
      });
      console.log("Bunny API Key saved:", apiKey);
    }
    setDialogOpen(false);
  };

  return {
    apiKey,
    setApiKey,
    isConnected,
    dialogOpen,
    setDialogOpen,
    handleSave,
  };
}
