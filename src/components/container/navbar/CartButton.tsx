import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { Link } from 'react-router-dom';

const CartButton = () => {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);

  return (
    <Link to='/cart' className='relative'>
      <img src='/icons/bag.svg' alt='bag' className='size-8' />

      {cartCount > 0 && (
        <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
