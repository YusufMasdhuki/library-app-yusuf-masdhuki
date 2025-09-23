import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const CheckOutPage = () => {
  return (
    <div className='py-32'>
      <div className='max-w-300 mx-auto px-4 w-full'>
        <h1 className='text-display-lg font-bold mb-8'>Checkout</h1>
        <div className='flex gap-14.5'>
          <div className='flex-[4.8] basis-80'>
            <div className='flex flex-col gap-4 pb-8 border-b border-neutral-300'>
              <h2>User Information</h2>
              <div className='flex items-center justify-between'>
                <span>Name</span>
                <span>John Doe</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>Email</span>
                <span>john.doe@me.com</span>
              </div>
            </div>
            <div className='flex flex-col gap-4 pt-8'>
              <h2>Book List</h2>
            </div>
          </div>
          <div className='flex-[5.2] basis-80'>
            <div className='w-full rounded-2xl shadow-[0_0_20px_rgba(203,202,202,0.25)] p-5 flex flex-col gap-6'>
              <h2>Complete Your Borrow Request</h2>
              <div>
                <h3>Borrow Date</h3>
                <div className='flex items-center justify-between gap-2 rounded-xl h-12 px-4 bg-neutral-100 border border-neutral-300'>
                  <span>31 August 2025</span>
                  <Calendar />
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <h3>Borrow Duration</h3>
                <div>3 days</div>
                <div>5 days</div>
                <div>10 days</div>
              </div>
              <div className='p-4 rounded-xl bg-primary-100'>
                <h3>Return Date</h3>
                <p>Please return the book no later than 31 August 2025 </p>
              </div>
              <div>
                <div>
                  <span>
                    I agree to return the book(s) before the due date.
                  </span>
                </div>
                <div>
                  <span>I accept the library borrowing policy.</span>
                </div>
              </div>
              <Button>Confirm & Borrow</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
