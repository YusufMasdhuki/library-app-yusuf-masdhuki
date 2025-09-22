import { useGetRecommendedBooks } from '@/hooks/books/useBook';

const HomePage = () => {
  const { data, isLoading, isError, error } = useGetRecommendedBooks({
    limit: 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>Error: {error?.message || 'Something went wrong'}</div>;

  const books = data?.data?.books || []; // perhatikan akses data di data.data.books

  return (
    <div className='max-w-300 px-4 pt-32 mx-auto mb-29'>
      <h1 className='text-display-lg font-bold mb-4'>Recommendation</h1>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {books.map((book) => (
          <div key={book.id} className='border p-2 rounded shadow'>
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                className='w-full h-84 object-cover mb-2 rounded'
              />
            ) : (
              <div className='w-full h-84 bg-gray-200 flex items-center justify-center mb-2 rounded'>
                No Image
              </div>
            )}
            <h2 className='font-semibold'>{book.title}</h2>
            <p className='text-sm text-gray-500'>{book.author.name}</p>
            <p className='text-xs text-gray-400'>{book.category.name}</p>
            <p className='text-sm font-medium mt-1'>Rating: {book.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
