import { Link, useParams } from 'react-router-dom';
import {
  useGetBookDetail,
  useGetRecommendedBooks,
} from '@/hooks/books/useBook';
import { Button } from '@/components/ui/button';
import { ChevronRight, Share2 } from 'lucide-react';
import ReviewCard from '@/components/container/review-card';
import BookCard from '@/components/container/book-card';
import { useEffect } from 'react';

const DetailBook = () => {
  // Ambil bookId dari route parameter
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Pakai hook untuk fetch detail
  const { data, isLoading, isError, error } = useGetBookDetail(Number(bookId));
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
        <div className='mb-6 text-sm font-semibold flex items-center gap-1'>
          <Link to='/' className='flex items-center gap-1 group'>
            <p className='group-hover:underline group-hover:text-primary-300'>
              Home
            </p>
            <ChevronRight className='size-4 group-hover:text-primary-300' />
          </Link>
          <Link
            to='/book-list-filter'
            className='flex items-center gap-1 group'
          >
            <p className='group-hover:underline group-hover:text-primary-300'>
              Category
            </p>
            <ChevronRight className='size-4 group-hover:text-primary-300' />
          </Link>
          <span className='font-bold text-neutral-800'>{book.title}</span>
        </div>
        <div className='flex items-start gap-9 pb-16 border-b border-neutral-300'>
          {/* Cover Image */}
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className='w-auto h-120 aspect-3/4 object-contain object-center mb-4 border-4 border-neutral-300 bg-neutral-200'
            />
          ) : (
            <span className='w-auto h-120 aspect-3/4  bg-gray-200 flex items-center justify-center mb-4'>
              No Image
            </span>
          )}
          <div>
            <div className='inline-block h-7 border border-neutral-300 px-2 text-sm font-bold rounded-sm mb-1'>
              {book.category.name}
            </div>
            <h1 className='text-display-sm font-bold mb-1'>{book.title}</h1>
            <p className='mb-1 text-md font-semibold text-neutral-700'>
              {book.author.name}
            </p>
            <div className='text-md font-bold flex items-center gap-0.5 mb-5'>
              <img src='/icons/star.svg' alt='star' className='size-6' />
              <span>{book.rating}</span>
            </div>
            <div className='flex items-center divide-x divide-neutral-300 pb-5 border-b border-neutral-300'>
              <div className='flex flex-col pr-5'>
                <p className='text-display-xs font-bold'>
                  {book.publishedYear}
                </p>
                <p className='text-md font-medium'>Published Year</p>
              </div>
              <div className='flex flex-col px-5'>
                <p className='text-display-xs font-bold'>{book.totalCopies}</p>
                <p className='text-md font-medium'>Total Copies</p>
              </div>
              <div className='flex flex-col px-5'>
                <p className='text-display-xs font-bold'>{book.reviewCount}</p>
                <p className='text-md font-medium'>Reviews</p>
              </div>
            </div>
            <h3 className='text-xl font-bold mb-1 mt-5'>Description</h3>
            <p className='text-md font-medium'>{book.description}</p>
            <div className='flex items-center gap-3 mt-5'>
              <Button className='w-full max-w-50'>Add to Cart</Button>
              <Button className='w-full max-w-50'>Borrow Book</Button>
              <Button size='icon' variant='primaryWhite'>
                <Share2 className='size-5' />
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className='my-16'>
          <h2 className='text-display-lg font-bold mb-3'>Reviews</h2>
          <div className='flex items-center gap-1 mb-4.5'>
            <img src='/icons/star.svg' alt='star' />
            <p className='text-xl font-bold'>
              {book.rating} ({book.reviewCount} Ulasan)
            </p>
          </div>
          {book.reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-6'>
              {book.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>

        {/* Related Books */}
        {recommendedBooks.length > 0 && (
          <div className='pt-16 border-t border-neutral-300'>
            <h2 className='text-display-lg font-bold mb-4'>Related Books</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
              {recommendedBooks.map((relatedBook) => (
                <BookCard
                  key={relatedBook.id}
                  id={relatedBook.id}
                  title={relatedBook.title}
                  coverImage={relatedBook.coverImage}
                  authorName={relatedBook.author.name}
                  rating={relatedBook.rating}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailBook;
