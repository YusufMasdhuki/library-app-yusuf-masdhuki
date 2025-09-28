import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface DeleteReviewDialogProps {
  trigger: ReactNode;
  isPending: boolean;
  onConfirm: () => void;
}

export const DeleteReviewDialog = ({
  trigger,
  isPending,
  onConfirm,
}: DeleteReviewDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    setOpen(false); // auto close setelah sukses
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='sm:max-w-[400px] bg-transparent p-4'>
        <AnimatePresence mode='wait'>
          <motion.div
            key='delete-review-dialog'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='bg-white rounded-2xl p-4 md:p-6 shadow-xl'
          >
            <DialogHeader>
              <DialogTitle className='text-md md:text-lg font-bold mb-3'>
                Delete Review
              </DialogTitle>
              <DialogDescription className='text-sm md:text-md font-semibold mb-4'>
                Are you sure you want to delete this review? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant='primaryWhite'
                onClick={() => setOpen(false)}
                className='w-full'
              >
                Cancel
              </Button>
              <Button
                className='bg-red-600 hover:bg-red-700 w-full'
                disabled={isPending}
                onClick={handleConfirm}
              >
                {isPending ? 'Deleting...' : 'Confirm'}
              </Button>
            </DialogFooter>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
