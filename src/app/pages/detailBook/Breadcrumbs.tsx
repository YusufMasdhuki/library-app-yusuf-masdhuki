import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbsProps } from './helper';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentTitle,
  category,
}) => {
  return (
    <div className='mb-4 md:mb-6 text-sm font-semibold flex items-center gap-1'>
      <Link to='/' className='flex items-center gap-1 group'>
        <p className='group-hover:underline group-hover:text-primary-300'>
          Home
        </p>
        <ChevronRight className='size-4 group-hover:text-primary-300' />
      </Link>

      {category && (
        <Link
          to={`/book-list-filter?categoryId=${category.id}`}
          className='flex items-center gap-1 group'
        >
          <p className='group-hover:underline group-hover:text-primary-300'>
            {category.name}
          </p>
          <ChevronRight className='size-4 group-hover:text-primary-300' />
        </Link>
      )}

      <span className='font-bold text-neutral-800 line-clamp-1'>
        {currentTitle}
      </span>
    </div>
  );
};

export default Breadcrumbs;
