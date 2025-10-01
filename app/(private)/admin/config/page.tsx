"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Book, Video, CreditCard, Users } from "lucide-react";
import { CourseManagementTabs } from "@/components/admin/course-management/aulas/CourseManagementTabs";
import { StreamingPlatforms } from "@/components/admin/streaming/StreamingPlatforms";
import { PaymentWebhooks } from "@/components/admin/payments/PaymentWebhooks";
import { StudentManagement } from "@/components/admin/students/StudentManagement";
import { useAdminData } from "@/components/hooks/admin/useAdminData";

export default function AdminConfigPage() {
  const [activeTab, setActiveTab] = useState("course-management");
  const adminData = useAdminData();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Configurações de Administrador
        </h1>
        <p className="text-muted-foreground mt-2">
          Gerencie cursos, streaming, pagamentos e alunos da plataforma.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="course-management">
            <Book className="h-4 w-4 mr-2" />
            Gerenciamento de Cursos
          </TabsTrigger>
          <TabsTrigger value="video-streaming">
            <Video className="h-4 w-4 mr-2" />
            Streaming de Vídeo
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard className="h-4 w-4 mr-2" />
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="student-management">
            <Users className="h-4 w-4 mr-2" />
            Gerenciamento de Alunos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="course-management" className="mt-6">
          <CourseManagementTabs {...adminData} />
        </TabsContent>

        <TabsContent value="video-streaming" className="mt-6">
          <StreamingPlatforms />
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <PaymentWebhooks />
        </TabsContent>

        <TabsContent value="student-management" className="mt-6">
          <StudentManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}