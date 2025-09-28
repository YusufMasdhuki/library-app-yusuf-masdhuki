import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/lib/use-is-mobile';
import { ChevronDown, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface UserMenuProps {
  userName?: string;
  isLoading: boolean;
  onLogout: () => void;
}

const UserMenu = ({ userName, isLoading, onLogout }: UserMenuProps) => {
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isMobile) {
    return (
      <div className='relative'>
        {/* Hamburger / X button */}
        <Button
          size='icon'
          variant='tabsPrimary'
          onClick={() => setMobileOpen(!mobileOpen)}
          className='h-10 w-10 px-0'
        >
          {mobileOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <img
              src='/images/default-avatar.png'
              alt='default-avatar'
              className='size-10'
            />
          )}
        </Button>

        {/* Animated mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key='mobile-menu'
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className='fixed top-16 left-4 right-4 bg-white rounded-2xl z-50 flex flex-col gap-4 p-3 shadow-[0_0_20px_rgba(203,202,202,0.25)]'
            >
              <Link to='/profile' onClick={() => setMobileOpen(false)}>
                <Button
                  variant='tabsPrimary'
                  className='w-full justify-start px-0 h-7.5'
                >
                  Profile
                </Button>
              </Link>
              <Link to='/borrowed-list' onClick={() => setMobileOpen(false)}>
                <Button
                  variant='tabsPrimary'
                  className='w-full justify-start px-0 h-7.5'
                >
                  Borrowed List
                </Button>
              </Link>
              <Link to='/reviews' onClick={() => setMobileOpen(false)}>
                <Button
                  variant='tabsPrimary'
                  className='w-full justify-start px-0 h-7.5'
                >
                  Reviews
                </Button>
              </Link>
              <Button
                onClick={() => {
                  onLogout();
                  setMobileOpen(false);
                }}
                variant='tabsPrimary'
                className='w-full justify-start text-red-500 px-0 h-7.5'
              >
                Logout
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop (biasa pakai Radix)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex items-center gap-3 cursor-pointer'>
          <img
            src='/images/default-avatar.png'
            alt='avatar'
            className='size-10 md:size-12 rounded-full'
          />
          <span className='text-md lg:text-lg font-semibold'>
            {isLoading ? 'Loading...' : userName}
          </span>
          <ChevronDown className='size-5' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-48 text-md font-semibold rounded-2xl shadow-[0_0_20px_rgba(203,202,202,0.25)]'
      >
        <DropdownMenuItem asChild>
          <Link to='/profile'>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to='/borrowed-list'>Borrowed List</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to='/reviews'>Reviews</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout} className='text-red-500'>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
