"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export interface MenuItem {
  label: string;
  href: string;
  icon?: React.ElementType;
  isAdmin?: boolean;
}

interface Favorito {
  id: string | number;
  title: string;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  cursosFavoritos?: Favorito[];
  onMenuItemClick?: (item: MenuItem) => void;
}

export default function Sidebar({
  open,
  onClose,
  menuItems,
  cursosFavoritos = [],
  onMenuItemClick,
}: SidebarProps) {
  const user = useSelector((state: RootState) => state.user.user);
  const pathname = usePathname();

  // Helper para verificar se a rota está ativa
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside
      aria-label="Sidebar"
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col",
        open ? "translate-x-0" : "-translate-x-full"
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Topo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700 flex-shrink-0">
        <div className="flex items-center gap-5">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold">TrackAble</span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden text-white"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Conteúdo com scroll */}
      <div className="px-4 py-6 overflow-y-auto h-[calc(100vh-4rem)]">
        {/* Menu Principal */}
        <nav className="space-y-2" aria-label="Main menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const activeClasses =
              "bg-blue-600 text-white shadow-lg shadow-blue-600/25";
            const normalClasses =
              "text-slate-300 hover:bg-slate-800 hover:text-white hover:shadow-md";

            if (item.isAdmin) {
              if (user?.role !== "admin") return null;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                    active ? activeClasses : normalClasses
                  )}
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        "h-5 w-5 mr-3",
                        active ? "text-white" : "text-slate-400"
                      )}
                    />
                  )}
                  {item.label}
                  <Badge className="ml-auto bg-orange-500 text-white text-xs">
                    ADMIN
                  </Badge>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                  active ? activeClasses : normalClasses
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      "h-5 w-5 mr-3",
                      active ? "text-white" : "text-slate-400"
                    )}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Cursos Favoritos */}
        {cursosFavoritos.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center px-1 mb-3 text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Cursos Favoritos
              </span>
            </div>

            <ul className="space-y-1">
              {cursosFavoritos.map((curso) => {
                const cursoActive = pathname === `/curso/${curso.id}`;
                return (
                  <li key={curso.id}>
                    <Link
                      href={`/curso/${curso.id}`}
                      onClick={onClose}
                      className={cn(
                        "w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150",
                        cursoActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      )}
                      title={curso.title}
                    >
                      <span className="h-2 w-2 bg-red-400 rounded-full mr-3 flex-shrink-0" />
                      <span className="truncate">{curso.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Perfil / Bottom */}
      <div className="border-t border-slate-700 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center mr-3">
              <svg
                className="h-4 w-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zM4 20c0-3.3 4-5 8-5s8 1.7 8 5v1H4v-1z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
          </div>

          <Link
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            href="/perfil"
            aria-label="Configurações"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
