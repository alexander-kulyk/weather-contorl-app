import styled from 'styled-components';

export const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const HeaderCount = styled.span`
  min-width: 28px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.accentSoft};
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: 700;
`;

export const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => theme.buttonSizes.icon};
  padding: 0 ${({ theme }) => theme.spacing[5]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.surface};
  font-weight: 600;
  transition:
    border-color ${({ theme }) => theme.animation.fast} ease,
    background ${({ theme }) => theme.animation.fast} ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textSecondary};
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

export const ClearAllButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => theme.buttonSizes.icon};
  padding: 0 ${({ theme }) => theme.spacing[6]};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.surface};
  background: ${({ theme }) => theme.colors.error};
  font-weight: 700;
  transition:
    filter ${({ theme }) => theme.animation.fast} ease,
    opacity ${({ theme }) => theme.animation.fast} ease;

  &:hover:not(:disabled) {
    filter: brightness(0.95);
  }

  &:disabled {
    opacity: 0.45;
  }
`;
