import type { ReactNode } from 'react';

export type ConfirmationTone = 'danger' | 'primary' | 'success' | 'warning';
export type ConfirmationLayout = 'page' | 'inline';
export type ConfirmationRole = 'alert' | 'alertdialog' | 'dialog';

export interface IConfirmationProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: ConfirmationTone;
  layout?: ConfirmationLayout;
  role?: ConfirmationRole;
  ariaLabel?: string;
  onCancel?: () => void;
  onConfirm: () => void;
}

export interface IConfirmationToneProps {
  $tone: ConfirmationTone;
}

export interface IConfirmationLayoutProps {
  $layout: ConfirmationLayout;
}

export interface IConfirmationIconProps
  extends IConfirmationLayoutProps,
    IConfirmationToneProps {}

export interface IConfirmationActionsProps extends IConfirmationLayoutProps {
  $hasCancel: boolean;
}
