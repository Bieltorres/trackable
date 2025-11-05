// app/(private)/layout.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Providers } from "../providers";
import Sidebar from "@/components/layout/Sidebar";
import { HeaderMain } from "@/components/layout/HeaderMain";
import { Toaster } from "@/components/ui/toaster";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Home,
  BarChart3,
  FileText,
  MessageCircle,
  Shield,
  User,
  BookOpen,
  Heart,
} from "lucide-react";
import React from "react";
import { fetchFavoritos } from "@/store/slices/cursosSlice";
import { fetchUserProfile } from "@/store/slices/userSlice";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("PrivateLayout render");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { favoritos } = useAppSelector((state) => state.cursos);
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [layoutError, setLayoutError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    // Reset any layout errors when pathname changes
    setLayoutError(false);
  }, [pathname]);

  useEffect(() => {
    // Global error handler
    const handleError = (event: ErrorEvent) => {
      console.error("Global error:", event.error);
      setLayoutError(true);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      setLayoutError(true);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  useEffect(() => {
    if (mounted) {
      dispatch(fetchFavoritos());
      dispatch(fetchUserProfile());
    }
  }, [dispatch, mounted]);

  const isAdmin = mounted ? user?.role === "admin" : false;

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "Catalogo de Cursos", href: "/dashboard/cursos" },
    { icon: Heart, label: "Favoritos", href: "/favoritos" },
    { icon: BarChart3, label: "Progresso", href: "/progresso" },
    { icon: FileText, label: "Anotações", href: "/anotacoes" },
    { icon: MessageCircle, label: "Suporte", href: "/suporte" },
    {
      icon: Shield,
      label: "Admin Config",
      href: "/admin/config",
      isAdmin: true,
    },
  ];

  const currentMenuItem = menuItems.find((item) => item.href === pathname);
  const pageTitle = currentMenuItem?.label || "Área de Membros";

  const sidebarFavoritos = useMemo(
    () =>
      favoritos
        .map((fav) => ({
          id: fav.cursoId || fav.id,
          title: fav.curso?.titulo || "Curso favorito",
        }))
        .filter((fav) => fav.title && fav.title.trim().length > 0),
    [favoritos]
  );

  // Evita problemas de hidratação mostrando um loading inicial
  if (!mounted) {
    return (
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
    );
  }

  return (
    <Providers>
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          menuItems={menuItems}
          cursosFavoritos={sidebarFavoritos}
        />
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex flex-col min-h-screen w-full lg:ml-64">
          <HeaderMain
            title={pageTitle}
            isAdmin={isAdmin}
            onSidebarToggle={() => setSidebarOpen(true)}
          />

          <main className="w-full flex-grow min-h-0">
            {layoutError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h2 className="text-red-800 font-semibold mb-2">
                  Algo deu errado
                </h2>
                <p className="text-red-600">
                  Ocorreu um erro inesperado. O header foi mantido para
                  facilitar a navegação.
                </p>
                <button
                  onClick={() => setLayoutError(false)}
                  className="mt-3 mr-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Tentar novamente
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Recarregar página
                </button>
              </div>
            ) : (
              children
            )}
          </main>
        </div>
      </div>
      <Toaster />
    </Providers>
  );
}
