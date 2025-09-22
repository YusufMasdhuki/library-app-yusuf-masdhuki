import {
  LoginErrorResponse,
  LoginRequest,
  LoginSuccessResponse,
  RegisterErrorResponse,
  RegisterRequest,
  RegisterSuccessResponse,
} from '@/types/auth-type';
import { AxiosError } from 'axios';
import { api } from '../api';

// ✅ Register
export const registerUser = async (
  payload: RegisterRequest
): Promise<RegisterSuccessResponse> => {
  try {
    const { data } = await api.post<RegisterSuccessResponse>(
      '/api/auth/register',
      payload
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<RegisterErrorResponse>;
    if (error.response?.data) throw error.response.data;

    throw {
      success: false,
      message: error.message || 'Network error',
    } as RegisterErrorResponse;
  }
};

// ✅ Login
export const loginUser = async (
  payload: LoginRequest
): Promise<LoginSuccessResponse> => {
  try {
    const { data } = await api.post<LoginSuccessResponse>(
      '/api/auth/login',
      payload
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<LoginErrorResponse>;
    if (error.response?.data) throw error.response.data;

    throw {
      success: false,
      message: error.message || 'Network error',
    } as LoginErrorResponse;
  }
};
