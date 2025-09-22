export interface CreateCategoryRequest {
  name: string;
}

export interface CreateCategorySuccessResponse {
  success: true;
  message: string;
  data: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CreateCategoryErrorResponse {
  success: false;
  message: string;
}
