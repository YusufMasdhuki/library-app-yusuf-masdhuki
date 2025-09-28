import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className='relative w-full md:max-w-125'>
    <Search className='absolute top-1/2 left-4 -translate-y-1/2 size-5 text-neutral-600' />
    <Input
      placeholder='Search book'
      className='w-full h-10 md:h-11 rounded-full pl-10.5 text-sm md:text-md'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default SearchBar;
