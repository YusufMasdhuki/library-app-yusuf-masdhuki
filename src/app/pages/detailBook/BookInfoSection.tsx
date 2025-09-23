import { Button } from '@/components/ui/button';
import { addToCart } from '@/store/slices/cart-slice';
import { Book } from '@/types/book-type';
import { Share2 } from 'lucide-react';
import { useDispatch } from 'react-redux';

interface BookInfoSectionProps {
  book: Book;
}

const BookInfoSection: React.FC<BookInfoSectionProps> = ({ book }) => {
  const dispatch = useDispatch();

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

  return (
    <div className='flex items-start gap-9 pb-16 border-b border-neutral-300'>
      {/* Cover */}
      {book.coverImage ? (
        <img
          src={book.coverImage}
          alt={book.title}
          className='w-auto h-120 aspect-3/4 object-contain object-center mb-4 border-4 border-neutral-300 bg-neutral-200'
        />
      ) : (
        <span className='w-auto h-120 aspect-3/4 bg-gray-200 flex items-center justify-center mb-4'>
          No Image
        </span>
      )}
      {/* Info */}
      <div>
        <div className='inline-block h-7 border border-neutral-300 px-2 text-sm font-bold rounded-sm mb-1'>
          {book.category.name}
        </div>
        <h1 className='text-display-sm font-bold mb-1'>{book.title}</h1>
        <p className='mb-1 text-md font-semibold text-neutral-700'>
          {book.author.name}
        </p>
        <div className='text-md font-bold flex items-center gap-0.5 mb-5'>
          <img src='/icons/star.svg' alt='star' className='size-6' />
          <span>{book.rating}</span>
        </div>
        {/* Buttons */}
        <div className='flex items-center gap-3 mt-5'>
          <Button className='w-full max-w-50' onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button className='w-full max-w-50'>Borrow Book</Button>
          <Button size='icon' variant='primaryWhite'>
            <Share2 className='size-5' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookInfoSection;
