import { useEffect } from 'react';
import BookFilter from './book-filter';
import BookList from './bookList';

const BookListFilterPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='py-32'>
      <div className='max-w-300 w-full mx-auto px-4'>
        <h1 className='text-display-lg font-bold mb-8'>Book List</h1>
        <div className='flex gap-10'>
          <div>
            <BookFilter />
          </div>
          <div>
            <BookList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookListFilterPage;
