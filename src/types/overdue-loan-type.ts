export interface GetOverdueLoansParams {
  page?: number;
  limit?: number;
}

export interface OverdueLoan {
  id: number;
  userId: number;
  bookId: number;
  status: 'BORROWED' | 'RETURNED';
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  book?: {
    id: number;
    title: string;
    coverImage: string | null;
  };
}

export interface GetOverdueLoansSuccessResponse {
  success: true;
  message: string; // "Success"
  data: {
    loans: OverdueLoan[];
    pagination?: {
      total: number;
      page: number;
      limit: number;
    };
  };
}

export interface GetOverdueLoansErrorResponse {
  success: false;
  message: string; // "Forbidden" atau error lainnya
}
