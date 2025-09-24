import {
  Curso,
  Favorito,
  UsuarioCurso,
  Anotacao,
  ApiResponse,
  PaginatedResponse,
  User,
} from "@/types";

const API_BASE_URL = "/api";

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Erro desconhecido" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Cursos
  async getCursos(params?: {
    categoria?: string;
    nivel?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Curso>> {
    const searchParams = new URLSearchParams();
    if (params?.categoria) searchParams.append("categoria", params.categoria);
    if (params?.nivel) searchParams.append("nivel", params.nivel);
    if (params?.search) searchParams.append("search", params.search);
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const query = searchParams.toString();
    return this.request<PaginatedResponse<Curso>>(
      `/cursos${query ? `?${query}` : ""}`
    );
  }

  async getCursoById(id: string): Promise<ApiResponse<Curso>> {
    return this.request<ApiResponse<Curso>>(`/cursos/${id}`);
  }

  // Favoritos
  async getFavoritos(): Promise<ApiResponse<Favorito[]>> {
    return this.request<ApiResponse<Favorito[]>>("/favoritos");
  }

  async toggleFavorito(
    cursoId: string
  ): Promise<ApiResponse<{ favorito: Favorito; action: "added" | "removed" }>> {
    return this.request<
      ApiResponse<{ favorito: Favorito; action: "added" | "removed" }>
    >("/favoritos", {
      method: "POST",
      body: JSON.stringify({ cursoId }),
    });
  }

  // Usuário
  async getUserProfile(): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>("/auth/me");
  }

  async getMeusCursos(): Promise<ApiResponse<UsuarioCurso[]>> {
    return this.request<ApiResponse<UsuarioCurso[]>>("/usuarios/meus-cursos");
  }

  // Anotações
  async getAnotacoes(): Promise<ApiResponse<Anotacao[]>> {
    return this.request<ApiResponse<Anotacao[]>>("/anotacoes");
  }

  async createAnotacao(data: {
    titulo: string;
    conteudo: string;
    cursoId: string;
    cor?: string;
    corTexto?: string;
  }): Promise<ApiResponse<Anotacao>> {
    return this.request<ApiResponse<Anotacao>>("/anotacoes", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Auth
  async login(credentials: {
    email: string;
    password: string;
  }): Promise<ApiResponse<{ user: any; token: string }>> {
    return this.request<ApiResponse<{ user: any; token: string }>>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify(credentials),
      }
    );
  }

  async logout(): Promise<ApiResponse<{ message: string }>> {
    return this.request<ApiResponse<{ message: string }>>("/auth/logout", {
      method: "POST",
    });
  }
}

export const apiService = new ApiService();
