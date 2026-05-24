import type { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  titleIcon?: ReactNode;
  headerActions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

export interface IModalSurfaceProps {
  $size: ModalSize;
}
