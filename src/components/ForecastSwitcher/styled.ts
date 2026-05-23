import styled, { css } from 'styled-components';

interface IButtonProps {
  $isActive: boolean;
}

export const Switcher = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  padding: ${({ theme }) => theme.spacing[1]};
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(255, 255, 255, 0.42);
`;

export const Button = styled.button<IButtonProps>`
  min-height: 36px;
  min-width: 78px;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: transparent;
  font-weight: 700;
  transition:
    background ${({ theme }) => theme.animation.fast} ease,
    color ${({ theme }) => theme.animation.fast} ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  ${({ theme, $isActive }) =>
    $isActive &&
    css`
      color: ${theme.colors.textPrimary};
      background: rgba(255, 255, 255, 0.72);
      box-shadow: ${theme.shadows.xs};
    `}
`;
