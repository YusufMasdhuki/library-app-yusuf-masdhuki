import { Skeleton } from '@/components/ui/skeleton';
import ReviewCardSkeleton from './ReviewCardSkeleton';

const ReviewsPageSkeleton = () => {
  return (
    <div className='pb-12 pt-20 md:py-32'>
      <div className='max-w-300 mx-auto px-4 w-full'>
        {/* ProfileTabs */}
        <Skeleton className='h-10 w-full mb-4' />

        {/* Title */}
        <Skeleton className='h-7 w-40 mb-4 md:mb-6' />

        {/* Search input */}
        <Skeleton className='h-11 w-full max-w-[544px] rounded-full mb-6' />

        {/* Review cards */}
        {Array.from({ length: 3 }).map((_, i) => (
          <ReviewCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsPageSkeleton;
