import { ReactNode } from 'react';

export interface ReturnConfirmDialogProps {
  isPending: boolean;
  onConfirm: () => void;
  trigger: ReactNode;
  bookTitle: string;
}
