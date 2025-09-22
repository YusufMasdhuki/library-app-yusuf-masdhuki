// src/hooks/category/useCategory.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  GetCategoriesSuccessResponse,
  GetCategoriesErrorResponse,
} from '@/types/category-type';
import type {
  CreateCategoryRequest,
  CreateCategorySuccessResponse,
  CreateCategoryErrorResponse,
} from '@/types/create-category-type';
import type {
  UpdateCategoryRequest,
  UpdateCategorySuccessResponse,
  UpdateCategoryErrorResponse,
} from '@/types/update-category-type';
import type {
  DeleteCategorySuccessResponse,
  DeleteCategoryErrorResponse,
} from '@/types/delete-category-type';
import { categoryService } from '@/services/categories/service';

// ✅ Get all categories
export const useGetCategories = () =>
  useQuery<GetCategoriesSuccessResponse, GetCategoriesErrorResponse>({
    queryKey: ['categories'],
    queryFn: categoryService.getCategories,
  });

// ✅ Create category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateCategorySuccessResponse,
    CreateCategoryErrorResponse,
    CreateCategoryRequest
  >({
    mutationFn: categoryService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

// ✅ Update category
export const useUpdateCategory = (categoryId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateCategorySuccessResponse,
    UpdateCategoryErrorResponse,
    UpdateCategoryRequest
  >({
    mutationFn: (payload) =>
      categoryService.updateCategory(categoryId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

// ✅ Delete category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteCategorySuccessResponse,
    DeleteCategoryErrorResponse,
    number
  >({
    mutationFn: (id) => categoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
