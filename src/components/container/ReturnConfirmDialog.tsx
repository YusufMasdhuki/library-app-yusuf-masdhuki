import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReturnConfirmDialogProps } from '@/interfaces/ReturnConfirmDialogProps';
import { AnimatePresence, motion } from 'motion/react';

export const ReturnConfirmDialog: React.FC<ReturnConfirmDialogProps> = ({
  isPending,
  onConfirm,
  trigger,
  bookTitle,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='sm:max-w-[450px] bg-transparent p-4'>
        <AnimatePresence mode='wait'>
          <motion.div
            key='return-dialog'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='bg-white rounded-2xl p-4 md:p-6 shadow-xl'
          >
            <DialogHeader>
              <DialogTitle className='text-md md:text-lg font-bold mb-3'>
                Confirm Return
              </DialogTitle>
              <DialogDescription className='text-sm md:text-md font-semibold mb-4'>
                Are you sure you want to return{' '}
                <span className='font-bold text-primary-300'>{bookTitle}</span>?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant='primaryWhite' className='w-full'>
                Cancel
              </Button>
              <Button
                disabled={isPending}
                onClick={onConfirm}
                className='w-full'
              >
                {isPending ? 'Returning...' : 'Confirm'}
              </Button>
            </DialogFooter>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
