// src/hooks/author/useAuthor.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  GetAuthorsSuccessResponse,
  GetAuthorsErrorResponse,
} from '@/types/author-type';
import type {
  CreateAuthorRequest,
  CreateAuthorSuccessResponse,
  CreateAuthorErrorResponse,
} from '@/types/create-author-type';
import type {
  AuthorBooksSuccessResponse,
  AuthorBooksErrorResponse,
} from '@/types/author-books-type';
import type {
  UpdateAuthorRequest,
  UpdateAuthorSuccessResponse,
  UpdateAuthorErrorResponse,
} from '@/types/update-author-type';
import type {
  DeleteAuthorSuccessResponse,
  DeleteAuthorErrorResponse,
} from '@/types/delete-author-type';
import { authorService } from '@/services/authors/service';

// ✅ Get all authors
export const useGetAuthors = () =>
  useQuery<GetAuthorsSuccessResponse, GetAuthorsErrorResponse>({
    queryKey: ['authors'],
    queryFn: authorService.getAuthors,
  });

// ✅ Get books by author
export const useGetAuthorBooks = (authorId: number) =>
  useQuery<AuthorBooksSuccessResponse, AuthorBooksErrorResponse>({
    queryKey: ['authorBooks', authorId],
    queryFn: () => authorService.getAuthorBooks(authorId),
    enabled: !!authorId, // tidak jalan kalau authorId undefined
  });

// ✅ Create author
export const useCreateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateAuthorSuccessResponse,
    CreateAuthorErrorResponse,
    CreateAuthorRequest
  >({
    mutationFn: authorService.createAuthor,
    onSuccess: () => {
      // invalidate query agar daftar authors refresh otomatis
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });
};

// ✅ Update author
export const useUpdateAuthor = (authorId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateAuthorSuccessResponse,
    UpdateAuthorErrorResponse,
    UpdateAuthorRequest
  >({
    mutationFn: (payload) => authorService.updateAuthor(authorId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
      queryClient.invalidateQueries({ queryKey: ['authorBooks', authorId] });
    },
  });
};

// ✅ Delete author
export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteAuthorSuccessResponse,
    DeleteAuthorErrorResponse,
    number
  >({
    mutationFn: (id) => authorService.deleteAuthor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });
};
