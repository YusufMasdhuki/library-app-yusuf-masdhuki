import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { Checkbox } from '@/components/ui/checkbox';
import { BorrowFormProps } from './helper';

export const BorrowForm: React.FC<BorrowFormProps> = ({
  duration,
  setDuration,
  agree1,
  setAgree1,
  agree2,
  setAgree2,
  handleConfirm,
  isPending,
}) => {
  return (
    <div className='w-full rounded-3xl shadow-[0_0_20px_rgba(203,202,202,0.25)] p-4 md:p-5 flex flex-col gap-4 md:gap-6'>
      <h2 className='text-xl md:text-display-sm font-bold'>
        Complete Your Borrow Request
      </h2>

      <div>
        <h3 className='text-sm font-bold mb-0.5'>Borrow Date</h3>
        <div className='flex items-center justify-between gap-2 rounded-xl h-12 px-4 bg-neutral-100 border border-neutral-300'>
          <span className='text-md font-semibold'>
            {dayjs().format('DD MMMM YYYY')}
          </span>
          <Calendar className='size-5' />
        </div>
      </div>

      {/* duration */}
      <div className='flex flex-col gap-3'>
        <h3 className='text-sm md:text-md font-bold'>Borrow Duration</h3>
        {[3, 5, 10].map((d) => (
          <label
            key={d}
            className='flex items-center gap-2 text-sm md:text-md font-semibold'
          >
            <input
              type='radio'
              checked={duration === d}
              onChange={() => setDuration(d)}
            />
            {d} days
          </label>
        ))}
      </div>

      {/* return date */}
      <div className='p-3 md:p-4 rounded-xl bg-primary-100'>
        <h3 className='text-sm md:text-md font-bold'>Return Date</h3>
        <p className='text-sm md:text-md font-medium'>
          Please return the book no later than{' '}
          <span className='font-bold text-accent-red'>
            {dayjs().add(duration, 'day').format('DD MMMM YYYY')}
          </span>
        </p>
      </div>

      {/* agreement */}
      <div className='flex flex-col gap-2 text-sm md:text-md font-semibold'>
        <label className='flex items-center gap-2'>
          <Checkbox
            checked={agree1}
            onCheckedChange={(checked) => setAgree1(checked === true)}
            className='data-[state=checked]:bg-primary-300 border-neutral-400 cursor-pointer'
          />
          <span>I agree to return the book(s) before the due date.</span>
        </label>
        <label className='flex items-center gap-2'>
          <Checkbox
            checked={agree2}
            onCheckedChange={(checked) => setAgree2(checked === true)}
            className='data-[state=checked]:bg-primary-300 border-neutral-400 cursor-pointer'
          />
          <span>I accept the library borrowing policy.</span>
        </label>
      </div>

      <Button
        disabled={isPending || !agree1 || !agree2}
        onClick={handleConfirm}
      >
        {isPending ? 'Processing...' : 'Confirm & Borrow'}
      </Button>
    </div>
  );
};
