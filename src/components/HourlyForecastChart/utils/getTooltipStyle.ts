import type { CSSProperties } from 'react';
import type { AppTheme } from '../../../theme';

export const getTooltipStyle = (theme: AppTheme): CSSProperties => ({
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.sm,
  boxShadow: theme.shadows.sm,
});
