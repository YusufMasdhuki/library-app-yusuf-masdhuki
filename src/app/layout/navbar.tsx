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

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const searchQuery = useSelector((state: RootState) => state.bookFilter.q);

  const { data: me, isLoading } = useGetMe({ enabled: isAuthenticated });
  const user = me?.data?.profile;

  const [localQuery, setLocalQuery] = useState(searchQuery);

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
        <Logo />

        {isAuthenticated && (
          <SearchBar value={localQuery} onChange={setLocalQuery} />
        )}

        {!isAuthenticated && <AuthButtons />}

        {isAuthenticated && (
          <div className='flex items-center gap-4'>
            <CartButton />
            <UserMenu
              userName={user?.name}
              isLoading={isLoading}
              onLogout={handleLogout}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
