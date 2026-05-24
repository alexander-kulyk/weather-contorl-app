import type { ErrorInfo, ReactNode } from 'react';
import type { ConfirmationLayout } from '../Confirmation';

export interface IErrorBoundaryErrorPayload {
  component: string;
  error: Error;
  errorInfo: ErrorInfo;
}

export interface IErrorBoundaryProps {
  children: ReactNode;
  component?: string;
  fallbackTitle?: ReactNode;
  fallbackMessage?: ReactNode;
  fallbackIcon?: ReactNode;
  fallbackConfirmLabel?: string;
  fallbackLayout?: ConfirmationLayout;
  onError?: (payload: IErrorBoundaryErrorPayload) => void;
}

export interface IErrorBoundaryState {
  hasError: boolean;
  isDismissed: boolean;
}

export interface IErrorBoundaryFallbackConfig {
  title: ReactNode;
  confirmLabel: string;
  layout: ConfirmationLayout;
  icon: ReactNode;
}
