// app/(private)/layout.tsx
"use client";

import { useState } from "react";
import { Providers } from "../providers";
import Sidebar from "@/components/layout/Sidebar";
import { HeaderMain } from "@/components/layout/HeaderMain";
import { Toaster } from "@/components/ui/toaster";
import { useAppSelector } from "@/store/hooks";
import { Home, BarChart3, FileText, MessageCircle, Shield } from "lucide-react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAppSelector((state) => state.user);
  const isAdmin = user?.role === "admin";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: BarChart3, label: "Progresso", href: "/progresso" },
    { icon: FileText, label: "Anotações", href: "/anotacoes" },
    { icon: MessageCircle, label: "Suporte", href: "/suporte" },
    { icon: Shield, label: "Admin Config", href: "#", isAdmin: true },
  ];

  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            menuItems={menuItems}
          />
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <HeaderMain
            title="Área de Membros"
            isAdmin={isAdmin}
            onSidebarToggle={() => setSidebarOpen(true)}
          />

          <main className="p-6">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
