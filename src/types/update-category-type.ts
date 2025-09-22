export interface UpdateCategoryRequest {
  name: string;
}

export interface UpdateCategorySuccessResponse {
  success: true;
  message: string;
  data: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UpdateCategoryErrorResponse {
  success: false;
  message: string;
}
