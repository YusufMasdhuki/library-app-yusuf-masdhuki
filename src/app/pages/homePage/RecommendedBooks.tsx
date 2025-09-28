import ErrorScreen from '@/components/common/ErrorScreen';
import LoadingScreen from '@/components/common/LoadingScreen';
import BookCard from '@/components/container/book-card';
import { useGetRecommendedBooks } from '@/hooks/books/useBook';

const RecommendedBooks = () => {
  const { data, isLoading, isError, error } = useGetRecommendedBooks({
    limit: 50,
  });

  if (isLoading) return <LoadingScreen className='min-h-20' />;
  if (isError)
    return <ErrorScreen message={error?.message} className='min-h-20' />;

  const books = data?.data?.books || [];

  return (
    <>
      <h1 className='text-display-xs md:text-display-lg font-bold mb-5 md:mb-10 mt-6 md:mt-12'>
        Recommendation
      </h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 pb-5 md:pb-12'>
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            coverImage={book.coverImage}
            authorName={book.author.name}
            authorId={book.author.id}
            rating={book.rating}
          />
        ))}
      </div>
    </>
  );
};

export default RecommendedBooks;
