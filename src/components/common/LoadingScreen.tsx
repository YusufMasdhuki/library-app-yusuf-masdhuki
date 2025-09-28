import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  message?: string;
  className?: string;
}

const LoadingScreen = ({
  message = 'Loading...',
  className,
}: LoadingScreenProps) => {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center text-center',
        className
      )}
    >
      {message}
    </div>
  );
};

export default LoadingScreen;
