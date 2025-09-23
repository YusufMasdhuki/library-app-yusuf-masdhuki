// src/hooks/me/useMe.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  GetMeSuccessResponse,
  GetMeErrorResponse,
  UpdateMeRequest,
  UpdateMeSuccessResponse,
  UpdateMeErrorResponse,
} from '@/types/me-type';
import type {
  GetMyLoansSuccessResponse,
  GetMyLoansErrorResponse,
  GetMyLoansParams,
} from '@/types/me-loan-type';
import type {
  GetMyReviewsSuccessResponse,
  GetMyReviewsErrorResponse,
  GetMyReviewsParams,
} from '@/types/me-review-type';
import { meService } from '@/services/me/service';

// ✅ Get current user info
export const useGetMe = (options?: { enabled?: boolean }) =>
  useQuery<GetMeSuccessResponse, GetMeErrorResponse>({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await meService.getMe();
      return res;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ Update current user info
export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateMeSuccessResponse,
    UpdateMeErrorResponse,
    UpdateMeRequest
  >({
    mutationFn: meService.updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
};

// ✅ Get current user's loans
export const useGetMyLoans = (params?: GetMyLoansParams) =>
  useQuery<GetMyLoansSuccessResponse, GetMyLoansErrorResponse>({
    queryKey: ['myLoans', params],
    queryFn: () => meService.getMyLoans(params),
  });

// ✅ Get current user's reviews
export const useGetMyReviews = (params?: GetMyReviewsParams) =>
  useQuery<GetMyReviewsSuccessResponse, GetMyReviewsErrorResponse>({
    queryKey: ['myReviews', params],
    queryFn: () => meService.getMyReviews(params),
  });
