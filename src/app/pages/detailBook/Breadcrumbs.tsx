import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  currentTitle: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentTitle }) => {
  return (
    <div className='mb-4 md:mb-6 text-sm font-semibold flex items-center gap-1'>
      <Link to='/' className='flex items-center gap-1 group'>
        <p className='group-hover:underline group-hover:text-primary-300'>
          Home
        </p>
        <ChevronRight className='size-4 group-hover:text-primary-300' />
      </Link>
      <Link to='/book-list-filter' className='flex items-center gap-1 group'>
        <p className='group-hover:underline group-hover:text-primary-300'>
          Category
        </p>
        <ChevronRight className='size-4 group-hover:text-primary-300' />
      </Link>
      <span className='font-bold text-neutral-800 line-clamp-1'>
        {currentTitle}
      </span>
    </div>
  );
};

export default Breadcrumbs;
