import { Skeleton } from '@/components/ui/skeleton';

const BookInfoSectionSkeleton = () => {
  return (
    <div className='flex flex-col md:flex-row items-center md:items-start gap-9 pb-6 md:pb-16 border-b border-neutral-300 animate-pulse'>
      {/* Cover */}
      <Skeleton className='w-[222px] md:w-[337px] h-82 md:h-[498px] rounded-md' />

      {/* Info */}
      <div className='w-full space-y-3'>
        <Skeleton className='h-7 w-20 rounded-sm' />
        <Skeleton className='h-8 w-64' />
        <Skeleton className='h-5 w-40' />
        <div className='flex items-center gap-2'>
          <Skeleton className='h-6 w-6 rounded-full' />
          <Skeleton className='h-5 w-10' />
        </div>

        {/* Stats */}
        <div className='flex items-center divide-x divide-neutral-300 pb-4 md:pb-5 border-b border-neutral-300'>
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className='flex flex-col px-5'>
              <Skeleton className='h-6 w-12' />
              <Skeleton className='h-4 w-16' />
            </div>
          ))}
        </div>

        <Skeleton className='h-6 w-32 mt-4' />
        <Skeleton className='h-20 w-full' />

        {/* Buttons */}
        <div className='flex items-center gap-3 mt-5'>
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-10 rounded-full' />
        </div>
      </div>
    </div>
  );
};

export default BookInfoSectionSkeleton;
