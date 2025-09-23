// src/components/container/Navbar.tsx
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useGetMe } from '@/hooks/me/useMe';
import type { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { setSearchQuery } from '@/store/slices/bookFilterSlice';
import { ChevronDown, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: me, isLoading } = useGetMe({
    enabled: isAuthenticated,
  });

  const user = me?.data?.profile;

  const searchQuery = useSelector((state: RootState) => state.bookFilter.q);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const navigate = useNavigate();

  useEffect(() => {
    if (localQuery !== searchQuery) {
      dispatch(setSearchQuery(localQuery));
      navigate('/book-list-filter');
    }
  }, [localQuery, searchQuery, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
  };

  return (
    <div className='fixed top-0 left-0 right-0 h-16 md:h-20 flex justify-center bg-white items-center transition-colors duration-300 z-50 shadow-[0_0_20px_rgba(203,202,202,0.25)]'>
      <div className='flex justify-between items-center gap-4 w-full max-w-300 px-4'>
        {/* LOGO */}
        <div className='flex items-center gap-4'>
          <Link
            to='/'
            className='flex items-center gap-4 hover:opacity-80 transition-opacity duration-200'
          >
            <img
              src='/icons/logo-booky.svg'
              alt='logo booky'
              className='size-10.5'
            />
            <span className='text-display-md font-bold'>Booky</span>
          </Link>
        </div>

        {/* Search */}
        {isAuthenticated && (
          <div className='relative w-full max-w-125'>
            <Search className='absolute top-1/2 left-4 -translate-y-1/2 size-5 text-neutral-600' />
            <Input
              placeholder='Search book'
              className='w-full h-11 rounded-full pl-10.5'
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
            />
          </div>
        )}

        {/* Kalau BELUM LOGIN */}
        {!isAuthenticated && (
          <div className='flex items-center gap-4 w-full max-w-84'>
            <Link to='/login' className='w-full max-w-40'>
              <Button variant='primaryWhite' className='w-full'>
                Login
              </Button>
            </Link>
            <Link to='/register' className='w-full max-w-40'>
              <Button className='w-full'>Register</Button>
            </Link>
          </div>
        )}

        {/* Kalau SUDAH LOGIN */}
        {isAuthenticated && (
          <div className='flex items-center gap-4'>
            {/* Bag */}
            <img src='/icons/bag.svg' alt='bag' className='size-8' />

            {/* Avatar + Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='flex items-center gap-3 cursor-pointer'>
                  <img
                    src='/images/default-avatar.png'
                    alt='avatar'
                    className='size-12 rounded-full'
                  />
                  <span className='text-lg font-semibold'>
                    {isLoading ? 'Loading...' : user?.name}
                  </span>
                  <ChevronDown className='size-5' />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to='/profile'>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to='/borrowed'>Borrowed List</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to='/reviews'>Reviews</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
