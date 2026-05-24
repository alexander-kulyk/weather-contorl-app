import styled, { css } from 'styled-components';
import type { IFavoriteCityItemRowProps } from './types';

export const Row = styled.li<IFavoriteCityItemRowProps>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.xs};
  transition:
    border-color ${({ theme }) => theme.animation.fast} ease,
    background ${({ theme }) => theme.animation.fast} ease,
    box-shadow ${({ theme }) => theme.animation.fast} ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ theme, $isSelected }) =>
    $isSelected &&
    css`
      border-color: ${theme.colors.primary};
      background: ${theme.colors.primarySoft};
    `}
`;

export const SelectButton = styled.button`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  padding: 0;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  color: inherit;
  background: transparent;
  text-align: left;
`;

export const City = styled.div`
  min-width: 0;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const IconBox = styled.span`
  width: ${({ theme }) => theme.buttonSizes.icon};
  height: ${({ theme }) => theme.buttonSizes.icon};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primarySoft};
`;

export const Body = styled.span`
  min-width: 0;
  display: grid;
`;

export const Name = styled.span`
  display: block;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Meta = styled.span`
  display: block;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Temperature = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.cardTitle.fontSize};
  font-weight: 800;
  white-space: nowrap;
`;
