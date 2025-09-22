export interface CreateAdminLoanRequest {
  userId: number;
  bookId: number;
  dueAt: string; // ISO date string
}

export interface AdminLoan {
  id: number;
  userId: number;
  bookId: number;
  status: 'BORROWED' | 'RETURNED';
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
}

export interface CreateAdminLoanSuccessResponse {
  success: true;
  message: string; // biasanya "Created" atau "Borrow success"
  data: {
    loan: AdminLoan;
  };
}

export interface CreateAdminLoanErrorResponse {
  success: false;
  message: string; // "Forbidden", "Validation error", dsb
}

export interface UpdateAdminLoanRequest {
  dueAt: string; // ISO date string
  status: 'BORROWED' | 'RETURNED';
}

export interface UpdateAdminLoanSuccessResponse {
  success: true;
  message: string; // "Updated"
  data: {
    loan: {
      id: number;
      userId: number;
      bookId: number;
      status: 'BORROWED' | 'RETURNED';
      borrowedAt: string;
      dueAt: string;
      returnedAt: string | null;
    };
  };
}

export interface UpdateAdminLoanErrorResponse {
  success: false;
  message: string; // "Forbidden", "Loan not found", dll
}
