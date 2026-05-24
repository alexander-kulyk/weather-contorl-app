import styled, { css } from 'styled-components';
import type { DefaultTheme } from 'styled-components';
import type {
  ButtonJustify,
  ButtonShape,
  ButtonSize,
  ButtonTone,
  ButtonVariant,
  IStyledButtonProps,
} from './types';

interface IToneColors {
  base: string;
  contrast: string;
  soft: string;
  hoverSoft: string;
}

const getToneColors = (theme: DefaultTheme, tone: ButtonTone): IToneColors => {
  if (tone === 'primary') {
    return {
      base: theme.colors.primary,
      contrast: theme.colors.surface,
      soft: theme.colors.primarySoft,
      hoverSoft: theme.colors.primarySoft,
    };
  }

  if (tone === 'danger') {
    return {
      base: theme.colors.error,
      contrast: theme.colors.surface,
      soft: theme.colors.errorSoft,
      hoverSoft: theme.colors.errorSoft,
    };
  }

  if (tone === 'success') {
    return {
      base: theme.colors.success,
      contrast: theme.colors.surface,
      soft: 'rgba(24, 169, 87, 0.12)',
      hoverSoft: 'rgba(24, 169, 87, 0.18)',
    };
  }

  if (tone === 'warning') {
    return {
      base: theme.colors.warning,
      contrast: theme.colors.surface,
      soft: 'rgba(240, 163, 35, 0.14)',
      hoverSoft: 'rgba(240, 163, 35, 0.22)',
    };
  }

  return {
    base: theme.colors.textPrimary,
    contrast: theme.colors.surface,
    soft: theme.colors.surfaceAlt,
    hoverSoft: theme.colors.surfaceAlt,
  };
};

const getVariantStyles = (
  theme: DefaultTheme,
  variant: ButtonVariant,
  tone: ButtonTone,
) => {
  const palette = getToneColors(theme, tone);

  if (variant === 'solid') {
    return css`
      border-color: ${palette.base};
      color: ${palette.contrast};
      background: ${palette.base};

      &:hover:not(:disabled) {
        filter: brightness(0.96);
      }
    `;
  }

  if (variant === 'outline') {
    if (tone === 'secondary') {
      return css`
        border-color: ${theme.colors.border};
        color: ${theme.colors.textPrimary};
        background: ${theme.colors.surface};

        &:hover:not(:disabled) {
          border-color: ${theme.colors.textSecondary};
          background: ${theme.colors.surfaceAlt};
        }
      `;
    }

    return css`
      border-color: ${palette.base};
      color: ${palette.base};
      background: transparent;

      &:hover:not(:disabled) {
        background: ${palette.soft};
      }
    `;
  }

  if (variant === 'soft') {
    return css`
      border-color: transparent;
      color: ${tone === 'secondary' ? theme.colors.textSecondary : palette.base};
      background: ${palette.soft};

      &:hover:not(:disabled) {
        color: ${tone === 'secondary' ? theme.colors.textPrimary : palette.base};
        background: ${palette.hoverSoft};
      }
    `;
  }

  return css`
    border-color: transparent;
    color: ${tone === 'secondary' ? theme.colors.textSecondary : palette.base};
    background: transparent;

    &:hover:not(:disabled) {
      color: ${tone === 'secondary' ? theme.colors.textPrimary : palette.base};
      background: ${palette.soft};
    }
  `;
};

const getSizeStyles = (
  theme: DefaultTheme,
  size: ButtonSize,
  iconOnly: boolean,
) => {
  if (size === 'sm') {
    return css`
      min-height: ${theme.buttonSizes.iconSm};
      ${iconOnly
        ? css`
            width: ${theme.buttonSizes.iconSm};
            padding: 0;
          `
        : css`
            padding: 0 ${theme.spacing[3]};
          `}
      font-size: ${theme.typography.small.fontSize};
    `;
  }

  if (size === 'lg') {
    return css`
      min-height: 56px;
      ${iconOnly
        ? css`
            width: 56px;
            padding: 0;
          `
        : css`
            padding: 0 ${theme.spacing[6]};
          `}
      font-size: ${theme.typography.cardTitle.fontSize};
    `;
  }

  return css`
    min-height: ${theme.buttonSizes.icon};
    ${iconOnly
      ? css`
          width: ${theme.buttonSizes.icon};
          padding: 0;
        `
      : css`
          padding: 0 ${theme.spacing[5]};
        `}
    font-size: ${theme.typography.body.fontSize};
  `;
};

const getShapeStyles = (theme: DefaultTheme, shape: ButtonShape) => {
  if (shape === 'pill') {
    return css`
      border-radius: ${theme.radius.pill};
    `;
  }

  return css`
    border-radius: ${theme.radius.md};
  `;
};

const JUSTIFY_MAP: Record<ButtonJustify, string> = {
  center: 'center',
  between: 'space-between',
  start: 'flex-start',
};

export const StyledButton = styled.button<IStyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: ${({ $justify }) => JUSTIFY_MAP[$justify]};
  gap: ${({ theme }) => theme.spacing[2]};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border-width: 1px;
  border-style: solid;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.animation.fast} ease,
    background ${({ theme }) => theme.animation.fast} ease,
    border-color ${({ theme }) => theme.animation.fast} ease,
    box-shadow ${({ theme }) => theme.animation.fast} ease,
    filter ${({ theme }) => theme.animation.fast} ease,
    transform ${({ theme }) => theme.animation.fast} ease;

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  ${({ theme, $size, $iconOnly }) => getSizeStyles(theme, $size, $iconOnly)}
  ${({ theme, $shape }) => getShapeStyles(theme, $shape)}
  ${({ theme, $variant, $tone }) => getVariantStyles(theme, $variant, $tone)}
`;

export const IconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
