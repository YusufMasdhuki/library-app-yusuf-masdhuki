export interface UpdateBookRequest {
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string | null;
  authorId: number;
  categoryId: number;
  totalCopies: number;
  availableCopies: number;
}

export interface UpdateBookSuccessResponse {
  success: true;
  message: string; // "Updated successfully"
  data: {
    id: number;
    title: string;
    description: string;
    isbn: string;
    publishedYear: number;
    coverImage: string | null;
    totalCopies: number;
    availableCopies: number;
    authorId: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UpdateBookErrorResponse {
  success: false;
  message: string;
}
