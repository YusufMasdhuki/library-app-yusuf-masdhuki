import {
  CreateAdminLoanErrorResponse,
  CreateAdminLoanRequest,
  CreateAdminLoanSuccessResponse,
  UpdateAdminLoanErrorResponse,
  UpdateAdminLoanRequest,
  UpdateAdminLoanSuccessResponse,
} from '@/types/admin-loan-type';
import { api } from '../api';
import { AxiosError } from 'axios';
import {
  GetOverdueLoansErrorResponse,
  GetOverdueLoansParams,
  GetOverdueLoansSuccessResponse,
} from '@/types/overdue-loan-type';
import {
  GetAdminOverviewErrorResponse,
  GetAdminOverviewSuccessResponse,
} from '@/types/overview-data-type';

export const adminLoanService = {
  createLoan: async (
    payload: CreateAdminLoanRequest
  ): Promise<CreateAdminLoanSuccessResponse> => {
    try {
      const { data } = await api.post<CreateAdminLoanSuccessResponse>(
        '/api/admin/loans',
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<CreateAdminLoanErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as CreateAdminLoanErrorResponse;
    }
  },
  updateLoan: async (
    id: number,
    payload: UpdateAdminLoanRequest
  ): Promise<UpdateAdminLoanSuccessResponse> => {
    try {
      const { data } = await api.patch<UpdateAdminLoanSuccessResponse>(
        `/api/admin/loans/${id}`,
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<UpdateAdminLoanErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as UpdateAdminLoanErrorResponse;
    }
  },
  getOverdueLoans: async (
    params: GetOverdueLoansParams = {}
  ): Promise<GetOverdueLoansSuccessResponse> => {
    try {
      const { data } = await api.get<GetOverdueLoansSuccessResponse>(
        '/api/admin/loans/overdue',
        { params }
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<GetOverdueLoansErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as GetOverdueLoansErrorResponse;
    }
  },
  getOverview: async (): Promise<GetAdminOverviewSuccessResponse> => {
    try {
      const { data } = await api.get<GetAdminOverviewSuccessResponse>(
        '/api/admin/overview'
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<GetAdminOverviewErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as GetAdminOverviewErrorResponse;
    }
  },
};
