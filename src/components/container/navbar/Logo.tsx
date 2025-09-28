import { Link } from 'react-router-dom';

const Logo = () => (
  <Link
    to='/'
    className='flex items-center gap-4 hover:opacity-80 transition-opacity duration-200'
  >
    <img
      src='/icons/logo-booky.svg'
      alt='logo booky'
      className='size-10 md:size-10.5'
    />
    {/* Hanya tampil di md ke atas */}
    <span className='hidden md:inline text-display-sm lg:text-display-md font-bold'>
      Booky
    </span>
  </Link>
);

export default Logo;
