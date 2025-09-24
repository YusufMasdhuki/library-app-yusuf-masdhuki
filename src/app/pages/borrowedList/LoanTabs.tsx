import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  loanTabsTrigger,
  getLoanTabsContent,
} from '@/constants/loan-tabs-data';
import { LoanCard } from './LoanCard';
import type { MyLoan } from '@/types/loan-type';

interface LoanTabsProps {
  loans: MyLoan[];
}

export const LoanTabs = ({ loans }: LoanTabsProps) => {
  const loanTabsContent = getLoanTabsContent(
    loans,
    loans.filter((l) => l.status === 'BORROWED'),
    loans.filter((l) => l.status === 'RETURNED'),
    loans.filter(
      (l) => l.status === 'BORROWED' && new Date(l.dueAt) < new Date()
    )
  );

  const renderLoans = (list: MyLoan[]) =>
    list.length === 0 ? (
      <p className='text-center text-neutral-500'>No data</p>
    ) : (
      list.map((loan) => <LoanCard key={loan.id} loan={loan} />)
    );

  return (
    <Tabs defaultValue='all'>
      <TabsList className='flex gap-2'>
        {loanTabsTrigger.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} asChild>
            <Button
              variant='primaryWhite'
              size='primaryWhite'
              className='data-[state=active]:bg-primary-100 
                data-[state=active]:border 
                data-[state=active]:border-primary-300 
                data-[state=active]:text-primary-300'
            >
              {tab.label}
            </Button>
          </TabsTrigger>
        ))}
      </TabsList>

      {loanTabsContent.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className='mt-6 space-y-6'
        >
          {renderLoans(tab.data)}
        </TabsContent>
      ))}
    </Tabs>
  );
};
