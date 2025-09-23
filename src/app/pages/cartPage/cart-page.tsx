import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import {
  clearCart,
  toggleSelectItem,
  selectAll,
  deselectAll,
} from '@/store/slices/cart-slice';
import { Checkbox } from '@/components/ui/checkbox';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const selectedIds = useSelector((state: RootState) => state.cart.selectedIds);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      dispatch(selectAll());
    } else {
      dispatch(deselectAll());
    }
  };

  const handleBorrow = () => {
    console.log('Borrow books:', selectedIds);
    // TODO: panggil API borrow di sini

    // misal setelah borrow, hapus dari cart:
    // selectedIds.forEach((id) => dispatch(removeFromCart(id)));
    // dispatch(deselectAll());
  };

  return (
    <div className='py-32'>
      <div className='max-w-300 mx-auto px-4 w-full'>
        <h1 className='text-display-lg font-bold mb-8'>My Cart</h1>

        {cartItems.length > 0 && (
          <div className='flex items-center gap-2 mb-4'>
            <Checkbox
              checked={selectedIds.length === cartItems.length}
              onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
            />
            <span className='text-sm font-medium'>Select All</span>
          </div>
        )}

        <div className='flex justify-between gap-10'>
          {/* cart list */}
          <div className='flex-1 space-y-4'>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center justify-between p-4 border rounded-lg'
                >
                  <div className='flex items-center gap-4'>
                    <Checkbox
                      checked={selectedIds.includes(item.id)}
                      onCheckedChange={() =>
                        dispatch(toggleSelectItem(item.id))
                      }
                    />
                    {item.coverImage ? (
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className='w-16 h-20 object-cover rounded'
                      />
                    ) : (
                      <div className='w-16 h-20 bg-gray-200 flex items-center justify-center'>
                        No Image
                      </div>
                    )}
                    <div>
                      <h3 className='font-bold'>{item.title}</h3>
                      <p className='text-sm text-gray-600'>{item.authorName}</p>
                      <p className='text-sm text-gray-600'>{item.category}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* summary */}
          <div>
            <div className='p-5 rounded-2xl shadow-[0_0_20px_rgba(203,202,202,0.25)] w-[318px] flex flex-col gap-4'>
              <h2 className='text-xl font-bold'>Loan Summary</h2>
              <div className='flex items-center justify-between'>
                <span>Total Selected</span>
                <span>{selectedIds.length} Items</span>
              </div>
              <Button
                disabled={selectedIds.length === 0}
                onClick={handleBorrow}
              >
                Borrow Book
              </Button>
              <Button variant='secondary' onClick={() => dispatch(clearCart())}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
