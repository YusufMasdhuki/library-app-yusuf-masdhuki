// src/components/ui/password-input.tsx
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/input';
import { PasswordInputProps } from '@/interfaces/PasswordInputProps';

export const PasswordInput: React.FC<PasswordInputProps> = ({
  error,
  ...props
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className='relative'>
      <Input
        type={show ? 'text' : 'password'}
        className='h-12 border border-neutral-300 rounded-xl pr-10 text-sm md:text-md font-semibold'
        {...props}
      />
      <button
        type='button'
        onClick={() => setShow(!show)}
        className='absolute right-3 top-6 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 cursor-pointer'
        tabIndex={-1}
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};
