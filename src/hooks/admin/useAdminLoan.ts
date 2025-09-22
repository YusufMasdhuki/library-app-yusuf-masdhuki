// src/hooks/admin/useAdminLoan.ts
import { adminLoanService } from '@/services/admin/service';
import type {
  CreateAdminLoanErrorResponse,
  CreateAdminLoanRequest,
  CreateAdminLoanSuccessResponse,
  UpdateAdminLoanErrorResponse,
  UpdateAdminLoanRequest,
  UpdateAdminLoanSuccessResponse,
} from '@/types/admin-loan-type';
import type {
  GetOverdueLoansErrorResponse,
  GetOverdueLoansSuccessResponse,
} from '@/types/overdue-loan-type';
import type {
  GetAdminOverviewErrorResponse,
  GetAdminOverviewSuccessResponse,
} from '@/types/overview-data-type';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

// ✅ Create Loan
export const useCreateAdminLoan = () => {
  return useMutation<
    CreateAdminLoanSuccessResponse,
    CreateAdminLoanErrorResponse,
    CreateAdminLoanRequest
  >({
    mutationFn: adminLoanService.createLoan,
  });
};

// ✅ Update Loan
export const useUpdateAdminLoan = (id: number) => {
  return useMutation<
    UpdateAdminLoanSuccessResponse,
    UpdateAdminLoanErrorResponse,
    UpdateAdminLoanRequest
  >({
    mutationFn: (payload) => adminLoanService.updateLoan(id, payload),
  });
};

// ✅ Get Overdue Loans

export const useGetOverdueLoansInfinite = (limit = 10) => {
  return useInfiniteQuery<
    GetOverdueLoansSuccessResponse,
    GetOverdueLoansErrorResponse,
    GetOverdueLoansSuccessResponse,
    [string, number],
    number
  >({
    queryKey: ['overdueLoans', limit],
    queryFn: ({ pageParam = 1 }) =>
      adminLoanService.getOverdueLoans({ page: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      const loansLength = lastPage.data.loans.length;
      const currentPage = lastPage.data.pagination?.page ?? 1;
      if (loansLength < limit) return undefined;
      return currentPage + 1;
    },
    initialPageParam: 1,
  });
};

// ✅ Get Admin Overview
export const useGetAdminOverview = () => {
  return useQuery<
    GetAdminOverviewSuccessResponse,
    GetAdminOverviewErrorResponse
  >({
    queryKey: ['adminOverview'],
    queryFn: () => adminLoanService.getOverview(),
  });
};
