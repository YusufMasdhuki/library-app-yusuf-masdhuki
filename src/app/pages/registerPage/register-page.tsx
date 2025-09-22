import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
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
        <h1 className='text-display-sm font-bold mb-2'>Register</h1>
        <p className='text-md font-semibold text-neutral-700 mb-5'>
          Create your account to start borrowing books.
        </p>
        <form action='' className='space-y-4'>
          <div className='flex flex-col gap-0.5'>
            <Label htmlFor='name' className='text-sm font-bold'>
              Name
            </Label>
            <Input
              type='name'
              id='name'
              placeholder='Enter your Name'
              required
              className='h-12 border border-neutral-300 rounded-xl'
            />
          </div>
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
            <Label htmlFor='phone' className='text-sm font-bold'>
              Phone Number
            </Label>
            <Input
              type='phone'
              id='phone'
              placeholder='Enter your Phone Number'
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
          <div className='flex flex-col gap-0.5'>
            <Label htmlFor='confirm-password' className='text-sm font-bold'>
              Confirm Password
            </Label>
            <Input
              type='password'
              id='confirm-password'
              placeholder='Confirm your Password'
              required
              className='h-12 border border-neutral-300 rounded-xl'
            />
          </div>
          <Button className='w-full'>Submit</Button>
          <p className='text-md font-semibold'>
            Already have an account?{' '}
            <Link to='/login' className='text-primary-300 font-bold'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
