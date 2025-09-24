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
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'hover:underline',
        tabsPrimary: 'bg-transparent rounded-xl px-3',
      },
      size: {
        default: 'h-11 md:h-12 px-4',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'h-11 w-11',
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
