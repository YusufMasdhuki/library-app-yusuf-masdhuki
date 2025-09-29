import { Button } from '@/components/ui/button';
import { getBookStats } from '@/constants/stats';
import { useIsMobile } from '@/lib/use-is-mobile';
import { addToCart, setCheckoutNow } from '@/store/slices/cart-slice';
import clsx from 'clsx';
import { Share2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BookInfoSectionProps } from './helper';

const BookInfoSection: React.FC<BookInfoSectionProps> = ({ book }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: book.id,
        title: book.title,
        coverImage: book.coverImage,
        authorName: book.author.name,
        category: book.category.name,
      })
    );
  };

  const handleBorrowNow = () => {
    dispatch(
      setCheckoutNow({
        id: book.id,
        title: book.title,
        coverImage: book.coverImage,
        authorName: book.author.name,
        category: book.category.name,
      })
    );
    navigate('/checkout');
  };

  return (
    <div className='flex flex-col md:flex-row items-center md:items-start gap-9 pb-6 md:pb-16 border-b border-neutral-300'>
      {/* Cover */}
      {book.coverImage ? (
        <img
          src={book.coverImage}
          alt={book.title}
          className='w-[222px] md:w-[337px] h-82 md:h-[498px] object-contain object-center border-4 border-neutral-300 bg-neutral-200'
        />
      ) : (
        <span className='w-[222px] md:w-[337px] h-82 md:h-[498px] bg-gray-200 flex items-center justify-center'>
          No Image
        </span>
      )}
      {/* Info */}
      <div className='w-full'>
        <div className='inline-block h-7 border border-neutral-300 px-2 text-sm font-bold rounded-sm mb-0.5 md:mb-1'>
          {book.category.name}
        </div>
        <h1 className='text-display-xs md:text-display-sm font-bold mb-0.5 md:mb-1'>
          {book.title}
        </h1>
        <p className='mb-0.5 md:mb-1 text-sm md:text-md font-semibold text-neutral-700'>
          <Link
            to={`/book-by-author/${book.author.id}`}
            className='hover:text-primary-300 transition-all duration-300 ease-out'
          >
            {book.author.name}
          </Link>
        </p>
        <div className='text-md font-bold flex items-center gap-0.5 mb-3 md:mb-5'>
          <img src='/icons/star.svg' alt='star' className='size-6' />
          <span>{book.rating}</span>
        </div>

        {/* Stats */}
        <div className='flex items-center divide-x divide-neutral-300 pb-4 md:pb-5 border-b border-neutral-300'>
          {getBookStats(book).map((stat, idx) => (
            <div
              key={stat.label}
              className={clsx('flex flex-col px-5', idx === 0 && 'pr-5 pl-0')}
            >
              <p className='text-lg md:text-display-xs font-bold'>
                {stat.value}
              </p>
              <p className='text-sm md:text-md font-medium'>{stat.label}</p>
            </div>
          ))}
        </div>
        <h3 className='text-xl font-bold mb-1 mt-4 md:mt-5'>Description</h3>
        <p className='text-sm md:text-md font-medium'>{book.description}</p>
        {/* Buttons Desktop */}
        {!isMobile && (
          <div className='flex items-center gap-3 mt-5'>
            <Button
              className='w-full max-w-50 px-0'
              variant='primaryWhite'
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button className='w-full max-w-50 px-0' onClick={handleBorrowNow}>
              Borrow Book
            </Button>
            <Button size='icon' variant='primaryWhite'>
              <Share2 className='size-5' />
            </Button>
          </div>
        )}
      </div>

      {/* Buttons Mobile (fixed bar) */}
      {isMobile && (
        <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-300 shadow-[0_0_20px_rgba(203,202,202,0.25)] px-4 h-18 flex items-center gap-3 z-50'>
          <Button
            className='flex-1'
            variant='primaryWhite'
            size='lg'
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button className='flex-1' size='lg' onClick={handleBorrowNow}>
            Borrow Book
          </Button>
          <Button size='icon' variant='primaryWhite'>
            <Share2 className='size-5' />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookInfoSection;
