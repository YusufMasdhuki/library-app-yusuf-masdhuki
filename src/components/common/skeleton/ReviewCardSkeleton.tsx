import { Skeleton } from '@/components/ui/skeleton';

const ReviewCardSkeleton = () => {
  return (
    <div className='rounded-2xl p-4 md:p-5 shadow-[0_0_20px_rgba(203,202,202,0.25)] mb-4 md:mb-6'>
      {/* Date + Delete button */}
      <div className='pb-4 md:pb-5 border-b border-neutral-300 flex justify-between items-center gap-3'>
        <Skeleton className='h-4 w-40' />
        <Skeleton className='size-8 md:size-9 rounded-full' />
      </div>

      {/* Book info */}
      <div className='flex items-center gap-3 md:gap-4 py-4 md:py-5'>
        <Skeleton className='w-17.5 md:w-23 h-[106px] md:h-[138px]' />
        <div className='flex flex-col gap-2 flex-1'>
          <Skeleton className='h-5 w-24' /> {/* Category */}
          <Skeleton className='h-5 w-40' /> {/* Title */}
          <Skeleton className='h-4 w-28' /> {/* Author */}
        </div>
      </div>

      {/* Review */}
      <div className='pt-4 md:pt-5 border-t border-neutral-300 space-y-2'>
        <div className='flex gap-1'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className='size-6 rounded-full' />
          ))}
        </div>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/4' />
      </div>
    </div>
  );
};

export default ReviewCardSkeleton;
