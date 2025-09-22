export interface CreateBookRequest {
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string; // bisa url atau path
  authorId: number;
  categoryId: number;
  totalCopies: number;
  availableCopies: number;
}

export interface CreateBookSuccessResponse {
  success: true;
  message: string;
  data: {
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
  };
}

export interface CreateBookErrorResponse {
  success: false;
  message: string;
}
