import {
  CreateReviewErrorResponse,
  CreateReviewPayload,
  CreateReviewSuccessResponse,
  DeleteReviewErrorResponse,
  DeleteReviewSuccessResponse,
  GetBookReviewsErrorResponse,
  GetBookReviewsSuccessResponse,
} from '@/types/review-type';
import { AxiosError } from 'axios';
import { api } from '../api';

export const reviewService = {
  createReview: async (
    payload: CreateReviewPayload
  ): Promise<CreateReviewSuccessResponse> => {
    try {
      const { data } = await api.post<CreateReviewSuccessResponse>(
        '/api/reviews',
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<CreateReviewErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as CreateReviewErrorResponse;
    }
  },
  getBookReviews: async (
    bookId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<GetBookReviewsSuccessResponse> => {
    try {
      const { data } = await api.get<GetBookReviewsSuccessResponse>(
        `/api/reviews/book/${bookId}`,
        { params: { page, limit } }
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<GetBookReviewsErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as GetBookReviewsErrorResponse;
    }
  },
  deleteReview: async (id: number): Promise<DeleteReviewSuccessResponse> => {
    try {
      const { data } = await api.delete<DeleteReviewSuccessResponse>(
        `/api/reviews/${id}`
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<DeleteReviewErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as DeleteReviewErrorResponse;
    }
  },
};
