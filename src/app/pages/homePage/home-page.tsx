import BookCard from '@/components/container/book-card';
import { Button } from '@/components/ui/button';
import { useGetRecommendedBooks } from '@/hooks/books/useBook';
import { useNavigate } from 'react-router-dom';
import CategoriesTabs from './categories-tabs';
import PopularAuthors from './popular-authors';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate('/book-list-filter'); // navigasi ke halaman book list
  };

  const { data, isLoading, isError, error } = useGetRecommendedBooks({
    limit: 10,
  });

  if (isLoading)
    return (
      <div className='h-screen flex items-center justify-center'>
        Loading...
      </div>
    );
  if (isError)
    return <div>Error: {error?.message || 'Something went wrong'}</div>;

  const books = data?.data?.books || [];

  return (
    <div className='max-w-300 px-4 pt-32 mx-auto pb-12'>
      <img
        src='/images/hero-image.png'
        alt='hero image'
        className='w-full h-full mb-20 object-cover'
      />
      <CategoriesTabs />
      <h1 className='text-display-lg font-bold mb-10 mt-12'>Recommendation</h1>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-12'>
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            coverImage={book.coverImage}
            authorName={book.author.name}
            rating={book.rating}
          />
        ))}
      </div>
      <Button
        variant='primaryWhite'
        className='mx-auto mb-12'
        onClick={handleSeeAll}
      >
        See All Books
      </Button>
      <PopularAuthors />
    </div>
  );
};

export default HomePage;
