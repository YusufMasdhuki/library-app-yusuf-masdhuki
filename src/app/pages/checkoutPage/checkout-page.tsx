import { Button } from '@/components/ui/button';
import { RootState } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useGetMe } from '@/hooks/me/useMe';
import { useCreateLoan } from '@/hooks/loans/useLoan';
import { clearCart } from '@/store/slices/cart-slice';

const CheckOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: meData } = useGetMe();

  const checkoutIds = useSelector((state: RootState) => state.cart.checkoutIds);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const checkoutBooks = cartItems.filter((b) => checkoutIds.includes(b.id));

  // form state
  const [duration, setDuration] = useState<number>(3);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const { mutateAsync: createLoan, isPending } = useCreateLoan();

  const handleConfirm = async () => {
    try {
      // call API untuk setiap buku
      await Promise.all(
        checkoutBooks.map((book) =>
          createLoan({ bookId: book.id, days: duration })
        )
      );

      // kosongkan cart
      dispatch(clearCart());

      const returnDate = dayjs().add(duration, 'day').format('DD MMMM YYYY');

      navigate('/success', { state: { returnDate } });
    } catch (error) {
      console.error('Borrow failed:', error);
    }
  };

  const profile = meData?.data.profile;

  return (
    <div className='py-32'>
      <div className='max-w-300 mx-auto px-4 w-full'>
        <h1 className='text-display-lg font-bold mb-8'>Checkout</h1>

        <div className='flex gap-14.5'>
          <div className='flex-[4.8] basis-80'>
            {/* user info */}
            <div className='flex flex-col gap-4 pb-8 border-b border-neutral-300'>
              <h2>User Information</h2>
              <div className='flex items-center justify-between'>
                <span>Name</span>
                <span>{profile?.name ?? '-'}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>Email</span>
                <span>{profile?.email ?? '-'}</span>
              </div>
            </div>

            {/* daftar buku */}
            <div className='flex flex-col gap-4 pt-8'>
              <h2>Book List</h2>
              {checkoutBooks.map((book) => (
                <div
                  key={book.id}
                  className='flex items-center gap-4 p-3 border rounded-lg'
                >
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className='w-16 h-20 object-cover rounded'
                    />
                  ) : (
                    <div className='w-16 h-20 bg-gray-200 flex items-center justify-center'>
                      No Image
                    </div>
                  )}
                  <div>
                    <h3 className='font-bold'>{book.title}</h3>
                    <p className='text-sm text-gray-600'>{book.authorName}</p>
                    <p className='text-sm text-gray-600'>{book.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* borrow section */}
          <div className='flex-[5.2] basis-80'>
            <div className='w-full rounded-2xl shadow-[0_0_20px_rgba(203,202,202,0.25)] p-5 flex flex-col gap-6'>
              <h2>Complete Your Borrow Request</h2>

              <div>
                <h3>Borrow Date</h3>
                <div className='flex items-center justify-between gap-2 rounded-xl h-12 px-4 bg-neutral-100 border border-neutral-300'>
                  <span>{dayjs().format('DD MMMM YYYY')}</span>
                  <Calendar />
                </div>
              </div>

              {/* duration */}
              <div className='flex flex-col gap-3'>
                <h3>Borrow Duration</h3>
                {[3, 5, 10].map((d) => (
                  <label key={d} className='flex items-center gap-2'>
                    <input
                      type='radio'
                      checked={duration === d}
                      onChange={() => setDuration(d)}
                    />
                    {d} days
                  </label>
                ))}
              </div>

              {/* return date */}
              <div className='p-4 rounded-xl bg-primary-100'>
                <h3>Return Date</h3>
                <p>
                  Please return the book no later than{' '}
                  {dayjs().add(duration, 'day').format('DD MMMM YYYY')}
                </p>
              </div>

              {/* agreement */}
              <div className='flex flex-col gap-2'>
                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={agree1}
                    onChange={(e) => setAgree1(e.target.checked)}
                  />
                  I agree to return the book(s) before the due date.
                </label>
                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={agree2}
                    onChange={(e) => setAgree2(e.target.checked)}
                  />
                  I accept the library borrowing policy.
                </label>
              </div>

              <Button
                disabled={isPending || !agree1 || !agree2}
                onClick={handleConfirm}
              >
                {isPending ? 'Processing...' : 'Confirm & Borrow'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
