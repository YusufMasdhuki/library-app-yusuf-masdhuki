import { PasswordInput } from '@/components/container/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegister } from '@/hooks/auth/useAuth';
import { errorToast, successToast } from '@/lib/toast-helper';
import { RegisterFormValues, registerSchema } from '@/schemas/register-schema';
import { RegisterErrorResponse } from '@/types/auth-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { mutate, isPending } = useRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: RegisterFormValues) => {
    mutate(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          successToast('Register berhasil 🎉');
          navigate('/login'); // ✅ redirect ke login
        },
        onError: (error: AxiosError<RegisterErrorResponse>) => {
          const message = error?.response?.data?.message || 'Register gagal';
          errorToast(message);
        },
      }
    );
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

        {/* Heading */}
        <h1 className='text-display-sm font-bold mb-2'>Register</h1>
        <p className='text-md font-semibold text-neutral-700 mb-5'>
          Create your account to start borrowing books.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Name */}
          <div className='flex flex-col gap-0.5'>
            <Label htmlFor='name' className='text-sm font-bold'>
              Name
            </Label>
            <Input
              type='text'
              id='name'
              placeholder='Enter your Name'
              className='h-12 border border-neutral-300 rounded-xl'
              {...register('name')}
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className='flex flex-col gap-0.5'>
            <Label htmlFor='email' className='text-sm font-bold'>
              Email
            </Label>
            <Input
              type='email'
              id='email'
              placeholder='Enter your Email'
              className='h-12 border border-neutral-300 rounded-xl'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
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

          {/* Confirm Password */}
          <div className='flex flex-col gap-0.5'>
            <Label htmlFor='confirmPassword' className='text-sm font-bold'>
              Confirm Password
            </Label>
            <PasswordInput
              id='confirmPassword'
              placeholder='Confirm your Password'
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </div>

          {/* Submit */}
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? 'Loading...' : 'Submit'}
          </Button>

          {/* Link login */}
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
