// src/hooks/loan/useLoan.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  GetMyLoansSuccessResponse,
  GetMyLoansErrorResponse,
  CreateLoanRequest,
  CreateLoanSuccessResponse,
  CreateLoanErrorResponse,
  ReturnLoanSuccessResponse,
  ReturnLoanErrorResponse,
} from '@/types/loan-type';
import { loanService } from '@/services/loans/service';

// ✅ Get my loans
export const useGetMyLoans = () =>
  useQuery<GetMyLoansSuccessResponse, GetMyLoansErrorResponse>({
    queryKey: ['myLoans'],
    queryFn: loanService.getMyLoans,
  });

// ✅ Create a new loan
export const useCreateLoan = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateLoanSuccessResponse,
    CreateLoanErrorResponse,
    CreateLoanRequest
  >({
    mutationFn: loanService.createLoan,
    onSuccess: () => {
      // Refresh user's loans after creating
      queryClient.invalidateQueries({ queryKey: ['myLoans'] });
    },
  });
};

// ✅ Return a loan
export const useReturnLoan = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ReturnLoanSuccessResponse,
    ReturnLoanErrorResponse,
    number
  >({
    mutationFn: (id: number) => loanService.returnLoan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myLoans'] });
    },
  });
};
