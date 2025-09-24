import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ambil due date dari state yang dikirim waktu redirect
  const returnDate = (location.state as { returnDate?: string })?.returnDate;

  return (
    <div className='py-32 flex items-center justify-center min-h-screen'>
      <div className='flex items-center justify-center flex-col w-full max-w-[638px] text-center'>
        <img
          src='/icons/success-icon.svg'
          alt='success icon'
          className='size-35.5 mb-8'
        />
        <h2 className='mb-1'>Borrowing Successful!</h2>
        <p className='mb-8'>
          Your book has been successfully borrowed. Please return it by{' '}
          <span className='text-primary-300'>
            {returnDate
              ? dayjs(returnDate).format('DD MMMM YYYY')
              : 'the due date'}
          </span>
          .
        </p>
        <Button
          className='w-[286px]'
          onClick={() => navigate('/borrowed-list')}
        >
          See Borrowed List
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
