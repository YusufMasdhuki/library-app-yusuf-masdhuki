import { Button } from '@/components/ui/button';

const CartPage = () => {
  return (
    <div className='py-32'>
      <div className='max-w-300 mx-auto px-4 w-full'>
        <h1 className='text-display-lg font-bold mb-8'>My Cart</h1>
        <div className='flex justify-between gap-10'>
          {/* cart list */}
          <div></div>
          <div>
            <div className='p-5 rounded-2xl shadow-[0_0_20px_rgba(203,202,202,0.25)] w-[318px] flex flex-col gap-4'>
              <h2 className='text-xl font-bold'>Loan Summary</h2>
              <div className='flex items-center justify-between'>
                <span>Total Book</span>
                <span>2 Items</span>
              </div>
              <Button>Borrow Book</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
