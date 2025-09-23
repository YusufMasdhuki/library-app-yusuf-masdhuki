import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className='relative w-full max-w-125'>
    <Search className='absolute top-1/2 left-4 -translate-y-1/2 size-5 text-neutral-600' />
    <Input
      placeholder='Search book'
      className='w-full h-11 rounded-full pl-10.5'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default SearchBar;
