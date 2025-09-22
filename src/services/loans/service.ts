import {
  CreateLoanErrorResponse,
  CreateLoanRequest,
  CreateLoanSuccessResponse,
  GetMyLoansErrorResponse,
  GetMyLoansSuccessResponse,
  ReturnLoanErrorResponse,
  ReturnLoanSuccessResponse,
} from '@/types/loan-type';
import { api } from '../api';
import { AxiosError } from 'axios';

export const loanService = {
  createLoan: async (
    payload: CreateLoanRequest
  ): Promise<CreateLoanSuccessResponse> => {
    try {
      const { data } = await api.post<CreateLoanSuccessResponse>(
        '/api/loans',
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<CreateLoanErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as CreateLoanErrorResponse;
    }
  },
  returnLoan: async (id: number): Promise<ReturnLoanSuccessResponse> => {
    try {
      const { data } = await api.patch<ReturnLoanSuccessResponse>(
        `/api/loans/${id}/return`
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<ReturnLoanErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as ReturnLoanErrorResponse;
    }
  },
  getMyLoans: async (): Promise<GetMyLoansSuccessResponse> => {
    try {
      const { data } = await api.get<GetMyLoansSuccessResponse>(
        '/api/loans/my'
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<GetMyLoansErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as GetMyLoansErrorResponse;
    }
  },
};
