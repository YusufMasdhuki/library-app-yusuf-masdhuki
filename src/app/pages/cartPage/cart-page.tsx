import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import {
  toggleSelectItem,
  selectAll,
  deselectAll,
  setCheckoutItems,
} from '@/store/slices/cart-slice';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useIsMobile } from '@/lib/use-is-mobile';
import clsx from 'clsx';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const selectedIds = useSelector((state: RootState) => state.cart.selectedIds);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      dispatch(selectAll());
    } else {
      dispatch(deselectAll());
    }
  };

  const handleBorrow = () => {
    if (selectedIds.length > 0) {
      dispatch(setCheckoutItems(selectedIds));
      navigate('/checkout');
    }
  };

  return (
    <div className='pt-20 pb-12 md:py-32'>
      <div className='max-w-300 mx-auto px-4 w-full'>
        <h1 className='text-display-xs md:text-display-lg font-bold mb-4 md:mb-8'>
          My Cart
        </h1>

        {cartItems.length > 0 && (
          <div className='flex items-center gap-4'>
            <Checkbox
              checked={selectedIds.length === cartItems.length}
              onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
              className='data-[state=checked]:bg-primary-300 border-neutral-400 cursor-pointer'
            />
            <span className='text-md font-semibold'>Select All</span>
          </div>
        )}

        <div className='flex justify-between gap-10'>
          {/* cart list */}
          <div className='flex-1  divide-y divide-neutral-300'>
            {cartItems.length === 0 ? (
              <div className='text-center flex items-center justify-center min-h-[50vh]'>
                Your cart is empty.
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className='flex gap-4 py-4 md:py-6'>
                  <Checkbox
                    checked={selectedIds.includes(item.id)}
                    onCheckedChange={() => dispatch(toggleSelectItem(item.id))}
                    className='data-[state=checked]:bg-primary-300 border-neutral-400 cursor-pointer'
                  />
                  <Link
                    to={`/detail-book/${item.id}`}
                    className='flex items-center gap-3 md:gap-4 h-[106px] md:h-[138px]'
                  >
                    {item.coverImage ? (
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className='w-17.5 md:w-23 h-[106px] md:h-[138px] object-cover'
                      />
                    ) : (
                      <div className='w-17.5 md:w-23 h-[106px] md:h-[138px] text-xs md:text-sm bg-gray-200 flex items-center justify-center'>
                        No Image
                      </div>
                    )}
                    <div className='flex flex-col gap-1'>
                      <span className='text-sm font-bold rounded-sm max-w-max px-2 h-7 border border-neutral-300'>
                        {item.category}
                      </span>
                      <h3 className='text-md md:text-xl font-bold line-clamp-1'>
                        {item.title}
                      </h3>
                      <p className='text-sm md:text-md font-medium text-neutral-700'>
                        {item.authorName}
                      </p>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>

          {/* summary */}
          <div
            className={clsx(
              isMobile &&
                'fixed bottom-0 left-0 right-0  bg-white border-t border-neutral-300 shadow-[0_0_20px_rgba(203,202,202,0.25)] px-4'
            )}
          >
            {isMobile ? (
              <div className='flex items-center justify-between h-18'>
                <div>
                  <p className='text-sm font-medium'>Total Book</p>
                  <span className='font-bold text-sm'>
                    {selectedIds.length} Items
                  </span>
                </div>
                <Button
                  className='h-10'
                  disabled={selectedIds.length === 0}
                  onClick={handleBorrow}
                >
                  Borrow Book
                </Button>
              </div>
            ) : (
              <div className='p-5 rounded-2xl shadow-[0_0_20px_rgba(203,202,202,0.25)] w-[318px] flex flex-col gap-6'>
                <h2 className='text-xl font-bold'>Loan Summary</h2>
                <div className='flex items-center justify-between text-md'>
                  <span className='font-medium'>Total Selected</span>
                  <span className='font-bold'>{selectedIds.length} Items</span>
                </div>
                <Button
                  disabled={selectedIds.length === 0}
                  onClick={handleBorrow}
                >
                  Borrow Book
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
