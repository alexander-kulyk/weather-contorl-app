//core
import type { ReactNode } from 'react';
import { Search } from 'lucide-react';

export const getEmptyStateIcon = (icon?: ReactNode): ReactNode =>
  icon ?? <Search size={32} strokeWidth={1.7} aria-hidden='true' />;
