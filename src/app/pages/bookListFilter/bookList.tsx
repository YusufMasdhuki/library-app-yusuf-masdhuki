import ErrorScreen from '@/components/common/ErrorScreen';
import BookCard from '@/components/container/book-card';
import BookListFilterLoading from '@/components/common/skeleton/book-list-filter-loading';
import { useGetBooksInfinite } from '@/hooks/books/useBook';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

const BookList = () => {
  const { categoryId, rating, q, authorId } = useSelector(
    (state: RootState) => state.bookFilter
  );

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetBooksInfinite({
    limit: 10,
    q,
    categoryId,
    authorId,
  });

  const { ref, inView } = useInView({ threshold: 1 });

  // trigger fetch ketika sentinel kelihatan
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // gabung semua page
  let books = data?.pages.flatMap((page) => page.data.books) || [];

  // Filter client-side
  if (categoryId) {
    books = books.filter((b) => b.category.id === categoryId);
  }
  if (rating) {
    books = books.filter((b) => Math.floor(b.rating) === rating);
  }
  if (q) {
    books = books.filter((b) =>
      b.title.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (isLoading) return <BookListFilterLoading />;
  if (isError) {
    return <ErrorScreen message={error?.message} />;
  }
  if (books.length === 0) return <div>No books found</div>;

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
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

      {/* sentinel untuk infinite scroll */}
      <div ref={ref} className='h-10 flex justify-center items-center'>
        {isFetchingNextPage && <span>Loading more...</span>}
      </div>
    </>
  );
};

export default BookList;
