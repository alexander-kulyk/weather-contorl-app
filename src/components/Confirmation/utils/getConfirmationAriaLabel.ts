import type { ReactNode } from 'react';

const DEFAULT_ARIA_LABEL = 'Confirmation';

export const getConfirmationAriaLabel = (
  title: ReactNode,
  ariaLabel?: string,
): string => ariaLabel ?? (typeof title === 'string' ? title : DEFAULT_ARIA_LABEL);
