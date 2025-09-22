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

export interface Book {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string | null;
  rating: number;
  reviewCount: number;
  totalCopies: number;
  availableCopies: number;
  borrowCount: number;
  authorId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
  category: Category;
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
