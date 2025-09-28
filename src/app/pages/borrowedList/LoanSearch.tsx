import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setLoanSearch } from '@/store/slices/loan-search-slice';

export const LoanSearch = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.loanSearch.term);

  return (
    <div className='relative mb-4 md:mb-6'>
      <Search className='absolute top-1/2 left-4 -translate-y-1/2 size-5 text-neutral-600' />
      <Input
        placeholder='Search book'
        value={searchTerm}
        onChange={(e) => dispatch(setLoanSearch(e.target.value))}
        className='w-full max-w-[544px] h-11 rounded-full pl-10.5'
      />
    </div>
  );
};
