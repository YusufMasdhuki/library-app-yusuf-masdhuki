import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Star from '../icons/star';
import { AnimatePresence, motion } from 'motion/react';
import { useCreateReview } from '@/hooks/reviews/useReview';
import { errorToast, successToast } from '@/lib/toast-helper';
import clsx from 'clsx';
import { ReviewDialogProps } from '@/interfaces/ReviewDialogProps';

export const ReviewDialog: React.FC<ReviewDialogProps> = ({
  open,
  onClose,
  bookId,
}) => {
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState('');

  const queryClient = useQueryClient();
  const createReview = useCreateReview(bookId);

  // Reset setiap kali dialog dibuka
  useEffect(() => {
    if (open) {
      setStar(0);
      setComment('');
    }
  }, [open]);

  const handleSubmit = () => {
    createReview.mutate(
      { bookId, star, comment },
      {
        onSuccess: (res) => {
          successToast(res.message);
          queryClient.invalidateQueries({ queryKey: ['bookReviews', bookId] });
          queryClient.invalidateQueries({ queryKey: ['bookDetail', bookId] });
          onClose();
          setStar(0);
          setComment('');
        },
        onError: (err) => {
          errorToast(err.message);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[450px] bg-transparent p-4'>
        <AnimatePresence mode='wait'>
          {open && (
            <motion.div
              key='review-dialog'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className='bg-white rounded-2xl p-4 md:p-6 shadow-xl'
            >
              <DialogHeader>
                <DialogTitle className='text-xl font-extrabold mb-6'>
                  Give Review
                </DialogTitle>
              </DialogHeader>

              {/* Rating */}
              <div className='flex flex-col items-center mb-6'>
                <h2 className='text-md font-bold mb-2'>Give Rating</h2>
                <div className='flex gap-1'>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type='button'
                      onClick={() => setStar(val)}
                      className={clsx(
                        'cursor-pointer',
                        val <= star ? 'text-yellow-500' : 'text-gray-300'
                      )}
                    >
                      <Star className='size-10 md:size-12' />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <Textarea
                placeholder='Please share your thoughts about this book'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className='min-h-[200px] mb-6 text-sm md:text-md font-medium'
              />

              <DialogFooter>
                <Button
                  onClick={handleSubmit}
                  disabled={star === 0 || createReview.isPending}
                  className='w-full'
                >
                  {createReview.isPending ? 'Sending...' : 'Send'}
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
