// src/hooks/loan/useLoan.ts
import { errorToast, successToast } from '@/lib/toast-helper';
import { loanService } from '@/services/loans/service';
import type {
  CreateLoanErrorResponse,
  CreateLoanRequest,
  CreateLoanSuccessResponse,
  GetMyLoansErrorResponse,
  GetMyLoansSuccessResponse,
  ReturnLoanErrorResponse,
  ReturnLoanSuccessResponse,
} from '@/types/loan-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
      queryClient.invalidateQueries({ queryKey: ['myLoansInfinite'] });
      successToast('Loan returned successfully');
    },
    onError: () => {
      errorToast('Failed to return loan');
    },
  });
};
