import { Skeleton } from '@/components/ui/skeleton';

export const LoanCardSkeleton = () => {
  return (
    <div className='rounded-2xl p-4 md:p-5 shadow-[0_0_20px_rgba(203,202,202,0.25)]'>
      {/* Status + Due Date */}
      <div className='flex gap-4 items-center justify-between flex-wrap border-b border-neutral-300 pb-4 md:pb-5'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-14' /> {/* Status label */}
          <Skeleton className='h-8 w-20 rounded-xs' /> {/* Status badge */}
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-16' /> {/* Due Date label */}
          <Skeleton className='h-8 w-24 rounded-xs' /> {/* Due Date value */}
        </div>
      </div>

      {/* Book Info */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-4 md:mt-5'>
        <div className='flex items-center gap-4'>
          <Skeleton className='w-17.5 md:w-23 h-[106px] md:h-[138px] rounded-md' />{' '}
          {/* Cover */}
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-7 w-24 rounded-sm' /> {/* Category */}
            <Skeleton className='h-6 w-40' /> {/* Title */}
            <Skeleton className='h-5 w-32' /> {/* Author */}
            <Skeleton className='h-5 w-28' /> {/* Borrowed Date */}
          </div>
        </div>

        {/* Actions */}
        <Skeleton className='h-10 w-full md:max-w-[182px] rounded-md' />
      </div>
    </div>
  );
};
