import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'flex items-center justify-center text-sm md:text-md font-bold transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary-300 rounded-full text-white hover:bg-primary-400',
        primaryWhite:
          'bg-white hover:bg-neutral-200 rounded-full text-black border border-neutral-300',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline: ' shadow-[0_0_20px_rgba(203,202,202,0.25)]',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'hover:underline',
        tabsPrimary: 'bg-transparent rounded-xl px-3',
      },
      size: {
        default: 'h-11 md:h-12 px-4',
        sm: 'h-8',
        lg: 'h-10 md:h-11',
        icon: 'h-10 w-10 md:h-11 md:w-11',
        tabsPrimary: 'h-10 w-full',
        primaryWhite: 'h-10 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
