import { ReactNode } from 'react';

export interface LogoutConfirmDialogProps {
  trigger: ReactNode;
  onConfirm: () => void;
}
