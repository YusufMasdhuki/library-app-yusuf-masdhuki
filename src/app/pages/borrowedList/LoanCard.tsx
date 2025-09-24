import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import type { MyLoan } from '@/types/loan-type';
import { useGetBookDetail } from '@/hooks/books/useBook';
import { useReturnLoan } from '@/hooks/loans/useLoan';
import { ReviewDialog } from '@/components/container/ReviewDialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMe } from '@/hooks/me/useMe';

interface LoanCardProps {
  loan: MyLoan;
}

export const LoanCard = ({ loan }: LoanCardProps) => {
  const { data: bookDetail, isLoading } = useGetBookDetail(loan.book.id);
  const { mutate: returnLoan, isPending } = useReturnLoan();
  const [openReview, setOpenReview] = useState(false);
  const { data: me } = useGetMe(); // ambil data user login
  const navigate = useNavigate();

  const authorName = bookDetail?.data.author.name ?? 'Unknown Author';
  const categoryName = bookDetail?.data.category.name ?? 'Unknown Category';

  // cek apakah user sudah review
  const currentUserId = me?.data.profile.id;
  const hasReviewed = bookDetail?.data.reviews.some(
    (r) => r.userId === currentUserId
  );

  return (
    <div
      key={loan.id}
      className='rounded-2xl p-5 shadow-[0_0_20px_rgba(203,202,202,0.25)]'
    >
      {/* Status + Due Date */}
      <div className='flex gap-4 justify-between border-b border-neutral-300 pb-5'>
        <div className='flex items-center gap-3'>
          <span>Status</span>
          <span
            className={`rounded-xs h-8 px-2 flex items-center justify-center ${
              loan.status === 'BORROWED'
                ? 'text-[#24A500] bg-[#24A5000D]'
                : loan.status === 'LATE'
                ? 'text-[#EE1D52] bg-[#EE1D521A]'
                : 'text-gray-500 bg-gray-100'
            }`}
          >
            {loan.status}
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <span>Due Date</span>
          <span className='text-[#EE1D52] bg-[#EE1D521A] rounded-xs h-8 px-2 flex items-center justify-center'>
            {dayjs(loan.dueAt).format('DD MMM YYYY')}
          </span>
        </div>
      </div>

      {/* Book info */}
      <div className='flex items-center justify-between mt-5'>
        <div className='flex items-center gap-4'>
          {loan.book.coverImage ? (
            <img
              src={loan.book.coverImage}
              alt={loan.book.title}
              className='w-16 h-20 object-cover rounded'
            />
          ) : (
            <div className='w-16 h-20 bg-gray-200 flex items-center justify-center'>
              No Image
            </div>
          )}
          <div>
            <span className='text-sm text-gray-500'>{categoryName}</span>
            <h3 className='font-bold'>{loan.book.title}</h3>
            <p className='text-sm text-gray-600'>
              {isLoading ? 'Loading...' : authorName}
            </p>
            <span className='text-sm text-gray-500'>
              {dayjs(loan.borrowedAt).format('DD MMM YYYY')} • Duration{' '}
              {dayjs(loan.dueAt).diff(dayjs(loan.borrowedAt), 'day')} days
            </span>
          </div>
        </div>

        {/* Actions */}
        {loan.status === 'RETURNED' && (
          <>
            {hasReviewed ? (
              <Button
                className='h-10 w-[182px]'
                onClick={() => navigate('/reviews')}
              >
                See Review
              </Button>
            ) : (
              <Button
                className='h-10 w-[182px]'
                onClick={() => setOpenReview(true)}
              >
                Give Review
              </Button>
            )}

            <ReviewDialog
              open={openReview}
              onClose={() => setOpenReview(false)}
              bookId={loan.book.id}
            />
          </>
        )}

        {(loan.status === 'BORROWED' || loan.status === 'LATE') && (
          <Button
            className='h-10 w-[182px]'
            disabled={isPending}
            onClick={() => returnLoan(loan.id)}
          >
            {isPending ? 'Returning...' : 'Return Book'}
          </Button>
        )}
      </div>
    </div>
  );
};
