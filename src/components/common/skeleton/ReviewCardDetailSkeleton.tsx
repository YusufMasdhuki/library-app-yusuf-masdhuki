import { Skeleton } from '@/components/ui/skeleton';

const ReviewCardDetailSkeleton = () => {
  return (
    <div className='p-4 rounded-2xl shadow-[0_0_20px_rgba(203,202,202,0.25)]'>
      <div className='flex items-center gap-3 mb-4'>
        <Skeleton className='size-14.5 md:size-16 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-28' />
          <Skeleton className='h-3 w-40' />
        </div>
      </div>
      <div className='flex items-center gap-1 mb-2'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className='size-6 rounded-full' />
        ))}
      </div>
      <Skeleton className='h-4 w-full mb-2' />
      <Skeleton className='h-4 w-3/4' />
    </div>
  );
};

export default ReviewCardDetailSkeleton;
