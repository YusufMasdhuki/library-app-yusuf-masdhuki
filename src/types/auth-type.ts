// Register
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterSuccessResponse {
  success: true;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
  };
}

export interface RegisterErrorResponse {
  success: false;
  message: string;
}

// Login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
  };
}

export interface LoginErrorResponse {
  success: false;
  message: string;
}
