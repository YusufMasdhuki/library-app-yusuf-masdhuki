export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCategoriesSuccessResponse {
  success: true;
  message: string;
  data: {
    categories: Category[];
  };
}

export interface GetCategoriesErrorResponse {
  success: false;
  message: string;
}
