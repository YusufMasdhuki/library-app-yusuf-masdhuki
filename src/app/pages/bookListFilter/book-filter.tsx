import { Button } from '@/components/ui/button';
import { RATING } from '@/constants/rating-filter';
import { useGetCategories } from '@/hooks/categories/useCategory';
import { RootState } from '@/store';
import { setCategory, setRating } from '@/store/slices/bookFilterSlice';
import { useDispatch, useSelector } from 'react-redux';

const BookFilter = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.bookFilter.categoryId
  );
  const selectedRating = useSelector(
    (state: RootState) => state.bookFilter.rating
  );

  // Fetch categories
  const { data: categoryData, isLoading, isError } = useGetCategories();
  const categories = categoryData?.data?.categories || [];

  // Handlers
  const handleCategoryChange = (categoryId?: number) => {
    dispatch(setCategory(categoryId));
  };
  const handleResetCategory = () => dispatch(setCategory(undefined));
  const handleRatingChange = (rating: number) => dispatch(setRating(rating));
  const handleResetRating = () => dispatch(setRating(undefined));

  return (
    <div className='w-[266px] shadow-[0_0_20px_rgba(203,202,202,0.25)] p-4 rounded-xl'>
      <h2 className='font-bold text-md'>FILTER</h2>

      {/* Category */}
      <div className='pt-2.5 pb-3 md:pb-6'>
        <div className='flex justify-between items-center'>
          <h3 className='text-md md:text-lg font-extrabold text-neutral-950'>
            Category
          </h3>
          <Button
            variant='link'
            className='text-sm font-medium text-red-500 hover:underline'
            onClick={handleResetCategory}
          >
            Reset
          </Button>
        </div>

        {isLoading ? (
          <p>Loading categories...</p>
        ) : isError ? (
          <p>Error loading categories</p>
        ) : (
          <div className='flex flex-col gap-2 mt-2'>
            {categories.map((cat) => (
              <label
                key={cat.id}
                className='flex items-center gap-2 cursor-pointer'
              >
                <input
                  type='radio'
                  name='category'
                  value={cat.id}
                  checked={selectedCategory === cat.id}
                  onChange={() => handleCategoryChange(cat.id)}
                  className='cursor-pointer'
                />
                <span className='text-neutral-950'>{cat.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className='flex flex-col gap-2.5 py-3 md:py-6'>
        <div className='flex justify-between items-center'>
          <h4 className='text-md md:text-lg font-extrabold text-neutral-950'>
            Rating
          </h4>
          <Button
            variant='link'
            className='text-sm font-medium text-red-500 hover:underline'
            onClick={handleResetRating}
          >
            Reset
          </Button>
        </div>

        <div className='flex flex-col gap-2 mt-2'>
          {RATING.map((rating) => (
            <label
              key={rating.value}
              className='flex gap-1 items-center cursor-pointer'
            >
              <input
                type='radio'
                name='rating'
                checked={selectedRating === rating.value}
                onChange={() => handleRatingChange(rating.value)}
                className='cursor-pointer'
              />
              <span className='flex items-center gap-0.5'>
                <img src='/icons/star.svg' alt='star' className='size-6' />
                <span>{rating.label}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookFilter;
