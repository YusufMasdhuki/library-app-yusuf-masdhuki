import { useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import BookFilter from './book-filter';
import BookList from './bookList';
import { useIsMobile } from '@/lib/use-is-mobile';
import { ListFilter } from 'lucide-react';

const BookListFilterPage = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='pt-20 pb-12 md:py-32'>
      <div className='max-w-300 w-full mx-auto px-4'>
        <h1 className='text-display-xs md:text-display-lg font-bold mb-4 md:mb-8'>
          Book List
        </h1>

        <div className='flex flex-col md:flex-row w-full gap-0 md:gap-10'>
          {isMobile ? (
            // Mobile: pakai Sheet
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant='outline'
                  className='justify-between mb-4 rounded-xl'
                >
                  Filter <ListFilter className='size-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-3/4'>
                <BookFilter />
              </SheetContent>
            </Sheet>
          ) : (
            // Desktop: tampil biasa
            <div>
              <BookFilter />
            </div>
          )}

          <div className='flex-1'>
            <BookList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookListFilterPage;
