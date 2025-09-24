import { MyLoan } from '@/types/me-loan-type';

interface LoanTabTrigger {
  value: string;
  label: string;
}

export const loanTabsTrigger: LoanTabTrigger[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'returned', label: 'Returned' },
  { value: 'overdue', label: 'Overdue' },
];

interface LoanTabContent {
  value: string;
  label: string;
  data: MyLoan[];
}

export const getLoanTabsContent = (
  loans: MyLoan[],
  activeLoans: MyLoan[],
  returnedLoans: MyLoan[],
  overdueLoans: MyLoan[]
): LoanTabContent[] => [
  { value: 'all', label: 'All', data: loans },
  { value: 'active', label: 'Active', data: activeLoans },
  { value: 'returned', label: 'Returned', data: returnedLoans },
  { value: 'overdue', label: 'Overdue', data: overdueLoans },
];
