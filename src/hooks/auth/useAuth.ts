// src/hooks/auth/useAuth.ts
import { useMutation } from '@tanstack/react-query';
import type {
  RegisterRequest,
  RegisterSuccessResponse,
  RegisterErrorResponse,
  LoginRequest,
  LoginSuccessResponse,
  LoginErrorResponse,
} from '@/types/auth-type';
import { loginUser, registerUser } from '@/services/auth/service';
import type { AxiosError } from 'axios';

// ✅ Hook Register
export const useRegister = () => {
  return useMutation<
    RegisterSuccessResponse, // success response
    AxiosError<RegisterErrorResponse>, // error response (dibungkus AxiosError)
    RegisterRequest // payload
  >({
    mutationFn: registerUser,
  });
};

// ✅ Hook Login
export const useLogin = () => {
  return useMutation<
    LoginSuccessResponse,
    AxiosError<LoginErrorResponse>,
    LoginRequest
  >({
    mutationFn: loginUser,
  });
};
