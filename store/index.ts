import { configureStore } from '@reduxjs/toolkit';
import cursosReducer from './slices/cursosSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    cursos: cursosReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
