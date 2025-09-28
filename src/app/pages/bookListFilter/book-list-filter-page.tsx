import { useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import BookFilter from './book-filter';
import BookList from './bookList';
import { useIsMobile } from '@/lib/use-is-mobile';
import { ListFilter } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setCategory } from '@/store/slices/bookFilterSlice';

const BookListFilterPage = () => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Ambil category dari query param
  useEffect(() => {
    const categoryId = searchParams.get('categoryId');
    if (categoryId) {
      dispatch(setCategory(Number(categoryId)));
    }
  }, [searchParams, dispatch]);
  return (
    <div className='pt-20 pb-12 md:py-32'>
      <div className='max-w-300 w-full mx-auto px-4'>
        <h1 className='text-display-xs md:text-display-lg font-bold mb-4 md:mb-8'>
          Book List
        </h1>

        <div className='flex flex-col md:flex-row w-full gap-0 md:gap-10'>
          {isMobile ? (
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
                <VisuallyHidden>
                  <SheetTitle>Filter Buku</SheetTitle>
                </VisuallyHidden>
                <BookFilter />
              </SheetContent>
            </Sheet>
          ) : (
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
