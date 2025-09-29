import { Skeleton } from '@/components/ui/skeleton';
import ReviewCardDetailSkeleton from './ReviewCardDetailSkeleton';

const ReviewsSectionSkeleton = () => {
  return (
    <div className='my-6 md:my-16'>
      <Skeleton className='h-7 w-32 mb-2' />
      <div className='flex items-center gap-2 mb-4'>
        <Skeleton className='size-6 md:size-8.5 rounded-full' />
        <Skeleton className='h-5 w-40' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4.5 mt-4 md:mt-6'>
        {Array.from({ length: 2 }).map((_, i) => (
          <ReviewCardDetailSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSectionSkeleton;
