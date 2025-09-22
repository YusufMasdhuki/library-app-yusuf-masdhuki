export interface AdminOverviewData {
  totalUsers: number;
  totalBooks: number;
  totalLoans: number;
  totalOverdue: number;
  totalCategories: number;
  totalAuthors: number;
  // tambahkan field lain sesuai API contract
}

export interface GetAdminOverviewSuccessResponse {
  success: boolean;
  message?: string;
  data?: AdminOverviewData;
}

export interface GetAdminOverviewErrorResponse {
  success: boolean;
  message: string;
}
