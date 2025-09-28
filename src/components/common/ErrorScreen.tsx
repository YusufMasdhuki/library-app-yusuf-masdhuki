import { cn } from '@/lib/utils';

interface ErrorScreenProps {
  message?: string;
  className?: string;
}

const ErrorScreen = ({
  message = 'Something went wrong',
  className,
}: ErrorScreenProps) => {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center text-center text-red-500',
        className
      )}
    >
      Error: {message}
    </div>
  );
};

export default ErrorScreen;
