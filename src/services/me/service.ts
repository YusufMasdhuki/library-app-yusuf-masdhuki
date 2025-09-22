import {
  GetMeErrorResponse,
  GetMeSuccessResponse,
  UpdateMeErrorResponse,
  UpdateMeRequest,
  UpdateMeSuccessResponse,
} from '@/types/me-type';
import { api } from '../api';
import { AxiosError } from 'axios';
import {
  GetMyLoansErrorResponse,
  GetMyLoansParams,
  GetMyLoansSuccessResponse,
} from '@/types/me-loan-type';
import {
  GetMyReviewsErrorResponse,
  GetMyReviewsParams,
  GetMyReviewsSuccessResponse,
} from '@/types/me-review-type';

export const meService = {
  getMe: async (): Promise<GetMeSuccessResponse> => {
    try {
      const { data } = await api.get<GetMeSuccessResponse>('/api/me');
      return data;
    } catch (err) {
      const error = err as AxiosError<GetMeErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as GetMeErrorResponse;
    }
  },
  updateMe: async (
    payload: UpdateMeRequest
  ): Promise<UpdateMeSuccessResponse> => {
    try {
      const { data } = await api.patch<UpdateMeSuccessResponse>(
        '/api/me',
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<UpdateMeErrorResponse>;
      if (error.response?.data) throw error.response.data;
      throw {
        success: false,
        message: error.message || 'Network error',
      } as UpdateMeErrorResponse;
    }
  },
  getMyLoans: async (
    params: GetMyLoansParams = {}
  ): Promise<GetMyLoansSuccessResponse> => {
    try {
      const { data } = await api.get<GetMyLoansSuccessResponse>(
        '/api/me/loans',
        { params }
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
  getMyReviews: async (
    params: GetMyReviewsParams = {}
  ): Promise<GetMyReviewsSuccessResponse> => {
    try {
      const { data } = await api.get<GetMyReviewsSuccessResponse>(
        '/api/me/reviews',
        { params }
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<GetMyReviewsErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as GetMyReviewsErrorResponse;
    }
  },
};
