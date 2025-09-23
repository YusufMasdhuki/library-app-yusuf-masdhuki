import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserMenuProps {
  userName?: string;
  isLoading: boolean;
  onLogout: () => void;
}

const UserMenu = ({ userName, isLoading, onLogout }: UserMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div className='flex items-center gap-3 cursor-pointer'>
        <img
          src='/images/default-avatar.png'
          alt='avatar'
          className='size-12 rounded-full'
        />
        <span className='text-lg font-semibold'>
          {isLoading ? 'Loading...' : userName}
        </span>
        <ChevronDown className='size-5' />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end' className='w-48'>
      <DropdownMenuLabel>Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link to='/profile'>Profile</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to='/borrowed'>Borrowed List</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to='/reviews'>Reviews</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserMenu;
