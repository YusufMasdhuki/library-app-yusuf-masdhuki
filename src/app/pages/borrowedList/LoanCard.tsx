import { ReturnConfirmDialog } from '@/components/container/ReturnConfirmDialog';
import { ReviewDialog } from '@/components/container/ReviewDialog';
import { Button } from '@/components/ui/button';
import { useGetBookDetail } from '@/hooks/books/useBook';
import { useReturnLoan } from '@/hooks/loans/useLoan';
import { useGetMe } from '@/hooks/me/useMe';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoanCardProps, statusLabels } from './helper';

export const LoanCard: React.FC<LoanCardProps> = ({ loan }) => {
  const { data: bookDetail, isLoading } = useGetBookDetail(loan.book.id);
  const { mutate: returnLoan, isPending } = useReturnLoan();
  const [openReview, setOpenReview] = useState(false);
  const { data: me } = useGetMe();
  const navigate = useNavigate();

  const authorName = bookDetail?.data.author.name ?? 'Unknown Author';
  const categoryName = bookDetail?.data.category.name ?? 'Unknown Category';

  const currentUserId = me?.data.profile.id;
  const hasReviewed = bookDetail?.data.reviews.some(
    (r) => r.userId === currentUserId
  );

  return (
    <div
      key={loan.id}
      className='rounded-2xl p-4 md:p-5 shadow-[0_0_20px_rgba(203,202,202,0.25)]'
    >
      {/* Status + Due Date */}
      <div className='flex gap-4 items-center justify-between flex-wrap border-b border-neutral-300 pb-4 md:pb-5'>
        <div className='flex items-center gap-1 md:gap-3'>
          <span className='font-bold text-sm md:text-md'>Status</span>
          <span
            className={clsx(
              'rounded-xs h-8 px-2 flex items-center justify-center text-sm font-bold',
              (loan.status === 'BORROWED' || loan.status === 'RETURNED') &&
                'text-[#24A500] bg-[#24A5000D]',
              loan.status === 'LATE' && 'text-[#EE1D52] bg-[#EE1D521A]'
            )}
          >
            {statusLabels[loan.status]}
          </span>
        </div>
        <div className='flex items-center gap-1 md:gap-3'>
          <span className='font-bold text-sm md:text-md'>Due Date</span>
          <span className='text-[#EE1D52] bg-[#EE1D521A] rounded-xs h-8 px-2 flex items-center justify-center text-sm font-bold'>
            {dayjs(loan.dueAt).format('DD MMM YYYY')}
          </span>
        </div>
      </div>

      {/* Book info */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-4 md:mt-5'>
        <Link
          to={`/detail-book/${loan.book.id}`}
          className='flex items-center gap-4'
        >
          {loan.book.coverImage ? (
            <img
              src={loan.book.coverImage}
              alt={loan.book.title}
              className='w-17.5 md:w-23 h-[106px] md:h-[138px] object-cover object-center'
            />
          ) : (
            <div className='w-17.5 md:w-23 h-[106px] md:h-[138px] text-xs md:text-sm bg-gray-200 flex items-center justify-center'>
              No Image
            </div>
          )}
          <div className='flex flex-col gap-1'>
            <p className='inline-block text-sm font-bold rounded-sm px-2 max-w-max h-7 border border-neutral-300'>
              {categoryName}
            </p>
            <h3 className='text-md md:text-xl font-bold line-clamp-1'>
              {loan.book.title}
            </h3>
            <p className='text-sm md:text-md font-medium text-neutral-700'>
              <Link
                to={`/book-by-author/${bookDetail?.data.author.id}`}
                className='hover:text-primary-300 transition-all transition-duration-300 ease-out'
              >
                {isLoading ? 'Loading...' : authorName}
              </Link>
            </p>
            <span className='text-sm md:text-md font-bold'>
              {dayjs(loan.borrowedAt).format('DD MMM YYYY')} • Duration{' '}
              {dayjs(loan.dueAt).diff(dayjs(loan.borrowedAt), 'day')} days
            </span>
          </div>
        </Link>

        {/* Actions */}
        {loan.status === 'RETURNED' && (
          <>
            {hasReviewed ? (
              <Button
                className='h-10 w-full md:max-w-[182px] bg-neutral-700 hover:bg-neutral-600'
                onClick={() => navigate('/reviews')}
              >
                See Review
              </Button>
            ) : (
              <Button
                className='h-10 w-full md:max-w-[182px]'
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
          <ReturnConfirmDialog
            isPending={isPending}
            onConfirm={() => returnLoan(loan.id)}
            bookTitle={loan.book.title} // ⬅️ kirim judulnya
            trigger={
              <Button
                className='h-10 w-full md:max-w-[182px]'
                disabled={isPending}
              >
                {isPending ? 'Returning...' : 'Return Book'}
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};
