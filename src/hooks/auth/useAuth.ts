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

// ✅ Hook Register
export const useRegister = () => {
  return useMutation<
    RegisterSuccessResponse, // success
    RegisterErrorResponse, // error
    RegisterRequest // payload
  >({
    mutationFn: registerUser,
  });
};

// ✅ Hook Login
export const useLogin = () => {
  return useMutation<
    LoginSuccessResponse, // success
    LoginErrorResponse, // error
    LoginRequest // payload
  >({
    mutationFn: loginUser,
  });
};
