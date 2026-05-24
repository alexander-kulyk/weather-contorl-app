import type { ReactNode } from 'react';

export type EmptyStateTone = 'accent' | 'primary';

export interface IEmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  tone?: EmptyStateTone;
}

export interface IEmptyStateToneProps {
  $tone: EmptyStateTone;
}
