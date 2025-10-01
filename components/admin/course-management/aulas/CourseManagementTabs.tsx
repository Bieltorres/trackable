// components/admin/course-management/CourseManagementTabs.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Folder, Play } from "lucide-react";
import { AulasTab } from "./AulasTab";
import { ModulosTab } from "../../modulos/ModulosTab";
import { CursosTab } from "../../cursos/CursosTabs";

interface CourseManagementTabsProps {
  aulas: any[];
  modulos: any[];
  cursos: any[];
  categorias: any[];
  instrutores: any[];
  setAulas: (aulas: any[]) => void;
  setModulos: (modulos: any[]) => void;
  setCursos: (cursos: any[]) => void;
  setCategorias: (categorias: any[]) => void;
  setInstrutores: (instrutores: any[]) => void;
  isLoading: boolean;
}

export function CourseManagementTabs(props: CourseManagementTabsProps) {
  const [activeTab, setActiveTab] = useState("cursos");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="cursos">
          <BookOpen className="h-4 w-4 mr-2" />
          Cursos
        </TabsTrigger>
        <TabsTrigger value="modulos">
          <Folder className="h-4 w-4 mr-2" />
          Módulos
        </TabsTrigger>
        <TabsTrigger value="aulas">
          <Play className="h-4 w-4 mr-2" />
          Aulas
        </TabsTrigger>
      </TabsList>

      <TabsContent value="cursos" className="mt-4">
        <CursosTab
          cursos={props.cursos}
          categorias={props.categorias}
          instrutores={props.instrutores}
          modulos={props.modulos}
          setCursos={props.setCursos}
          setCategorias={props.setCategorias}
          setInstrutores={props.setInstrutores}
          isLoading={props.isLoading}
        />
      </TabsContent>

      <TabsContent value="modulos" className="mt-4">
        <ModulosTab
          modulos={props.modulos}
          cursos={props.cursos}
          aulas={props.aulas}
          setModulos={props.setModulos}
          isLoading={props.isLoading}
        />
      </TabsContent>

      <TabsContent value="aulas" className="mt-4">
        <AulasTab
          aulas={props.aulas}
          modulos={props.modulos}
          setAulas={props.setAulas}
          isLoading={props.isLoading}
        />
      </TabsContent>
    </Tabs>
  );
}
