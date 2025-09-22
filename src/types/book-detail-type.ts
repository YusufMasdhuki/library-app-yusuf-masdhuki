export interface ReviewUser {
  id: number;
  name: string;
}

export interface Review {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
  user: ReviewUser;
}

export interface AuthorDetail {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryDetail {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookDetail {
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
  author: AuthorDetail;
  category: CategoryDetail;
  reviews: Review[];
}

export interface GetBookDetailSuccessResponse {
  success: true;
  message: string;
  data: BookDetail;
}

export interface GetBookDetailErrorResponse {
  success: false;
  message: string;
}
