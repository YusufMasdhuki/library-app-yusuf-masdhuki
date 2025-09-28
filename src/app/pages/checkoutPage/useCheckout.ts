import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { useNavigate } from 'react-router-dom';
import { useGetMe } from '@/hooks/me/useMe';
import { useCreateLoan } from '@/hooks/loans/useLoan';
import { clearCart } from '@/store/slices/cart-slice';
import { useState } from 'react';
import dayjs from 'dayjs';

export function useCheckout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: meData } = useGetMe();

  const checkoutIds = useSelector((state: RootState) => state.cart.checkoutIds);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const checkoutBooks = cartItems.filter((b) => checkoutIds.includes(b.id));

  const [duration, setDuration] = useState<number>(3);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const { mutateAsync: createLoan, isPending } = useCreateLoan();

  const handleConfirm = async () => {
    try {
      await Promise.all(
        checkoutBooks.map((book) =>
          createLoan({ bookId: book.id, days: duration })
        )
      );
      dispatch(clearCart());

      const returnDate = dayjs().add(duration, 'day').format('DD MMMM YYYY');
      navigate('/success', { state: { returnDate } });
    } catch (error) {
      console.error('Borrow failed:', error);
    }
  };

  return {
    profile: meData?.data.profile,
    checkoutBooks,
    duration,
    setDuration,
    agree1,
    setAgree1,
    agree2,
    setAgree2,
    handleConfirm,
    isPending,
  };
}
