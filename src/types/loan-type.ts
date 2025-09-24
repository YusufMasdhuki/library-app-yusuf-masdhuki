export interface CreateLoanRequest {
  bookId: number;
  days: number;
}

export interface Loan {
  id: number;
  userId: number;
  bookId: number;
  status: 'BORROWED' | 'RETURNED' | 'LATE';
  borrowedAt: string; // ISO date
  dueAt: string; // ISO date
  returnedAt: string | null;
}

export interface CreateLoanSuccessResponse {
  success: true;
  message: string; // "Borrow success"
  data: {
    loan: Loan;
  };
}

export interface CreateLoanErrorResponse {
  success: false;
  message: string;
}

export interface ReturnLoanSuccessResponse {
  success: true;
  message: string; // "Return success"
  data: {
    loan: Loan;
  };
}

export interface ReturnLoanErrorResponse {
  success: false;
  message: string;
}

export interface LoanBook {
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
  book: LoanBook;
}

export interface GetMyLoansSuccessResponse {
  success: true;
  message: string; // "Success"
  data: {
    loans: MyLoan[];
  };
}

export interface GetMyLoansErrorResponse {
  success: false;
  message: string;
}
