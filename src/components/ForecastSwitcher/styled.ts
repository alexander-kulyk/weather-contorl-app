import styled, { css } from 'styled-components';

interface IButtonProps {
  $isActive: boolean;
}

interface ISwitcherProps {
  $activeIndex: number;
}

export const Switcher = styled.div<ISwitcherProps>`
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  padding: ${({ theme }) => theme.spacing[1]};
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(255, 255, 255, 0.42);

  &::before {
    content: '';
    position: absolute;
    top: ${({ theme }) => theme.spacing[1]};
    left: ${({ theme }) => theme.spacing[1]};
    width: calc((100% - ${({ theme }) => theme.spacing[2]}) / 2);
    height: calc(100% - ${({ theme }) => theme.spacing[2]});
    border-radius: ${({ theme }) => theme.radius.pill};
    background: rgba(255, 255, 255, 0.72);
    box-shadow: ${({ theme }) => theme.shadows.xs};
    transform: translateX(${({ $activeIndex }) => `${$activeIndex * 100}%`});
    transition: transform ${({ theme }) => theme.animation.normal}
      cubic-bezier(0.2, 0.8, 0.2, 1);
    will-change: transform;
  }
`;

export const Button = styled.button<IButtonProps>`
  position: relative;
  z-index: 1;
  min-height: 36px;
  min-width: 78px;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: transparent;
  font-weight: 700;
  transition:
    color ${({ theme }) => theme.animation.normal} ease,
    transform ${({ theme }) => theme.animation.fast} ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 0;
    box-shadow: ${({ theme }) => theme.focus.ring};
  }

  ${({ theme, $isActive }) =>
    $isActive &&
    css`
      color: ${theme.colors.textPrimary};
    `}
`;
