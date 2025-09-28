import { Button } from '@/components/ui/button';
import CategoriesTabs from './categories-tabs';
import PopularAuthors from './popular-authors';
import RecommendedBooks from './RecommendedBooks';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate('/book-list-filter');
  };
  return (
    <div className='max-w-300 px-4 pt-20 md:pt-32 mx-auto pb-4 md:pb-12'>
      <img
        src='/images/hero-image.png'
        alt='hero image'
        className='w-full h-full mb-6 md:mb-20 object-cover'
      />
      <CategoriesTabs />
      <RecommendedBooks />
      <Button
        variant='primaryWhite'
        className='mx-auto mb-6 md:mb- h-10 md:h-12'
        onClick={handleSeeAll}
      >
        See All Books
      </Button>
      <PopularAuthors />
    </div>
  );
};

export default HomePage;
