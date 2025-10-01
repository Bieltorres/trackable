// components/admin/streaming/StreamingPlatforms.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BunnyCard } from "./BunnyCard";
import { BunnyDialog } from "../dialogs/BunnyDialog";
import { useBunnyConnection } from "@/components/hooks/admin/useBunnyConnection";

export function StreamingPlatforms() {
  const bunny = useBunnyConnection();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Plataformas de Streaming</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BunnyCard
          isConnected={bunny.isConnected}
          onClick={() => bunny.setDialogOpen(true)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plataformas Selecionadas</CardTitle>
        </CardHeader>
        <CardContent>
          {bunny.isConnected ? (
            <p>Bunny.net</p>
          ) : (
            <p className="text-muted-foreground">
              Nenhuma plataforma conectada ainda.
            </p>
          )}
        </CardContent>
      </Card>

      <BunnyDialog
        open={bunny.dialogOpen}
        apiKey={bunny.apiKey}
        onOpenChange={bunny.setDialogOpen}
        onApiKeyChange={bunny.setApiKey}
        onSave={bunny.handleSave}
      />
    </div>
  );
}
