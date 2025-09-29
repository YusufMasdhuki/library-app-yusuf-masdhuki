import BookCardSkeleton from './book-card-skeleton';

const RecommendedLoading = () => {
  return (
    <>
      <h1 className='text-display-xs md:text-display-lg font-bold mb-5 md:mb-10 mt-6 md:mt-12'>
        Recommendation
      </h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 pb-5 md:pb-12'>
        {Array.from({ length: 10 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
};

export default RecommendedLoading;
