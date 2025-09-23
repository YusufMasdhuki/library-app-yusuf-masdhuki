import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  useGetBookDetail,
  useGetRecommendedBooks,
} from '@/hooks/books/useBook';
import Breadcrumbs from './Breadcrumbs';
import BookInfoSection from './BookInfoSection';
import ReviewsSection from './ReviewsSection';
import RelatedBooksSection from './RelatedBooksSection';

const DetailBook = () => {
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading, isError, error } = useGetBookDetail(bookId);
  const book = data?.data;

  const { data: recommendedData } = useGetRecommendedBooks({
    limit: 5,
    categoryId: book?.category.id,
  });
  const recommendedBooks = recommendedData?.data?.books || [];

  if (isLoading) return <div>Loading book details...</div>;
  if (isError)
    return <div>Error: {error?.message || 'Something went wrong'}</div>;
  if (!book) return <div>No book found</div>;

  return (
    <div className='py-32'>
      <div className='max-w-300 mx-auto px-4'>
        <Breadcrumbs currentTitle={book.title} />
        <BookInfoSection book={book} />
        <ReviewsSection
          reviews={book.reviews}
          rating={book.rating}
          reviewCount={book.reviewCount}
        />
        <RelatedBooksSection relatedBooks={recommendedBooks} />
      </div>
    </div>
  );
};

export default DetailBook;
