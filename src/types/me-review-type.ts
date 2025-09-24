// Query params
export interface GetMyReviewsParams {
  page?: number;
  limit?: number;
}

// Review object
export interface MyReview {
  id: number;
  userId: number;
  bookId: number;
  star: number; // ganti dari rating -> star
  comment: string;
  createdAt: string;
  book: {
    id: number;
    title: string;
    coverImage: string | null;
  };
}

// Pagination
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Response types
export interface GetMyReviewsSuccessResponse {
  success: true;
  message: string;
  data: {
    reviews: MyReview[];
    pagination: Pagination;
  };
}

export interface GetMyReviewsErrorResponse {
  success: false;
  message: string;
}
