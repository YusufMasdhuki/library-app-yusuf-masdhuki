import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 right-0 h-16 md:h-20 flex justify-center bg-white items-center transition-colors duration-300 z-50 shadow-[0_0_20px_rgba(203,202,202,0.25)]'>
      <div className='flex justify-between items-center gap-4 w-full max-w-300 px-4'>
        {/* LOGO */}
        <div className='flex items-center gap-4'>
          <img
            src='/icons/logo-booky.svg'
            alt='logo booky'
            className='size-10.5'
          />
          <span className='text-display-md font-bold'>Booky</span>
        </div>

        <div className='relative w-full max-w-125'>
          <Search className='absolute top-1/2 left-4 -translate-y-1/2 size-5 text-neutral-600' />
          <Input
            placeholder='Search book'
            className='w-full max-w-125 h-11 rounded-full pl-10.5'
          />
        </div>

        {/* <div className='flex items-center gap-4 w-full max-w-84'>
          <Button variant='primaryWhite' className='w-full max-w-40'>
            Login
          </Button>
          <Button className='w-full max-w-40'>Register</Button>
        </div> */}

        <div className='flex items-center gap-4'>
          <img src='/icons/bag.svg' alt='bag' className='size-8' />
          <div className='flex items-center gap-4'>
            <img
              src='/images/default-avatar.png'
              alt='default avatar'
              className='size-12'
            />
            <span className='text-lg font-semibold'>Name user</span>
            <ChevronDown className='size-6' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
