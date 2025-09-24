// hooks/reviews/useHasReviewed.ts

import { useGetMyReviews } from '../me/useMe';

export const useHasReviewed = (bookId: number) => {
  const { data, isLoading } = useGetMyReviews({ page: 1, limit: 100 });
  // ⚠️ sementara ambil 100 review max, bisa diganti infinite scroll

  const hasReviewed =
    data?.data.reviews.some((r) => r.bookId === bookId) ?? false;

  return { hasReviewed, isLoading };
};
