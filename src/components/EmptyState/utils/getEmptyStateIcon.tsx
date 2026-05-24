import { Search } from 'lucide-react';
import type { ReactNode } from 'react';

export const getEmptyStateIcon = (icon?: ReactNode): ReactNode =>
  icon ?? <Search size={22} strokeWidth={1.5} aria-hidden="true" />;
