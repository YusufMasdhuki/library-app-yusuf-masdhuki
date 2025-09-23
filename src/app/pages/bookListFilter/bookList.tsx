import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetBooksInfinite } from '@/hooks/books/useBook';
import BookCard from '@/components/container/book-card';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const BookList = () => {
  const { categoryId, rating, q } = useSelector(
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
  } = useGetBooksInfinite({ limit: 10 });

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong';
    return <div>Error: {message}</div>;
  }
  if (books.length === 0) return <div>No books found</div>;

  return (
    <div className='w-full'>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
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

      {/* sentinel untuk infinite scroll */}
      <div ref={ref} className='h-10 flex justify-center items-center'>
        {isFetchingNextPage && <span>Loading more...</span>}
      </div>
    </div>
  );
};

export default BookList;
