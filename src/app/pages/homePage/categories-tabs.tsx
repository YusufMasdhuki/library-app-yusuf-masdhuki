import { bookCategories } from '@/constants/book-categories-data';
import { Link } from 'react-router-dom';

const CategoriesTabs = () => {
  return (
    <div className='grid grid-cols-3 md:grid-cols-6 gap-4'>
      {bookCategories.map((cat) => (
        <Link
          key={cat.label}
          to={cat.link}
          className='flex items-center justify-center flex-col gap-3 text-center cursor-pointer shadow-[0_0_20px_rgba(203,202,202,0.25)] rounded-2xl p-3 hover:scale-105 transition-all duration-300'
        >
          <div className='h-16 w-full rounded-xl flex items-center justify-center bg-[#E0ECFF]'>
            <img src={cat.icon} alt={cat.label} className='size-13' />
          </div>
          <span className='text-md font-semibold'>{cat.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesTabs;
