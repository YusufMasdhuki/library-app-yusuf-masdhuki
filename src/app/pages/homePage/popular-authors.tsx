import { useGetAuthors } from '@/hooks/authors/useAuthor';
import { authorService } from '@/services/authors/service';
import { useQueries } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const PopularAuthors = () => {
  const { data: authorsData, isLoading, isError, error } = useGetAuthors();

  const navigate = useNavigate();

  // Ambil list author, fallback ke array kosong biar hooks tetap dipanggil
  const authors = authorsData?.data.authors || [];

  // useQueries harus dipanggil setiap render, jangan letakkan di dalam if
  const authorBooksQueries = useQueries({
    queries: authors.map((author) => ({
      queryKey: ['authorBooks', author.id],
      queryFn: () => authorService.getAuthorBooks(author.id),
      enabled: !!author.id,
    })),
  });

  if (isLoading) return <div>Loading authors...</div>;
  if (isError)
    return <div>Error: {error?.message || 'Something went wrong'}</div>;

  return (
    <div className='pt-12 border-t border-neutral-300'>
      <h2 className='text-display-lg font-bold mb-10'>Popular Authors</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {authors.map((author, idx) => {
          const booksData = authorBooksQueries[idx]?.data?.data.books || [];
          return (
            <div
              key={author.id}
              onClick={() => navigate(`/book-by-author/${author.id}`)}
              className='rounded-xl overflow-hidden p-4 flex items-center gap-4 shadow-[0_0_20px_rgba(203,202,202,0.25)] hover:scale-105 hover:shadow-[0_0_20px_rgba(203,202,202,0.8)] transition-all duration-300 ease-out cursor-pointer'
            >
              <img
                src='/images/default-avatar.png'
                alt='default avatar'
                className='size-20'
              />
              <div className='flex flex-col'>
                <div className='text-lg font-bold'>{author.name}</div>
                <div className='flex items-center gap-1.5'>
                  <img
                    src='/icons/book-icon.svg'
                    alt='book icon'
                    className='size-6'
                  />
                  <span className='text-md font-medium text-neutral-900'>
                    {booksData.length} books
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularAuthors;
