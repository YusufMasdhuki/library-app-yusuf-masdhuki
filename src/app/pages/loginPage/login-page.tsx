import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className='flex items-center justify-center py-25 min-h-screen text-neutral-950'>
      <div className='max-w-100 w-full'>
        <div className='flex items-center gap-3 mb-5'>
          <img
            src='/icons/logo-booky.svg'
            alt='logo booky'
            className='size-8'
          />
          <span className='text-display-xs font-bold'>Booky</span>
        </div>
        <h1 className='text-display-sm font-bold mb-2'>Login</h1>
        <p className='text-md font-semibold text-neutral-700 mb-5'>
          Sign in to manage your library account.
        </p>
        <form action='' className='space-y-4'>
          <div className='flex flex-col gap-0.5'>
            <Label htmlFor='email' className='text-sm font-bold'>
              Email
            </Label>
            <Input
              type='email'
              id='email'
              placeholder='Enter your Email'
              required
              className='h-12 border border-neutral-300 rounded-xl'
            />
          </div>
          <div className='flex flex-col gap-0.5'>
            <Label htmlFor='password' className='text-sm font-bold'>
              Password
            </Label>
            <Input
              type='password'
              id='password'
              placeholder='Enter your Password'
              required
              className='h-12 border border-neutral-300 rounded-xl'
            />
          </div>
          <Button className='w-full'>Login</Button>
          <p className='text-md font-semibold'>
            Don&apos;t have an account?{' '}
            <Link to='/register' className='text-primary-300 font-bold'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
