export interface GetBooksParams {
  q?: string;
  categoryId?: number;
  authorId?: number;
  page?: number;
  limit?: number;
}

export interface Author {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
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

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetBooksSuccessResponse {
  success: true;
  message: string;
  data: {
    books: Book[];
    pagination: Pagination;
  };
}

export interface GetBooksErrorResponse {
  success: false;
  message: string;
}
