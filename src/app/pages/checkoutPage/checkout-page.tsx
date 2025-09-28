import { UserInfo } from './UserInfo';
import { BookList } from './BookList';
import { BorrowForm } from './BorrowForm';
import { useCheckout } from './useCheckout';
import { useEffect } from 'react';

const CheckOutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    profile,
    checkoutBooks,
    duration,
    setDuration,
    agree1,
    setAgree1,
    agree2,
    setAgree2,
    handleConfirm,
    isPending,
  } = useCheckout();

  return (
    <div className='pt-20 pb-12 md:py-32'>
      <div className='max-w-300 mx-auto px-4 w-full'>
        <h1 className='text-display-xs md:text-display-lg font-bold mb-4 md:mb-8'>
          Checkout
        </h1>

        <div className='flex flex-col md:flex-row gap-6 md:gap-14.5'>
          <div className='md:flex-[4.8] md:basis-80'>
            <UserInfo name={profile?.name} email={profile?.email} />
            <BookList books={checkoutBooks} />
          </div>

          <div className='md:flex-[5.2] md:basis-80'>
            <BorrowForm
              duration={duration}
              setDuration={setDuration}
              agree1={agree1}
              setAgree1={setAgree1}
              agree2={agree2}
              setAgree2={setAgree2}
              handleConfirm={handleConfirm}
              isPending={isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
