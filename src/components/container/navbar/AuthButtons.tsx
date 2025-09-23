import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AuthButtons = () => (
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

export default AuthButtons;
