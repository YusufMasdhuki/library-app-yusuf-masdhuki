// src/hooks/me/useMe.ts
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  InfiniteData,
} from '@tanstack/react-query';
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
export const useGetMyLoansInfinite = (
  params?: Omit<GetMyLoansParams, 'page'>
) =>
  useInfiniteQuery<
    GetMyLoansSuccessResponse, // TQueryFnData
    GetMyLoansErrorResponse, // TError
    InfiniteData<GetMyLoansSuccessResponse>, // TData (default sama aja)
    [string, typeof params], // TQueryKey
    number // TPageParam
  >({
    queryKey: ['myLoansInfinite', params],
    queryFn: ({ pageParam = 1 }) =>
      meService.getMyLoans({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

// ✅ Get current user's reviews
export const useGetMyReviewsInfinite = (
  params?: Omit<GetMyReviewsParams, 'page'>
) =>
  useInfiniteQuery<
    GetMyReviewsSuccessResponse, // TQueryFnData
    GetMyReviewsErrorResponse, // TError
    InfiniteData<GetMyReviewsSuccessResponse>, // TData
    [string, typeof params], // TQueryKey
    number // TPageParam
  >({
    queryKey: ['myReviewsInfinite', params],
    queryFn: ({ pageParam = 1 }) =>
      meService.getMyReviews({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
