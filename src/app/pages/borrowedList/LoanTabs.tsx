import ErrorScreen from '@/components/common/ErrorScreen';
import { LoanCardSkeleton } from '@/components/common/skeleton/LoanCardSkeleton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getLoanTabsContent,
  loanTabsTrigger,
} from '@/constants/loan-tabs-data';
import { useGetMyLoansInfinite } from '@/hooks/me/useMe';
import { RootState } from '@/store';
import { MyLoan } from '@/types/me-loan-type';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { LoanCard } from './LoanCard';

export const LoanTabs = () => {
  const searchTerm = useSelector((state: RootState) => state.loanSearch.term);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyLoansInfinite({ limit: 10 });

  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className='space-y-4'>
        {Array.from({ length: 3 }).map((_, i) => (
          <LoanCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) return <ErrorScreen message={error?.message} />;

  const loans = data?.pages.flatMap((page) => page.data.loans) ?? [];
  const filteredLoans = loans.filter((loan) =>
    loan.book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loanTabsContent = getLoanTabsContent(
    filteredLoans,
    filteredLoans.filter((l) => l.status === 'BORROWED'),
    filteredLoans.filter((l) => l.status === 'RETURNED'),
    filteredLoans.filter((l) => l.status === 'LATE')
  );

  const renderLoans = (list: MyLoan[]) =>
    list.length === 0 ? (
      <p className='text-center text-neutral-500'>No data</p>
    ) : (
      list.map((loan) => <LoanCard key={loan.id} loan={loan} />)
    );

  return (
    <>
      <Tabs defaultValue='all'>
        <TabsList className='flex gap-2 md:gap-3'>
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
            className='mt-4 md:mt-6 space-y-4'
          >
            {renderLoans(tab.data)}
          </TabsContent>
        ))}
      </Tabs>

      <div ref={ref} className='h-10 flex justify-center items-center'>
        {isFetchingNextPage && <span>Loading more...</span>}
      </div>
    </>
  );
};
