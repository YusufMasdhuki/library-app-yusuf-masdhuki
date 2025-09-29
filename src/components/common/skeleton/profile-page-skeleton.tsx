// src/components/skeletons/profile-page-skeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';
import { ProfileTabs } from '@/components/container/ProfileTabs';

const ProfilePageSkeleton = () => {
  return (
    <div className='py-20 md:py-32'>
      <div className='max-w-300 mx-auto px-4 w-full'>
        {/* Tabs tetap muncul biar konsisten */}
        <ProfileTabs />

        {/* Title skeleton */}
        <Skeleton className='h-8 md:h-10 w-32 mt-4 md:mt-6 mb-4 md:mb-6' />

        {/* Card skeleton */}
        <div className='w-full max-w-[557px] shadow-[0_0_20px_rgba(203,202,202,0.25)] rounded-2xl p-4 md:p-5'>
          <div className='flex flex-col gap-2 md:gap-3 mb-4 md:mb-6 text-sm md:text-md'>
            {/* Avatar */}
            <Skeleton className='size-16 rounded-full' />

            {/* Name row */}
            <div className='flex items-center justify-between'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-4 w-40' />
            </div>

            {/* Email row */}
            <div className='flex items-center justify-between'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-4 w-52' />
            </div>
          </div>

          {/* Update Profile button skeleton */}
          <Skeleton className='h-10 w-full rounded-lg' />
        </div>
      </div>
    </div>
  );
};

export default ProfilePageSkeleton;
