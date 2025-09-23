// src/pages/LoginPage.tsx
import { PasswordInput } from '@/components/container/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/hooks/auth/useAuth';
import { errorToast, successToast } from '@/lib/toast-helper';
import { LoginFormValues, loginSchema } from '@/schemas/login-schema';
import { setCredentials } from '@/store/slices/authSlice';
import type { LoginRequest } from '@/types/auth-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data as LoginRequest, {
      onSuccess: (res) => {
        // Ambil dari res.data
        const { token, user } = res.data;
        dispatch(setCredentials({ user, token }));

        successToast('Login successful!');
        navigate('/');
      },
      onError: (err) => {
        console.error('[LoginPage] Login failed:', err); // 🔍 Debug
        errorToast(err.response?.data.message || 'Login failed');
      },
    });
  };

  return (
    <div className='flex items-center justify-center py-25 min-h-screen text-neutral-950'>
      <div className='max-w-100 w-full'>
        {/* Logo */}
        <div className='flex items-center gap-3 mb-5'>
          <img
            src='/icons/logo-booky.svg'
            alt='logo booky'
            className='size-8'
          />
          <span className='text-display-xs font-bold'>Booky</span>
        </div>

        {/* Title */}
        <h1 className='text-display-sm font-bold mb-2'>Login</h1>
        <p className='text-md font-semibold text-neutral-700 mb-5'>
          Sign in to manage your library account.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Email */}
          <div className='flex flex-col gap-0.5'>
            <Label htmlFor='email' className='text-sm font-bold'>
              Email
            </Label>
            <Input
              type='email'
              id='email'
              placeholder='Enter your Email'
              {...register('email')}
              className='h-12 border border-neutral-300 rounded-xl'
            />
            {errors.email && (
              <p className='text-xs text-red-500'>{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className='flex flex-col gap-0.5'>
            <Label htmlFor='password' className='text-sm font-bold'>
              Password
            </Label>
            <PasswordInput
              id='password'
              placeholder='Enter your Password'
              {...register('password')}
              error={errors.password?.message}
            />
          </div>

          {/* Button */}
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </Button>

          {/* Register Link */}
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
