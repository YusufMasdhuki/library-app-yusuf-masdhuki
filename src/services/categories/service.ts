import {
  GetCategoriesErrorResponse,
  GetCategoriesSuccessResponse,
} from '@/types/category-type';
import { api } from '../api';
import { AxiosError } from 'axios';
import {
  CreateCategoryErrorResponse,
  CreateCategoryRequest,
  CreateCategorySuccessResponse,
} from '@/types/create-category-type';
import {
  UpdateCategoryErrorResponse,
  UpdateCategoryRequest,
  UpdateCategorySuccessResponse,
} from '@/types/update-category-type';
import {
  DeleteCategoryErrorResponse,
  DeleteCategorySuccessResponse,
} from '@/types/delete-category-type';

export const categoryService = {
  getCategories: async (): Promise<GetCategoriesSuccessResponse> => {
    try {
      const { data } = await api.get<GetCategoriesSuccessResponse>(
        '/api/categories'
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<GetCategoriesErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as GetCategoriesErrorResponse;
    }
  },
  createCategory: async (
    payload: CreateCategoryRequest
  ): Promise<CreateCategorySuccessResponse> => {
    try {
      const { data } = await api.post<CreateCategorySuccessResponse>(
        '/api/categories',
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<CreateCategoryErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as CreateCategoryErrorResponse;
    }
  },
  updateCategory: async (
    id: number,
    payload: UpdateCategoryRequest
  ): Promise<UpdateCategorySuccessResponse> => {
    try {
      const { data } = await api.put<UpdateCategorySuccessResponse>(
        `/api/categories/${id}`,
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<UpdateCategoryErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as UpdateCategoryErrorResponse;
    }
  },
  deleteCategory: async (
    id: number
  ): Promise<DeleteCategorySuccessResponse> => {
    try {
      const { data } = await api.delete<DeleteCategorySuccessResponse>(
        `/api/categories/${id}`
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<DeleteCategoryErrorResponse>;
      if (error.response?.data) throw error.response.data;

      throw {
        success: false,
        message: error.message || 'Network error',
      } as DeleteCategoryErrorResponse;
    }
  },
};
