import { ReactNode } from 'react';

export interface DeleteReviewDialogProps {
  trigger: ReactNode;
  isPending: boolean;
  onConfirm: () => void;
  bookTitle: string;
}
