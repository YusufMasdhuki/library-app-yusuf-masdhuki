import { useGetMyLoans } from '@/hooks/loans/useLoan';
import { LoanTabs } from './LoanTabs';
import { LoanSearch } from './LoanSearch';
import { ProfileTabs } from '../../../components/container/ProfileTabs';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const BorrowedListPage = () => {
  const { data, isLoading, isError } = useGetMyLoans();
  const searchTerm = useSelector((state: RootState) => state.loanSearch.term);

  if (isLoading) return <p className='py-32 text-center'>Loading...</p>;
  if (isError)
    return (
      <p className='py-32 text-center text-red-500'>Failed to load loans</p>
    );

  const loans = data?.data.loans ?? [];

  // filter berdasarkan judul buku
  const filteredLoans = loans.filter((loan) =>
    loan.book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='py-32'>
      <div className='max-w-300 w-full mx-auto px-4'>
        <ProfileTabs />
        <h1 className='text-display-sm font-bold my-6'>Borrowed List</h1>
        <LoanSearch />
        {/* pakai filteredLoans biar search berfungsi */}
        <LoanTabs loans={filteredLoans} />
      </div>
    </div>
  );
};

export default BorrowedListPage;
