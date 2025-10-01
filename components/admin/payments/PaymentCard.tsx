// components/admin/payments/PaymentCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

type PaymentPlatform = "stripe" | "ticto";

interface PaymentCardProps {
  platform: PaymentPlatform;
  isConnected: boolean;
  onClick: () => void;
}

export function PaymentCard({
  platform,
  isConnected,
  onClick,
}: PaymentCardProps) {
  const getPlatformInfo = () => {
    switch (platform) {
      case "stripe":
        return {
          image: "/images/payments/stripe-logo.png",
          name: "Stripe",
          width: 100,
          height: 40,
        };
      case "ticto":
        return {
          image: "/images/payments/ticto-logo.png",
          name: "Ticto",
          width: 60,
          height: 60,
        };
    }
  };

  const info = getPlatformInfo();

  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all ${
        isConnected ? "border-green-500 ring-2 ring-green-500" : "border-dashed"
      }`}
    >
      <CardContent className="flex flex-col items-center justify-center p-6 gap-4 h-48">
        {platform === "ticto" ? (
          <div className="w-20 h-20 bg-black flex items-center justify-center rounded-lg">
            <Image
              src={info.image}
              alt={`${info.name} Logo`}
              width={info.width}
              height={info.height}
              className="object-contain"
            />
          </div>
        ) : (
          <Image
            src={info.image}
            alt={`${info.name} Logo`}
            width={info.width}
            height={info.height}
            className="object-contain"
          />
        )}
        <p className="font-semibold">{info.name}</p>
        {isConnected ? (
          <div className="flex items-center text-green-600 text-sm mt-auto">
            <CheckCircle className="h-4 w-4 mr-1" />
            Conectado
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mt-auto">
            Clique para conectar
          </p>
        )}
      </CardContent>
    </Card>
  );
}
