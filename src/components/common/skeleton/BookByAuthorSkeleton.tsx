// src/components/skeletons/BookByAuthorSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';
import BookCardSkeleton from './book-card-skeleton';

const BookByAuthorSkeleton = () => {
  return (
    <div className='pt-20 pb-12 md:py-32'>
      <div className='max-w-300 mx-auto px-4'>
        {/* Author Info skeleton */}
        <div className='w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl shadow-[0_0_20px_rgba(203,202,202,0.25)]'>
          <Skeleton className='size-15 md:size-20 rounded-full' />
          <div className='flex flex-col gap-2 flex-1'>
            <Skeleton className='h-5 w-32 md:w-40 rounded' />
            <div className='flex items-center gap-2'>
              <Skeleton className='size-6 rounded' />
              <Skeleton className='h-4 w-20 rounded' />
            </div>
          </div>
        </div>

        {/* Book List title */}
        <Skeleton className='h-7 md:h-10 w-40 rounded mt-6 md:mt-10 mb-4 md:mb-8' />

        {/* Grid skeleton cards */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5'>
          {Array.from({ length: 10 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookByAuthorSkeleton;
