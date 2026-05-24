import styled from 'styled-components';

interface IButtonProps {
  $isFavorite: boolean;
  $variant: 'plain' | 'soft';
}

export const Button = styled.button<IButtonProps>`
  width: ${({ theme }) => theme.buttonSizes.icon};
  height: ${({ theme }) => theme.buttonSizes.icon};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${({ theme, $variant }) => ($variant === 'soft' ? theme.colors.border : 'transparent')};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme, $isFavorite }) =>
    $isFavorite ? theme.colors.accent : theme.colors.textMuted};
  background: ${({ theme, $variant }) =>
    $variant === 'soft' ? theme.colors.accentSoft : 'rgba(255, 255, 255, 0.58)'};
  box-shadow: ${({ theme, $variant }) => ($variant === 'soft' ? theme.shadows.xs : 'none')};
  transition:
    transform ${({ theme }) => theme.animation.fast} ease,
    color ${({ theme }) => theme.animation.fast} ease,
    background ${({ theme }) => theme.animation.fast} ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.accentSoft};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.45;
  }
`;
