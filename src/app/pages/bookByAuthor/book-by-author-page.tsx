import ErrorScreen from '@/components/common/ErrorScreen';
import LoadingScreen from '@/components/common/LoadingScreen';
import BookCard from '@/components/container/book-card';
import { useGetAuthorBooks } from '@/hooks/authors/useAuthor';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookByAuthorPage = () => {
  const { authorId } = useParams(); // ambil dari URL: /authors/:authorId
  const { data, isLoading, isError, error } = useGetAuthorBooks(
    Number(authorId)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <LoadingScreen />;
  if (isError || !data) return <ErrorScreen message={error?.message} />;

  const { author, books } = data.data;

  return (
    <div className='pt-20 pb-12 md:py-32'>
      <div className='max-w-300 mx-auto px-4'>
        {/* Author Info */}
        <div className='w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl shadow-[0_0_20px_rgba(203,202,202,0.25)]'>
          <img
            src='/images/default-avatar.png'
            alt={author.name}
            className='size-15 md:size-20 rounded-full object-cover'
          />
          <div className='flex flex-col gap-0.5'>
            <h1 className='text-md md:text-lg font-bold'>{author.name}</h1>
            <div className='flex items-center gap-1.5'>
              <img src='/icons/book-icon.svg' alt='book' className='size-6' />
              <p className='text-sm md:text-md font-medium'>
                {books.length} books
              </p>
            </div>
          </div>
        </div>

        {/* Book List */}
        <h1 className='text-display-xs md:text-display-lg font-bold my-4 md:my-8'>
          Book List
        </h1>
        {books.length === 0 ? (
          <p className='text-neutral-500'>No books available</p>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5'>
            {books.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                coverImage={book.coverImage}
                authorName={author.name}
                rating={book.rating}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookByAuthorPage;
