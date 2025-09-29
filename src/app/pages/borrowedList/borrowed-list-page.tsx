import { useEffect } from 'react';
import { ProfileTabs } from '../../../components/container/ProfileTabs';
import { LoanSearch } from './LoanSearch';
import { LoanTabs } from './LoanTabs';

const BorrowedListPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='pt-20 pb-12 md:py-32'>
      <div className='max-w-300 w-full mx-auto px-4'>
        <ProfileTabs />
        <h1 className='text-display-xs md:text-display-sm font-bold my-4 md:my-6'>
          Borrowed List
        </h1>
        <LoanSearch />
        <LoanTabs />
      </div>
    </div>
  );
};

export default BorrowedListPage;
