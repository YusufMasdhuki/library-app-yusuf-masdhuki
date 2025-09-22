export interface AuthorBooksSuccessResponse {
  success: true;
  message: string;
  data: {
    author: {
      id: number;
      name: string;
      bio: string;
      createdAt: string;
      updatedAt: string;
    };
    books: {
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
    }[];
  };
}

export interface AuthorBooksErrorResponse {
  success: false;
  message: string;
}
