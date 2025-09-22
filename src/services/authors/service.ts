import {
  GetAuthorsErrorResponse,
  GetAuthorsSuccessResponse,
} from '@/types/author-type';
import { AxiosError } from 'axios';
import { api } from '../api';
import {
  CreateAuthorErrorResponse,
  CreateAuthorRequest,
  CreateAuthorSuccessResponse,
} from '@/types/create-author-type';
import {
  AuthorBooksErrorResponse,
  AuthorBooksSuccessResponse,
} from '@/types/author-books-type';
import {
  UpdateAuthorErrorResponse,
  UpdateAuthorRequest,
  UpdateAuthorSuccessResponse,
} from '@/types/update-author-type';
import {
  DeleteAuthorErrorResponse,
  DeleteAuthorSuccessResponse,
} from '@/types/delete-author-type';

export const authorService = {
  getAuthors: async (): Promise<GetAuthorsSuccessResponse> => {
    try {
      const { data } = await api.get<GetAuthorsSuccessResponse>('/api/authors');
      return data;
    } catch (err) {
      const error = err as AxiosError<GetAuthorsErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as GetAuthorsErrorResponse;
    }
  },
  createAuthor: async (
    payload: CreateAuthorRequest
  ): Promise<CreateAuthorSuccessResponse> => {
    try {
      const { data } = await api.post<CreateAuthorSuccessResponse>(
        '/api/authors',
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<CreateAuthorErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as CreateAuthorErrorResponse;
    }
  },
  getAuthorBooks: async (id: number): Promise<AuthorBooksSuccessResponse> => {
    try {
      const { data } = await api.get<AuthorBooksSuccessResponse>(
        `/api/authors/${id}/books`
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<AuthorBooksErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as AuthorBooksErrorResponse;
    }
  },
  updateAuthor: async (
    id: number,
    payload: UpdateAuthorRequest
  ): Promise<UpdateAuthorSuccessResponse> => {
    try {
      const { data } = await api.put<UpdateAuthorSuccessResponse>(
        `/api/authors/${id}`,
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<UpdateAuthorErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as UpdateAuthorErrorResponse;
    }
  },
  deleteAuthor: async (id: number): Promise<DeleteAuthorSuccessResponse> => {
    try {
      const { data } = await api.delete<DeleteAuthorSuccessResponse>(
        `/api/authors/${id}`
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<DeleteAuthorErrorResponse>;
      if (error.response?.data) throw error.response.data;
      throw {
        success: false,
        message: error.message || 'Network error',
      } as DeleteAuthorErrorResponse;
    }
  },
};
