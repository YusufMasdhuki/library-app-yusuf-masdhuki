import { Skeleton } from '@/components/ui/skeleton';

const PopularAuthorsSkeleton = () => {
  // tampilkan 4 item default
  return (
    <div className='pt-6 md:pt-12 border-t border-neutral-300'>
      <h2 className='text-display-xs md:text-display-lg font-bold mb-6 md:mb-10'>
        Popular Authors
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className='rounded-xl overflow-hidden p-3 md:p-4 flex items-center gap-3 md:gap-4 shadow-[0_0_20px_rgba(203,202,202,0.25)]'
          >
            {/* avatar */}
            <Skeleton className='size-15 md:size-20 rounded-full' />
            <div className='flex flex-col flex-1 gap-2'>
              {/* nama author */}
              <Skeleton className='h-4 md:h-5 w-32 md:w-40 rounded-md' />
              {/* jumlah buku */}
              <div className='flex items-center gap-1.5'>
                <Skeleton className='size-6 rounded-md' />
                <Skeleton className='h-4 md:h-5 w-20 rounded-md' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularAuthorsSkeleton;
