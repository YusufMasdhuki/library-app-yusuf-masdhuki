import { CartItem } from '@/store/slices/cart-slice';

export interface BookListProps {
  books: CartItem[];
}

export interface BorrowFormProps {
  duration: number;
  setDuration: (d: number) => void;
  agree1: boolean;
  setAgree1: (v: boolean) => void;
  agree2: boolean;
  setAgree2: (v: boolean) => void;
  handleConfirm: () => void;
  isPending: boolean;
}

export interface UserInfoProps {
  name?: string;
  email?: string;
}
