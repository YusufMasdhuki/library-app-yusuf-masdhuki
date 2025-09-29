import { DeleteReviewDialog } from '@/components/container/DeleteReviewDialog';
import { Button } from '@/components/ui/button';
import { useGetBookDetail } from '@/hooks/books/useBook';
import { useDeleteReview } from '@/hooks/reviews/useReview'; // pastikan path benar
import dayjs from 'dayjs';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReviewCardProps {
  review: {
    id: number;
    star: number;
    comment: string;
    createdAt: string;
    bookId: number;
    book: {
      id: number;
      title: string;
      coverImage: string | null;
    };
  };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { data: bookDetail, isLoading } = useGetBookDetail(review.bookId);
  const { mutate: deleteReview, isPending } = useDeleteReview(review.bookId);

  return (
    <div className='rounded-2xl p-4 md:p-5 shadow-[0_0_20px_rgba(203,202,202,0.25)] mb-4 md:mb-6'>
      {/* Date */}
      <div className='pb-4 md:pb-5 border-b border-neutral-300 flex justify-between items-center gap-3'>
        <p className='text-sm md:text-md font-semibold'>
          {dayjs(review.createdAt).format('DD MMMM YYYY, HH:mm')}
        </p>

        <DeleteReviewDialog
          isPending={isPending}
          onConfirm={() => deleteReview(review.id)}
          bookTitle={review.book.title}
          trigger={
            <Button
              size='icon'
              variant='primaryWhite'
              className='size-8 md:size-9'
              disabled={isPending}
            >
              <Trash2 className='size-4 md:size-4.5 text-accent-red' />
            </Button>
          }
        />
      </div>

      {/* Book info */}
      <Link
        to={`/detail-book/${review.book.id}`}
        className='flex items-center gap-3 md:gap-4 py-4 md:py-5'
      >
        {review.book.coverImage ? (
          <img
            src={review.book.coverImage}
            alt={review.book.title}
            className='w-17.5 md:w-23 h-[106px] md:h-[138px] object-cover'
          />
        ) : (
          <div className='w-17.5 md:w-23 h-[106px] md:h-[138px] bg-gray-200 flex items-center text-xs md:text-sm justify-center'>
            No Image
          </div>
        )}
        <div className='flex flex-col gap-1'>
          <span className='text-sm font-bold rounded-sm max-w-max px-2 h-7 border border-neutral-300'>
            {isLoading ? 'Loading...' : bookDetail?.data.category.name}
          </span>
          <h3 className='text-md md:text-xl font-bold line-clamp-1'>
            {review.book.title}
          </h3>
          <p className='text-sm md:text-md font-medium text-neutral-700'>
            <Link
              to={`/book-by-author/${bookDetail?.data.author.id}`}
              className='hover:text-primary-300 transition-all transition-duration-300 ease-out'
              onClick={(e) => e.stopPropagation()}
            >
              {isLoading ? 'Loading...' : bookDetail?.data.author.name}
            </Link>
          </p>
        </div>
      </Link>

      {/* Review */}
      <div className='pt-4 md:pt-5 border-t border-neutral-300'>
        <div className='flex items-center gap-0.5'>
          {Array.from({ length: review.star }).map((_, i) => (
            <img key={i} src='/icons/star.svg' alt='star' className='size-6' />
          ))}
        </div>
        <p className='mt-2 text-sm md:text-md font-semibold'>
          {review.comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
