// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { LoginSuccessResponse } from '@/types/auth-type';

interface AuthState {
  user: LoginSuccessResponse['data']['user'] | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Helper aman buat parse JSON
function safeJSONParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    console.warn('Failed to parse JSON from localStorage:', value);
    return null;
  }
}

const storedToken = localStorage.getItem('auth_token');
const storedUser = safeJSONParse<LoginSuccessResponse['data']['user']>(
  localStorage.getItem('auth_user')
);

const initialState: AuthState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: LoginSuccessResponse['data']['user'];
        token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Simpan ke localStorage
      localStorage.setItem('auth_token', action.payload.token);
      localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
