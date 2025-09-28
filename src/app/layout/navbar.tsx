import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetMe } from '@/hooks/me/useMe';
import type { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { setSearchQuery } from '@/store/slices/bookFilterSlice';
import SearchBar from '@/components/container/navbar/SearchBar';
import Logo from '@/components/container/navbar/Logo';
import AuthButtons from '@/components/container/navbar/AuthButtons';
import CartButton from '@/components/container/navbar/CartButton';
import UserMenu from '@/components/container/navbar/UserMenu';
import { Search, X } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const searchQuery = useSelector((state: RootState) => state.bookFilter.q);

  const { data: me, isLoading } = useGetMe({ enabled: isAuthenticated });
  const user = me?.data?.profile;

  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

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
        {/* Jika mobileSearchOpen true → layout Logo + SearchBar + X */}
        {!mobileSearchOpen ? (
          <>
            <Logo />

            {isAuthenticated && (
              <div className='hidden md:block w-full pl-10 pr-1 lg:pr-0 lg:pl-0 max-w-80 lg:max-w-125'>
                <SearchBar value={localQuery} onChange={setLocalQuery} />
              </div>
            )}

            {!isAuthenticated && <AuthButtons />}

            {isAuthenticated && (
              <div className='flex items-center gap-4'>
                {/* Icon search hanya di mobile */}
                <button
                  className='md:hidden'
                  onClick={() => setMobileSearchOpen(true)}
                >
                  <Search className='size-6 text-neutral-700' />
                </button>

                <CartButton />
                <UserMenu
                  userName={user?.name}
                  isLoading={isLoading}
                  onLogout={handleLogout}
                />
              </div>
            )}
          </>
        ) : (
          <div className='flex items-center gap-4 w-full'>
            <Logo />
            <SearchBar value={localQuery} onChange={setLocalQuery} />
            <button onClick={() => setMobileSearchOpen(false)}>
              <X className='size-6 text-neutral-700' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
