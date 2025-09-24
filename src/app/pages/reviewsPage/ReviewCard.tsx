import { useGetBookDetail } from '@/hooks/books/useBook';
import dayjs from 'dayjs';

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

  return (
    <div className='rounded-2xl p-5 shadow-[0_0_20px_rgba(203,202,202,0.25)] mb-6'>
      {/* Date */}
      <div className='pb-5 border-b border-neutral-300'>
        <p>{dayjs(review.createdAt).format('DD MMMM YYYY, HH:mm')}</p>
      </div>

      {/* Book info */}
      <div className='flex items-center gap-4 py-5'>
        {review.book.coverImage ? (
          <img
            src={review.book.coverImage}
            alt={review.book.title}
            className='w-16 h-20 object-cover rounded'
          />
        ) : (
          <div className='w-16 h-20 bg-gray-200 flex items-center justify-center'>
            No Image
          </div>
        )}
        <div>
          <span className='text-sm text-gray-500'>
            {isLoading ? 'Loading...' : bookDetail?.data.category.name}
          </span>
          <h3 className='font-bold'>{review.book.title}</h3>
          <p className='text-sm text-gray-500'>
            {isLoading ? 'Loading...' : bookDetail?.data.author.name}
          </p>
        </div>
      </div>

      {/* Review */}
      <div className='pt-5 border-t border-neutral-300'>
        <div className='flex items-center gap-0.5'>
          {Array.from({ length: review.star }).map((_, i) => (
            <img key={i} src='/icons/star.svg' alt='star' className='size-6' />
          ))}
        </div>
        <p className='mt-2 text-gray-700'>{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
