import ReviewCard from '@/components/container/review-card';
import { ReviewsSectionProps } from './helper';

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  rating,
  reviewCount,
}) => {
  return (
    <div className='my-6 md:my-16'>
      <h2 className='text-display-xs md:text-display-lg font-bold mb-1 md:mb-3'>
        Reviews
      </h2>
      <div className='flex items-center gap-1 mb-4.5'>
        <img src='/icons/star.svg' alt='star' className='size-6 md:size-8.5' />
        <p className='text-md md:text-xl font-bold'>
          {rating} ({reviewCount} Ulasan)
        </p>
      </div>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4.5 mt-4 md:mt-6'>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
