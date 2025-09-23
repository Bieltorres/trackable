import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UsuarioCurso, Anotacao, UserState } from '../../types';

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async () => {
    const response = await fetch('/api/auth/me');
    if (!response.ok) {
      throw new Error('Erro ao buscar perfil do usuário');
    }
    return response.json();
  }
);

export const fetchMeusCursos = createAsyncThunk(
  'user/fetchMeusCursos',
  async () => {
    const response = await fetch('/api/usuarios/meus-cursos');
    if (!response.ok) {
      throw new Error('Erro ao buscar meus cursos');
    }
    return response.json();
  }
);

export const fetchMinhasAnotacoes = createAsyncThunk(
  'user/fetchMinhasAnotacoes',
  async () => {
    const response = await fetch('/api/anotacoes');
    if (!response.ok) {
      throw new Error('Erro ao buscar anotações');
    }
    return response.json();
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials: { email: string; password: string }) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao fazer login');
    }
    return response.json();
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Erro ao fazer logout');
    }
    return response.json();
  }
);

const initialState: UserState = {
  user: null,
  meusCursos: [],
  anotacoes: [],
  loading: false,
  error: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.meusCursos = [];
      state.anotacoes = [];
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data || action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar perfil';
        state.isAuthenticated = false;
      })
      // Fetch meus cursos
      .addCase(fetchMeusCursos.fulfilled, (state, action) => {
        state.meusCursos = action.payload.data || action.payload;
      })
      // Fetch minhas anotações
      .addCase(fetchMinhasAnotacoes.fulfilled, (state, action) => {
        state.anotacoes = action.payload.data || action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao fazer login';
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.meusCursos = [];
        state.anotacoes = [];
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, clearUser } = userSlice.actions;
export default userSlice.reducer;
