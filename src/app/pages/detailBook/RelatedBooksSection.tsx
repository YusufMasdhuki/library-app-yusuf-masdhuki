import BookCard from '@/components/container/book-card';
import { Book } from '@/types/recommend-book-type';

interface RelatedBooksSectionProps {
  relatedBooks: Book[];
}

const RelatedBooksSection: React.FC<RelatedBooksSectionProps> = ({
  relatedBooks,
}) => {
  if (relatedBooks.length === 0) return null;

  return (
    <div className='pt-6 md:pt-16 border-t border-neutral-300'>
      <h2 className='text-display-xs md:text-display-lg font-bold mb-5 md:mb-10'>
        Related Books
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {relatedBooks.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            coverImage={book.coverImage}
            authorName={book.author.name}
            authorId={book.author.id}
            rating={book.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedBooksSection;
