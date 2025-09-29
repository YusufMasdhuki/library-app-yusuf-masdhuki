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
import { LogoutConfirmDialogProps } from '@/interfaces/LogoutConfirmDialogProps';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

export const LogoutConfirmDialog: React.FC<LogoutConfirmDialogProps> = ({
  trigger,
  onConfirm,
}) => {
  const [open, setOpen] = useState(false);

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
                Logout Confirmation
              </DialogTitle>
              <DialogDescription className='text-sm md:text-md font-semibold mb-4'>
                Are you sure you want to log out of this account? You need to
                log back in to continue.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='flex gap-3 justify-end'>
              <Button
                variant='primaryWhite'
                className='w-full'
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                className='bg-accent-red hover:bg-accent-red/90 w-full'
              >
                Logout
              </Button>
            </DialogFooter>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
