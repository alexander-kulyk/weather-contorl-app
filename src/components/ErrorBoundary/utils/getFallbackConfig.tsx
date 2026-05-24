import { AlertTriangle } from 'lucide-react';
import type { IErrorBoundaryFallbackConfig, IErrorBoundaryProps } from '../types';

const DEFAULT_FALLBACK_TITLE = 'Something went wrong, contact the administrator';
const DEFAULT_CONFIRM_LABEL = 'OK';

export const getFallbackConfig = ({
  fallbackConfirmLabel,
  fallbackIcon,
  fallbackLayout,
  fallbackTitle,
}: IErrorBoundaryProps): IErrorBoundaryFallbackConfig => ({
  title: fallbackTitle ?? DEFAULT_FALLBACK_TITLE,
  confirmLabel: fallbackConfirmLabel ?? DEFAULT_CONFIRM_LABEL,
  layout: fallbackLayout ?? 'page',
  icon: fallbackIcon ?? (
    <AlertTriangle size={42} strokeWidth={1.7} aria-hidden="true" />
  ),
});
