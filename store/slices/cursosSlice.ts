import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Curso, Favorito, CursosState, ApiResponse, PaginatedResponse } from '../../types';
import { apiService } from '../../services/api';

// Async thunks
export const fetchCursos = createAsyncThunk(
  'cursos/fetchCursos',
  async (params?: { categoria?: string; nivel?: string; search?: string; page?: number; limit?: number }) => {
    return await apiService.getCursos(params);
  }
);

export const fetchCursoById = createAsyncThunk(
  'cursos/fetchCursoById',
  async (id: string) => {
    return await apiService.getCursoById(id);
  }
);

export const fetchFavoritos = createAsyncThunk(
  'cursos/fetchFavoritos',
  async () => {
    return await apiService.getFavoritos();
  }
);

export const toggleFavorito = createAsyncThunk(
  'cursos/toggleFavorito',
  async (cursoId: string) => {
    return await apiService.toggleFavorito(cursoId);
  }
);

const initialState: CursosState = {
  cursos: [],
  cursoAtual: null,
  favoritos: [],
  loading: false,
  error: null,
};

const cursosSlice = createSlice({
  name: 'cursos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCursoAtual: (state) => {
      state.cursoAtual = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cursos
      .addCase(fetchCursos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCursos.fulfilled, (state, action) => {
        state.loading = false;
        state.cursos = action.payload.data || action.payload;
      })
      .addCase(fetchCursos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar cursos';
      })
      // Fetch curso by ID
      .addCase(fetchCursoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCursoById.fulfilled, (state, action) => {
        state.loading = false;
        state.cursoAtual = action.payload.data || action.payload;
      })
      .addCase(fetchCursoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar curso';
      })
      // Fetch favoritos
      .addCase(fetchFavoritos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavoritos.fulfilled, (state, action) => {
        state.loading = false;
        state.favoritos = action.payload.data || action.payload;
      })
      .addCase(fetchFavoritos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar favoritos';
      })
      // Toggle favorito
      .addCase(toggleFavorito.fulfilled, (state, action) => {
        const { favorito, action: favAction } = action.payload;
        if (favAction === 'added') {
          state.favoritos.push(favorito);
        } else {
          state.favoritos = state.favoritos.filter(f => f.id !== favorito.id);
        }
      });
  },
});

export const { clearError, clearCursoAtual } = cursosSlice.actions;
export default cursosSlice.reducer;
