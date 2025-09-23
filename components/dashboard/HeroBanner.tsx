import { TrendingUp, Award, BookOpen, Shield } from "lucide-react";

interface HeroBannerProps {
  userName: string;
  cursosEmAndamento: number;
  cursosConcluidos: number;
  isAdmin?: boolean;
  loading?: boolean;
}

export function HeroBanner({ 
  userName, 
  cursosEmAndamento, 
  cursosConcluidos, 
  isAdmin = false,
  loading = false
}: HeroBannerProps) {
  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-8 bg-white/20 rounded mb-2 w-64 animate-pulse"></div>
            <div className="h-4 bg-white/20 rounded mb-4 w-80 animate-pulse"></div>
            <div className="flex items-center gap-4">
              <div className="h-4 bg-white/20 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-white/20 rounded w-28 animate-pulse"></div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Bem-vindo de volta, {userName}!
          </h2>
          <p className="text-blue-100 mb-4">
            Continue seu aprendizado e alcance seus objetivos
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>{cursosEmAndamento} {cursosEmAndamento === 1 ? 'curso' : 'cursos'} em andamento</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>{cursosConcluidos} {cursosConcluidos === 1 ? 'curso concluído' : 'cursos concluídos'}</span>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Acesso administrativo</span>
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:block">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
