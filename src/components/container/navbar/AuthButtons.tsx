import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useIsMobile } from '@/lib/use-is-mobile';
import { AnimatePresence, motion } from 'motion/react';

const AuthButtons = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <div>
        {/* Hamburger / X button */}
        <Button
          size='icon'
          className='bg-transparent text-black outline-none'
          onClick={() => setOpen(!open)}
        >
          {open ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </Button>

        {/* Slide down bar with animation */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className='fixed top-16 left-0 w-full bg-white shadow-md border-t border-gray-200 flex gap-4 p-3 z-40 md:hidden'
            >
              <Link
                to='/login'
                className='flex-1'
                onClick={() => setOpen(false)}
              >
                <Button variant='primaryWhite' className='w-full'>
                  Login
                </Button>
              </Link>
              <Link
                to='/register'
                className='flex-1'
                onClick={() => setOpen(false)}
              >
                <Button className='w-full'>Register</Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop
  return (
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
  );
};

export default AuthButtons;
