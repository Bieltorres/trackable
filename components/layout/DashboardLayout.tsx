// components/layout/DashboardLayout.tsx (client)
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { HeaderMain } from "@/components/layout/HeaderMain";
import { BarChart3, FileText, Home, MessageCircle, Shield } from "lucide-react";
import { usePathname } from "next/navigation";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
    { icon: BarChart3, label: "Progresso", href: "/progresso" },
    { icon: FileText, label: "Anotações", href: "/anotacoes" },
    { icon: MessageCircle, label: "Suporte", href: "/suporte" },
    { icon: Shield, label: "Admin Config", href: "#", isAdmin: true },
  ];

  const pathname = usePathname();
  const isPublicRoute = ["/login", "/recuperar-senha"].includes(pathname);

  if (isPublicRoute) {
    return <>{children}</>; // sem sidebar/header
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        menuItems={menuItems}
      />

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1">
        <HeaderMain
          title="Dashboard"
          onSidebarToggle={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
