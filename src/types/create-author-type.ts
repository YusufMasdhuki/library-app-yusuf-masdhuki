export interface CreateAuthorRequest {
  name: string;
  bio: string;
}

export interface CreateAuthorSuccessResponse {
  success: true;
  message: string; // "Created"
  data: {
    id: number;
    name: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CreateAuthorErrorResponse {
  success: false;
  message: string;
}
