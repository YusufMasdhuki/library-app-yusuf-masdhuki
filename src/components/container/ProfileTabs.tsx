import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export const ProfileTabs = () => {
  const tabs = [
    { label: 'Profile', to: '/profile' },
    { label: 'Borrowed List', to: '/borrowed-list' },
    { label: 'Reviews', to: '/reviews' },
  ];

  return (
    <div className='flex w-full max-w-[557px] gap-2 p-2 rounded-2xl bg-neutral-100'>
      {tabs.map((tab) => (
        <NavLink key={tab.to} to={tab.to} end className='flex-1'>
          {({ isActive }) => (
            <Button
              variant='tabsPrimary'
              size='tabsPrimary'
              className={clsx(
                'w-full px-0 md:px-3',
                isActive ? 'bg-white' : 'font-medium text-neutral-600'
              )}
            >
              {tab.label}
            </Button>
          )}
        </NavLink>
      ))}
    </div>
  );
};
