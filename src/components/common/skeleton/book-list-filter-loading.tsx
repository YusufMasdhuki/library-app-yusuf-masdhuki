import BookCardSkeleton from './book-card-skeleton';

const BookListFilterLoading = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
      {Array.from({ length: 10 }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default BookListFilterLoading;
