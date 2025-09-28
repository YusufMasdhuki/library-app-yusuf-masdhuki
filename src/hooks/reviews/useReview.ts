// src/hooks/review/useReview.ts
import { errorToast, successToast } from '@/lib/toast-helper';
import { reviewService } from '@/services/reviews/service';
import { GetMyReviewsSuccessResponse } from '@/types/me-review-type';
import type {
  CreateReviewErrorResponse,
  CreateReviewPayload,
  CreateReviewSuccessResponse,
  DeleteReviewErrorResponse,
  DeleteReviewSuccessResponse,
  GetBookReviewsErrorResponse,
  GetBookReviewsSuccessResponse,
} from '@/types/review-type';
import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

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

export const useDeleteReview = (bookId?: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteReviewSuccessResponse, // success
    DeleteReviewErrorResponse, // error
    number, // variables (reviewId)
    { prevData?: InfiniteData<GetMyReviewsSuccessResponse> } // context
  >({
    mutationFn: (reviewId) => reviewService.deleteReview(reviewId),

    onMutate: async (reviewId) => {
      // cancel semua query dengan key "myReviewsInfinite"
      await queryClient.cancelQueries({ queryKey: ['myReviewsInfinite'] });

      // ambil data lama
      const prevData = queryClient.getQueryData<
        InfiniteData<GetMyReviewsSuccessResponse>
      >(['myReviewsInfinite']);

      if (prevData) {
        // update optimistik: hapus review dari semua page
        queryClient.setQueryData<InfiniteData<GetMyReviewsSuccessResponse>>(
          ['myReviewsInfinite'],
          {
            ...prevData,
            pages: prevData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                reviews: page.data.reviews.filter((r) => r.id !== reviewId),
                pagination: {
                  ...page.data.pagination,
                  total: page.data.pagination.total - 1, // update total count
                },
              },
            })),
          }
        );
      }

      return { prevData };
    },

    onSuccess: () => {
      successToast('Review deleted successfully');
    },

    onError: (_err, _reviewId, ctx) => {
      // rollback kalau gagal
      if (ctx?.prevData) {
        queryClient.setQueryData(['myReviewsInfinite'], ctx.prevData);
      }
      errorToast('Failed to delete review');
    },

    onSettled: () => {
      // selalu refresh supaya data pasti sync
      queryClient.invalidateQueries({ queryKey: ['myReviewsInfinite'] });
      if (bookId) {
        queryClient.invalidateQueries({ queryKey: ['bookReviews', bookId] });
      }
    },
  });
};
