"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, Shield, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface HeaderProps {
  title?: string;
  isAdmin?: boolean;
  onSidebarToggle?: () => void;
}

export function HeaderMain({
  title = "Dashboard",
  isAdmin = false,
  onSidebarToggle,
}: HeaderProps) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state?.user?.user);

  if (!user) return null;

  const handleLogout: () => Promise<void> = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-4 lg:px-8 flex-shrink-0">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden mr-2"
          onClick={onSidebarToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-xl font-bold text-gray-900">{title}</h1>

          <Badge className="ml-3 bg-orange-100 text-orange-800">
            <Shield className="h-3 w-3 mr-1" />
            Modo {user?.role}
          </Badge>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
    </header>
  );
}
