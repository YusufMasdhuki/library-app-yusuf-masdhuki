import React from 'react';
import { Link } from 'react-router-dom';

interface BookCardProps {
  id: number;
  title: string;
  coverImage?: string | null;
  authorName: string;
  rating: number;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  coverImage,
  authorName,
  rating,
}) => {
  return (
    <Link to={`/detail-book/${id}`}>
      <div className='rounded-xl overflow-hidden shadow-[0_0_20px_rgba(203,202,202,0.25)] hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_rgba(203,202,202,0.8)] w-full'>
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className='w-full h-84 object-cover'
          />
        ) : (
          <div className='w-full h-84 bg-gray-200 flex items-center justify-center object-cover'>
            <span className='text-neutral-500 text-sm'>No Image</span>
          </div>
        )}
        <div className='p-4 text-neutral-900 flex flex-col gap-1 w-full'>
          <h2 className='font-bold text-lg line-clamp-1'>{title}</h2>
          <p className='text-md font-medium text-neutral-700'>{authorName}</p>
          <div className='flex items-center gap-0.5'>
            <img src='/icons/star.svg' alt='star' className='size-6' />
            <span className='text-md font-semibold'>{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
