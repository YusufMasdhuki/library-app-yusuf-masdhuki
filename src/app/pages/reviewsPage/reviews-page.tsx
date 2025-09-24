import { ProfileTabs } from '@/components/container/ProfileTabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useGetMyReviews } from '@/hooks/me/useMe';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSearchQuery } from '@/store/slices/reviewsSlice';
import ReviewCard from './ReviewCard';

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.reviews.searchQuery
  );

  const { data, isLoading, isError } = useGetMyReviews({ page: 1, limit: 10 });

  // filter reviews pakai searchQuery
  const filteredReviews = data?.data.reviews.filter((review) =>
    review.book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='py-32'>
      <div className='max-w-300 mx-auto px-4 w-full'>
        <ProfileTabs />
        <h1 className='text-display-sm font-bold my-6'>Reviews</h1>

        {/* Search box */}
        <div className='relative mb-6'>
          <Search className='absolute top-1/2 left-4 -translate-y-1/2 size-5 text-neutral-600' />
          <Input
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder='Search Reviews'
            className='w-full max-w-[544px] h-11 rounded-full pl-10.5'
          />
        </div>

        {/* Content */}
        {isLoading && <p>Loading reviews...</p>}
        {isError && <p>Failed to load reviews.</p>}

        {filteredReviews?.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}

        {filteredReviews?.length === 0 && !isLoading && (
          <p className='text-center text-gray-500 mt-6'>No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
