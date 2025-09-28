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
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorScreen from '@/components/common/ErrorScreen';

const DetailBook = () => {
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [bookId]);

  const { data, isLoading, isError, error } = useGetBookDetail(bookId);
  const book = data?.data;

  const { data: recommendedData } = useGetRecommendedBooks({
    limit: 5,
    categoryId: book?.category.id,
  });
  const recommendedBooks = recommendedData?.data?.books || [];

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen message={error?.message} />;
  if (!book) return <div>No book found</div>;

  return (
    <div className='pt-20 pb-12 md:py-32'>
      <div className='max-w-300 mx-auto px-4'>
        <Breadcrumbs currentTitle={book.title} category={book.category} />
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
