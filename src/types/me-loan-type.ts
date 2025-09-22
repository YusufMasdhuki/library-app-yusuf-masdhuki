// Query params
export interface GetMyLoansParams {
  status?: 'BORROWED' | 'RETURNED' | 'LATE'; // sesuai API
  page?: number;
  limit?: number;
}

// Response data
export interface MyLoanBook {
  id: number;
  title: string;
  coverImage: string;
}

export interface MyLoan {
  id: number;
  userId: number;
  bookId: number;
  status: 'BORROWED' | 'RETURNED' | 'LATE';
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  book: MyLoanBook;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetMyLoansSuccessResponse {
  success: true;
  message: string;
  data: {
    loans: MyLoan[];
    pagination: Pagination;
  };
}

export interface GetMyLoansErrorResponse {
  success: false;
  message: string;
}
