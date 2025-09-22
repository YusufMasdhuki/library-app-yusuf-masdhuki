// src/hooks/book/useBook.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  GetBooksSuccessResponse,
  GetBooksErrorResponse,
  GetBooksParams,
} from '@/types/book-type';
import type {
  GetBookDetailSuccessResponse,
  GetBookDetailErrorResponse,
} from '@/types/book-detail-type';
import type {
  RecommendBooksSuccessResponse,
  RecommendBooksErrorResponse,
  RecommendBooksParams,
} from '@/types/recommend-book-type';
import type {
  CreateBookRequest,
  CreateBookSuccessResponse,
  CreateBookErrorResponse,
} from '@/types/create-book-type';
import type {
  UpdateBookRequest,
  UpdateBookSuccessResponse,
  UpdateBookErrorResponse,
} from '@/types/update-book-type';
import type {
  DeleteBookSuccessResponse,
  DeleteBookErrorResponse,
} from '@/types/delete-book-type';
import { bookService } from '@/services/books/service';

// ✅ Get all books
export const useGetBooks = (params?: GetBooksParams) =>
  useQuery<GetBooksSuccessResponse, GetBooksErrorResponse>({
    queryKey: ['books', params],
    queryFn: () => bookService.getBooks(params),
  });

// ✅ Get recommended books
export const useGetRecommendedBooks = (params?: RecommendBooksParams) =>
  useQuery<RecommendBooksSuccessResponse, RecommendBooksErrorResponse>({
    queryKey: ['recommendedBooks', params],
    queryFn: () => bookService.getRecommendedBooks(params),
  });

// ✅ Get book detail by ID
export const useGetBookDetail = (bookId: number) =>
  useQuery<GetBookDetailSuccessResponse, GetBookDetailErrorResponse>({
    queryKey: ['bookDetail', bookId],
    queryFn: () => bookService.getBookDetail(bookId),
    enabled: !!bookId, // tidak jalan kalau bookId undefined
  });

// ✅ Create book
export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateBookSuccessResponse,
    CreateBookErrorResponse,
    CreateBookRequest
  >({
    mutationFn: bookService.createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['recommendedBooks'] });
    },
  });
};

// ✅ Update book
export const useUpdateBook = (bookId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateBookSuccessResponse,
    UpdateBookErrorResponse,
    UpdateBookRequest
  >({
    mutationFn: (payload) => bookService.updateBook(bookId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['bookDetail', bookId] });
      queryClient.invalidateQueries({ queryKey: ['recommendedBooks'] });
    },
  });
};

// ✅ Delete book
export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteBookSuccessResponse,
    DeleteBookErrorResponse,
    number
  >({
    mutationFn: (id) => bookService.deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['recommendedBooks'] });
    },
  });
};
