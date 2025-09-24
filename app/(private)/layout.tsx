// app/(private)/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Providers } from "../providers";
import Sidebar from "@/components/layout/Sidebar";
import { HeaderMain } from "@/components/layout/HeaderMain";
import { Toaster } from "@/components/ui/toaster";
import { useAppSelector } from "@/store/hooks";
import { Home, BarChart3, FileText, MessageCircle, Shield, User } from "lucide-react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAppSelector((state) => state.user);
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = mounted ? user?.role === "admin" : false;

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: BarChart3, label: "Progresso", href: "/progresso" },
    { icon: FileText, label: "Anotações", href: "/anotacoes" },
    { icon: MessageCircle, label: "Suporte", href: "/suporte" },
    { icon: Shield, label: "Admin Config", href: "#", isAdmin: true },
    { icon: User, label: "Configurações", href: "/perfil" },
  ];

  const currentMenuItem = menuItems.find(item => item.href === pathname);
  const pageTitle = currentMenuItem?.label || "Área de Membros";

  // Evita problemas de hidratação mostrando um loading inicial
  if (!mounted) {
    return (
      <html lang="pt-BR">
        <body>
          <Providers>
            <div className="min-h-screen bg-gray-50">
              <div className="animate-pulse">
                <div className="h-16 bg-white border-b"></div>
                <div className="p-6">
                  <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <Toaster />
          </Providers>
        </body>
      </html>
    );
  }

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
            title={pageTitle}
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
