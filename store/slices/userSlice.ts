import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UsuarioCurso, Anotacao, UserState } from '../../types';
import { apiService } from '../../services/api';

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async () => {
    return await apiService.getUserProfile();
  }
);

export const fetchMeusCursos = createAsyncThunk(
  'user/fetchMeusCursos',
  async () => {
    return await apiService.getMeusCursos();
  }
);

export const fetchMinhasAnotacoes = createAsyncThunk(
  'user/fetchMinhasAnotacoes',
  async () => {
    return await apiService.getAnotacoes();
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials: { email: string; password: string }) => {
    return await apiService.login(credentials);
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    return await apiService.logout();
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
