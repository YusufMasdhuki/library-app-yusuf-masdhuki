// src/hooks/review/useReview.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  CreateReviewPayload,
  CreateReviewSuccessResponse,
  CreateReviewErrorResponse,
  GetBookReviewsSuccessResponse,
  GetBookReviewsErrorResponse,
  DeleteReviewSuccessResponse,
  DeleteReviewErrorResponse,
} from '@/types/review-type';
import { reviewService } from '@/services/reviews/service';

// ✅ Get reviews for a book
export const useGetBookReviews = (
  bookId: number,
  page: number = 1,
  limit: number = 10
) =>
  useQuery<GetBookReviewsSuccessResponse, GetBookReviewsErrorResponse>({
    queryKey: ['bookReviews', bookId, page, limit],
    queryFn: () => reviewService.getBookReviews(bookId, page, limit),
  });

// ✅ Create a review
export const useCreateReview = (bookId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateReviewSuccessResponse,
    CreateReviewErrorResponse,
    CreateReviewPayload
  >({
    mutationFn: (payload: CreateReviewPayload) =>
      reviewService.createReview(payload),
    onSuccess: () => {
      // Refresh reviews for this book
      queryClient.invalidateQueries({ queryKey: ['bookReviews', bookId] });
    },
  });
};

// ✅ Delete a review
export const useDeleteReview = (bookId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteReviewSuccessResponse,
    DeleteReviewErrorResponse,
    number
  >({
    mutationFn: (reviewId: number) => reviewService.deleteReview(reviewId),
    onSuccess: () => {
      // Refresh reviews for this book
      queryClient.invalidateQueries({ queryKey: ['bookReviews', bookId] });
    },
  });
};
