import ErrorScreen from '@/components/common/ErrorScreen';
import ProfilePageSkeleton from '@/components/common/skeleton/profile-page-skeleton';
import { ProfileTabs } from '@/components/container/ProfileTabs';
import { UpdateProfileDialog } from '@/components/container/update-profile-dialog';
import { useGetMe } from '@/hooks/me/useMe';
import { useEffect } from 'react';

const ProfilePage = () => {
  const { data, isLoading, isError, error } = useGetMe();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <ProfilePageSkeleton />;
  }

  if (isError || !data?.data) {
    return <ErrorScreen message={error?.message} />;
  }

  const { profile } = data.data;

  return (
    <div className='py-20 md:py-32'>
      <div className='max-w-300 mx-auto px-4 w-full'>
        <ProfileTabs />
        <h1 className='text-display-xs md:text-display-sm font-bold my-4 md:my-6'>
          Profile
        </h1>
        <div className='w-full max-w-[557px] shadow-[0_0_20px_rgba(203,202,202,0.25)] rounded-2xl p-4 md:p-5'>
          <div className='flex flex-col gap-2 md:gap-3 mb-4 md:mb-6 text-sm md:text-md'>
            <img
              src='/images/default-avatar.png'
              alt='default-avatar'
              className='size-16'
            />
            <div className='flex items-center gap-2 justify-between'>
              <span className='font-medium'>Name</span>
              <span className='font-bold'>{profile.name}</span>
            </div>
            <div className='flex items-center gap-2 justify-between'>
              <span className='font-medium'>Email</span>
              <span className='font-bold'>{profile.email}</span>
            </div>
          </div>
          {/* 🔹 dialog form update */}
          <UpdateProfileDialog defaultName={profile.name} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
