import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Folder, Play } from "lucide-react";
import { AulasTab } from "../course-management/aulas/AulasTab";
import { ModulosTab } from "../modulos/ModulosTab";
import { CursosTab } from "./CursosTabs";

export function CourseManagementTabs(props) {
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
        <CursosTab {...props} />
      </TabsContent>

      <TabsContent value="modulos" className="mt-4">
        <ModulosTab {...props} />
      </TabsContent>

      <TabsContent value="aulas" className="mt-4">
        <AulasTab {...props} />
      </TabsContent>
    </Tabs>
  );
}