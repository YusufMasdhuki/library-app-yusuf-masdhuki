import { Book } from './book-type';

export interface RecommendBooksParams {
  limit?: number;
  by?: string;
  categoryId?: number;
}

export interface Author {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface RecommendBooksSuccessResponse {
  success: true;
  message: string;
  data: {
    mode: string;
    books: Book[];
  };
}

export interface RecommendBooksErrorResponse {
  success: false;
  message: string;
}
