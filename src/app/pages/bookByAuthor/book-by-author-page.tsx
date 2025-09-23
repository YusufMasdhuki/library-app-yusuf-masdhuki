import BookCard from '@/components/container/book-card';
import { useGetAuthorBooks } from '@/hooks/authors/useAuthor';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookByAuthorPage = () => {
  const { authorId } = useParams(); // ambil dari URL: /authors/:authorId
  const { data, isLoading, isError } = useGetAuthorBooks(Number(authorId));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Failed to load author books.</p>;

  const { author, books } = data.data;

  return (
    <div className='py-32'>
      <div className='max-w-300 mx-auto px-4'>
        {/* Author Info */}
        <div className='w-full flex items-center gap-4 p-4 rounded-2xl shadow-[0_0_20px_rgba(203,202,202,0.25)]'>
          <img
            src='/images/default-avatar.png'
            alt={author.name}
            className='size-20 rounded-full object-cover'
          />
          <div className='flex flex-col gap-0.5'>
            <h1 className='text-lg font-bold'>{author.name}</h1>
            <div className='flex items-center gap-1.5'>
              <img src='/icons/book-icon.svg' alt='book' className='size-6' />
              <p className='text-md font-medium'>{books.length} books</p>
            </div>
          </div>
        </div>

        {/* Book List */}
        <h1 className='text-display-lg font-bold mb-8 mt-8'>Book List</h1>
        {books.length === 0 ? (
          <p className='text-neutral-500'>No books available</p>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-5 gap-6'>
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
