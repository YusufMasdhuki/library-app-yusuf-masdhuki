import { LoanTabs } from './LoanTabs';
import { LoanSearch } from './LoanSearch';
import { ProfileTabs } from '../../../components/container/ProfileTabs';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorScreen from '@/components/common/ErrorScreen';
import { useGetMyLoansInfinite } from '@/hooks/me/useMe';
import { useInView } from 'react-intersection-observer';

const BorrowedListPage = () => {
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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen message={error?.message} />;

  const loans = data?.pages.flatMap((page) => page.data.loans) ?? [];

  // filter search
  const filteredLoans = loans.filter((loan) =>
    loan.book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='pt-20 pb-12 md:py-32'>
      <div className='max-w-300 w-full mx-auto px-4'>
        <ProfileTabs />
        <h1 className='text-display-xs md:text-display-sm font-bold my-4 md:my-6'>
          Borrowed List
        </h1>
        <LoanSearch />
        <LoanTabs loans={filteredLoans} />
        <div ref={ref} className='h-10 flex justify-center items-center'>
          {isFetchingNextPage && <span>Loading more...</span>}
        </div>
      </div>
    </div>
  );
};

export default BorrowedListPage;
