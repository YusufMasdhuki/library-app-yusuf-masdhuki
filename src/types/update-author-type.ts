export interface UpdateAuthorRequest {
  name: string;
  bio: string;
}

export interface UpdateAuthorSuccessResponse {
  success: true;
  message: string;
  data: {
    id: number;
    name: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UpdateAuthorErrorResponse {
  success: false;
  message: string;
}
