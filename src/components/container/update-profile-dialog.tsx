import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUpdateMe } from '@/hooks/me/useMe';
import { useState } from 'react';
import { errorToast, successToast } from '@/lib/toast-helper';
import { AnimatePresence, motion } from 'motion/react';

const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

type UpdateProfileForm = z.infer<typeof updateProfileSchema>;

interface UpdateProfileDialogProps {
  defaultName: string;
}

export const UpdateProfileDialog = ({
  defaultName,
}: UpdateProfileDialogProps) => {
  const { mutate: updateMe, isPending } = useUpdateMe();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: defaultName },
  });

  const onSubmit = (values: UpdateProfileForm) => {
    updateMe(values, {
      onSuccess: () => {
        form.reset(values);
        setOpen(false);
        successToast('Profile updated successfully!');
      },
      onError: () => {
        errorToast('Failed to update profile');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='w-full h-11'>Update Profile</Button>
      </DialogTrigger>
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
                <DialogTitle>Update Profile</DialogTitle>
              </DialogHeader>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <div>
                  <label className='block text-sm font-medium mb-1'>Name</label>
                  <Input {...form.register('name')} disabled={isPending} />
                  {form.formState.errors.name && (
                    <p className='text-red-500 text-sm mt-1'>
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <Button type='submit' className='w-full' disabled={isPending}>
                  {isPending ? 'Updating...' : 'Save Changes'}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
