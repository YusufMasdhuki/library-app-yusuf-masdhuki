// Request body
export interface CreateReviewPayload {
  bookId: number;
  star: number;
  comment: string;
}

// Review object
export interface Review {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
}

// Book stats
export interface BookStats {
  rating: number;
  reviewCount: number;
}

// Success response
export interface CreateReviewSuccessResponse {
  success: true;
  message: string;
  data: {
    review: Review;
    bookStats: BookStats;
  };
}

// Error response
export interface CreateReviewErrorResponse {
  success: false;
  message: string;
}

export interface ReviewUser {
  id: number;
  name: string;
}

export interface BookReview {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
  user: ReviewUser;
}

export interface ReviewPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BookReviewsData {
  bookId: number;
  reviews: BookReview[];
  pagination: ReviewPagination;
}

export interface GetBookReviewsSuccessResponse {
  success: true;
  message: string;
  data: BookReviewsData;
}

export interface GetBookReviewsErrorResponse {
  success: false;
  message: string;
}

export interface DeleteReviewSuccessResponse {
  success: true;
  message: string;
}

export interface DeleteReviewErrorResponse {
  success: false;
  message: string;
}
