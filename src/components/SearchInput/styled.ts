import styled, { css, keyframes } from 'styled-components';

interface IFieldProps {
  $hasError: boolean;
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: ${({ theme }) => theme.typography.micro.fontWeight};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Field = styled.div<IFieldProps>`
  min-height: ${({ theme }) => theme.inputSizes.height};
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: 0 ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.xs};
  transition:
    border-color ${({ theme }) => theme.animation.fast} ease,
    box-shadow ${({ theme }) => theme.animation.fast} ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.focus.ring};
  }

  ${({ theme, $hasError }) =>
    $hasError &&
    css`
      border-color: ${theme.colors.error};
      box-shadow: none;

      &:focus-within {
        border-color: ${theme.colors.error};
        box-shadow: 0 0 0 3px rgba(224, 58, 75, 0.14);
      }
    `}
`;

export const Input = styled.input`
  width: 100%;
  min-width: 0;
  appearance: none;
  box-shadow: none;
  border: 0;
  outline: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: transparent;
  font-size: ${({ theme }) => theme.typography.body.fontSize};

  &:focus,
  &:focus-visible {
    outline: 0;
    box-shadow: none;
  }

  &::-webkit-search-cancel-button,
  &::-webkit-search-decoration,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const IconSlot = styled.span<{ $isLoading?: boolean }>`
  color: ${({ theme }) => theme.colors.textMuted};

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      animation: ${spin} 1s linear infinite;
    `}
`;

export const ClearButton = styled.button`
  width: ${({ theme }) => theme.buttonSizes.iconSm};
  height: ${({ theme }) => theme.buttonSizes.iconSm};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surfaceAlt};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
`;
