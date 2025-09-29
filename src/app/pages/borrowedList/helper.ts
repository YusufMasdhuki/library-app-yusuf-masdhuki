import { MyLoan } from '@/types/me-loan-type';

export interface LoanCardProps {
  loan: MyLoan;
}

export const statusLabels: Record<MyLoan['status'], string> = {
  BORROWED: 'Active',
  RETURNED: 'Returned',
  LATE: 'Overdue',
};
