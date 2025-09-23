export interface User {
  id: string;
  email: string;
  name?: string | null;
  role: string;
  birthdate?: string | null;
  phone?: string | null;
  userInfo?: UserInfo | null;
}

export interface UserInfo {
  id: string;
  userId: string;
  bio?: string | null;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Categoria {
  id: string;
  nome: string;
  cor: string;
  icone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  thumbnail?: string | null;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  preco: number;
  precoOriginal?: number | null;
  desconto?: number | null;
  status: 'rascunho' | 'publicado' | 'arquivado';
  categoriaId: string;
  instrutorId: string;
  createdAt: Date;
  updatedAt: Date;
  categoria?: Categoria;
  instrutor?: User;
  modulos?: Modulo[];
  _count?: {
    usuarioCursos: number;
    avaliacoes: number;
  };
  mediaAvaliacoes?: number;
}

export interface Modulo {
  id: string;
  titulo: string;
  ordem: number;
  cursoId: string;
  createdAt: Date;
  updatedAt: Date;
  aulas?: Aula[];
}

export interface Aula {
  id: string;
  titulo: string;
  descricao?: string | null;
  videoUrl?: string | null;
  duracao?: string | null;
  ordem: number;
  moduloId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsuarioCurso {
  id: string;
  usuarioId: string;
  cursoId: string;
  status: 'nao-iniciado' | 'em-andamento' | 'concluido';
  progresso: number;
  dataInscricao: Date;
  dataConclusao?: Date | null;
  curso?: Curso;
  usuario?: User;
}

export interface Favorito {
  id: string;
  usuarioId: string;
  cursoId: string;
  createdAt: Date;
  curso?: Curso;
}

export interface Anotacao {
  id: string;
  titulo: string;
  conteudo: string;
  cor: string;
  corTexto: string;
  usuarioId: string;
  cursoId: string;
  createdAt: Date;
  updatedAt: Date;
  curso?: Curso;
}

export interface CursoAvaliacao {
  id: string;
  nota: number;
  comentario?: string | null;
  cursoId: string;
  usuarioId: string;
  createdAt: Date;
  updatedAt: Date;
  usuario?: User;
}

// Estados do Redux
export interface CursosState {
  cursos: Curso[];
  cursoAtual: Curso | null;
  favoritos: Favorito[];
  loading: boolean;
  error: string | null;
}

export interface UserState {
  user: User | null;
  meusCursos: UsuarioCurso[];
  anotacoes: Anotacao[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
