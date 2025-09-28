import { CartItem } from '@/store/slices/cart-slice';

interface BookListProps {
  books: CartItem[];
}

export const BookList = ({ books }: BookListProps) => {
  return (
    <div className='flex flex-col gap-4 pt-4 md:pt-8 text-neutral-950'>
      <h2 className='text-lg md:text-display-xs font-bold'>Book List</h2>
      {books.map((book) => (
        <div
          key={book.id}
          className='flex items-center h-[106px] md:h-[138px] gap-4'
        >
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className='w-17.5 md:w-23 h-[106px] md:h-[138px] object-cover'
            />
          ) : (
            <div className='w-17.5 md:w-23 h-[106px] md:h-[138px] text-xs md:text-sm bg-gray-200 flex items-center justify-center'>
              No Image
            </div>
          )}
          <div className='flex flex-col gap-1'>
            <span className='text-sm font-bold max-w-max rounded-sm px-2 h-7 border border-neutral-300'>
              {book.category}
            </span>
            <h3 className='text-md md:text-xl font-bold line-clamp-1'>
              {book.title}
            </h3>
            <p className='text-sm md:text-md font-medium text-neutral-700'>
              {book.authorName}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
