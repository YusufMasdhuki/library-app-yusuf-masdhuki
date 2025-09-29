import { useCreateLoan } from '@/hooks/loans/useLoan';
import { useGetMe } from '@/hooks/me/useMe';
import { errorToast, successToast } from '@/lib/toast-helper';
import { RootState } from '@/store';
import { clearCart } from '@/store/slices/cart-slice';
import { CreateLoanErrorResponse } from '@/types/loan-type';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
      successToast('Borrow successful!');
      navigate('/success', { state: { returnDate } });
    } catch (error) {
      const axiosError = error as AxiosError<CreateLoanErrorResponse>;
      const msg = axiosError.response?.data?.message ?? 'Borrow failed';
      errorToast(msg);
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
