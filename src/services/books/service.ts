import {
  GetBooksErrorResponse,
  GetBooksParams,
  GetBooksSuccessResponse,
} from '@/types/book-type';
import { AxiosError } from 'axios';
import { api } from '../api';
import {
  CreateBookErrorResponse,
  CreateBookRequest,
  CreateBookSuccessResponse,
} from '@/types/create-book-type';
import {
  RecommendBooksErrorResponse,
  RecommendBooksParams,
  RecommendBooksSuccessResponse,
} from '@/types/recommend-book-type';
import {
  GetBookDetailErrorResponse,
  GetBookDetailSuccessResponse,
} from '@/types/book-detail-type';
import {
  UpdateBookErrorResponse,
  UpdateBookRequest,
  UpdateBookSuccessResponse,
} from '@/types/update-book-type';
import {
  DeleteBookErrorResponse,
  DeleteBookSuccessResponse,
} from '@/types/delete-book-type';

export const bookService = {
  getBooks: async (
    params: GetBooksParams = {}
  ): Promise<GetBooksSuccessResponse> => {
    try {
      const { data } = await api.get<GetBooksSuccessResponse>('/api/books', {
        params,
      });
      return data;
    } catch (err) {
      const error = err as AxiosError<GetBooksErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as GetBooksErrorResponse;
    }
  },
  createBook: async (
    payload: CreateBookRequest
  ): Promise<CreateBookSuccessResponse> => {
    try {
      const { data } = await api.post<CreateBookSuccessResponse>(
        '/api/books',
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<CreateBookErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as CreateBookErrorResponse;
    }
  },
  getRecommendedBooks: async (
    params: RecommendBooksParams = {}
  ): Promise<RecommendBooksSuccessResponse> => {
    try {
      const { data } = await api.get<RecommendBooksSuccessResponse>(
        '/api/books/recommend',
        { params }
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<RecommendBooksErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as RecommendBooksErrorResponse;
    }
  },
  getBookDetail: async (id: number): Promise<GetBookDetailSuccessResponse> => {
    try {
      const { data } = await api.get<GetBookDetailSuccessResponse>(
        `/api/books/${id}`
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<GetBookDetailErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as GetBookDetailErrorResponse;
    }
  },
  updateBook: async (
    id: number,
    payload: UpdateBookRequest
  ): Promise<UpdateBookSuccessResponse> => {
    try {
      const { data } = await api.put<UpdateBookSuccessResponse>(
        `/api/books/${id}`,
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<UpdateBookErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as UpdateBookErrorResponse;
    }
  },
  deleteBook: async (id: number): Promise<DeleteBookSuccessResponse> => {
    try {
      const { data } = await api.delete<DeleteBookSuccessResponse>(
        `/api/books/${id}`
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<DeleteBookErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as DeleteBookErrorResponse;
    }
  },
};
