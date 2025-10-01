// components/admin/streaming/BunnyCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

interface BunnyCardProps {
  isConnected: boolean;
  onClick: () => void;
}

export function BunnyCard({ isConnected, onClick }: BunnyCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all ${
        isConnected ? "border-green-500 ring-2 ring-green-500" : "border-dashed"
      }`}
    >
      <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
        <Image
          src="/images/bunny/icon128x128.png"
          alt="Bunny.net Logo"
          width={64}
          height={64}
        />
        <p className="font-semibold">Bunny.net</p>
        {isConnected ? (
          <div className="flex items-center text-green-600 text-sm">
            <CheckCircle className="h-4 w-4 mr-1" />
            Conectado
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Clique para conectar</p>
        )}
      </CardContent>
    </Card>
  );
}
