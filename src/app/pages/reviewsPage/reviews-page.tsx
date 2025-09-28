import { ProfileTabs } from '@/components/container/ProfileTabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSearchQuery } from '@/store/slices/reviewsSlice';
import ReviewCard from './ReviewCard';
import { useEffect, useMemo } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorScreen from '@/components/common/ErrorScreen';
import { useInView } from 'react-intersection-observer';
import { useGetMyReviewsInfinite } from '@/hooks/me/useMe';
import type { MyReview } from '@/types/me-review-type';

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.reviews.searchQuery
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyReviewsInfinite({ limit: 10 });

  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  // gabungkan semua pages
  const allReviews: MyReview[] = useMemo(
    () => data?.pages.flatMap((page) => page.data.reviews) ?? [],
    [data]
  );

  // filter pakai searchQuery
  const filteredReviews = allReviews.filter((review) =>
    review.book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='pb-12 pt-20 md:py-32'>
      <div className='max-w-300 mx-auto px-4 w-full'>
        <ProfileTabs />
        <h1 className='text-display-xs md:text-display-sm font-bold my-4 md:my-6'>
          Reviews
        </h1>

        {/* Search box */}
        <div className='relative mb-4 md:mb-6'>
          <Search className='absolute top-1/2 left-4 -translate-y-1/2 size-5 text-neutral-600' />
          <Input
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder='Search Reviews'
            className='w-full max-w-[544px] h-11 rounded-full pl-10.5'
          />
        </div>

        {/* Content */}
        {isLoading && <LoadingScreen />}
        {isError && (
          <ErrorScreen message={error?.message ?? 'Something went wrong'} />
        )}

        {filteredReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}

        {/* Infinite scroll trigger */}
        <div ref={ref} className='h-10 flex items-center justify-center'>
          {isFetchingNextPage && <p>Loading more...</p>}
        </div>

        {filteredReviews.length === 0 && !isLoading && (
          <p className='text-center text-gray-500 mt-6'>No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
