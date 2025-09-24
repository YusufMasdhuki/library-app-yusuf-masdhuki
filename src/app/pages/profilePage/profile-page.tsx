import { ProfileTabs } from '@/components/container/ProfileTabs';
import { UpdateProfileDialog } from '@/components/container/update-profile-dialog';
import { useGetMe } from '@/hooks/me/useMe';

const ProfilePage = () => {
  const { data, isLoading, isError } = useGetMe();

  if (isLoading) {
    return (
      <div className='py-32 text-center'>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className='py-32 text-center'>
        <p>Failed to load profile</p>
      </div>
    );
  }

  const { profile } = data.data;

  return (
    <div className='py-32'>
      <div className='max-w-300 mx-auto px-4 w-full'>
        <ProfileTabs />
        <h1 className='text-display-sm font-bold my-6'>Profile</h1>
        <div className='w-full max-w-[557px] shadow-[0_0_20px_rgba(203,202,202,0.25)] rounded-2xl p-5'>
          <div className='flex flex-col gap-3 mb-6'>
            <img
              src='/images/default-avatar.png'
              alt='default-avatar'
              className='size-16'
            />
            <div className='flex items-center gap-2 justify-between'>
              <span>Name</span>
              <span className='font-medium'>{profile.name}</span>
            </div>
            <div className='flex items-center gap-2 justify-between'>
              <span>Email</span>
              <span className='font-medium'>{profile.email}</span>
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
