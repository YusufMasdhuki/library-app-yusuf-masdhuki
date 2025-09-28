interface UserInfoProps {
  name?: string;
  email?: string;
}

export const UserInfo = ({ name, email }: UserInfoProps) => {
  return (
    <div className='flex flex-col gap-2 md:gap-4 pb-4 md:pb-8 border-b border-neutral-300'>
      <h2 className='text-lg md:text-display-xs font-bold'>User Information</h2>
      <div className='flex items-center justify-between text-sm md:text-md'>
        <span className='font-medium'>Name</span>
        <span className='font-bold'>{name ?? '-'}</span>
      </div>
      <div className='flex items-center justify-between text-sm md:text-md'>
        <span className='font-medium'>Email</span>
        <span className='font-bold'>{email ?? '-'}</span>
      </div>
    </div>
  );
};
