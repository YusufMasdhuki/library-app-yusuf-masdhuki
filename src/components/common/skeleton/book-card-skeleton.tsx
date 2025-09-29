import { Skeleton } from '@/components/ui/skeleton';

const BookCardSkeleton = () => {
  return (
    <div className='rounded-xl overflow-hidden shadow-[0_0_20px_rgba(203,202,202,0.25)] w-full'>
      {/* Cover image */}
      <Skeleton className='w-full h-64.5 md:h-84' />

      <div className='p-3 md:p-4 flex flex-col gap-2'>
        {/* Title */}
        <Skeleton className='h-4 md:h-5 w-3/4' />
        {/* Author */}
        <Skeleton className='h-3 md:h-4 w-1/2' />
        {/* Rating */}
        <div className='flex items-center gap-2'>
          <Skeleton className='size-6 rounded-full' />
          <Skeleton className='h-3 md:h-4 w-8' />
        </div>
      </div>
    </div>
  );
};

export default BookCardSkeleton;
