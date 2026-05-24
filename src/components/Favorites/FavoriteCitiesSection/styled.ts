import styled, { css } from 'styled-components';
import type { IFavoriteListProps } from './types';

export const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const HeaderLead = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const HeartIcon = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.accent};
`;

export const Title = styled.h2`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
`;

export const Count = styled.span`
  min-width: ${({ theme }) => theme.buttonSizes.iconSm};
  height: ${({ theme }) => theme.buttonSizes.iconSm};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  font-weight: 800;
`;

export const List = styled.ul<IFavoriteListProps>`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
  margin: ${({ theme }) => theme.spacing[1]} 0 ${({ theme }) => theme.spacing[2]};
  padding: 0;
  list-style: none;

  ${({ $isScrollable, theme }) =>
    $isScrollable &&
    css`
      max-height: 380px;
      overflow-y: auto;
      padding-right: ${theme.spacing[2]};
      mask-image: linear-gradient(
        to bottom,
        #000 0,
        #000 calc(100% - ${theme.spacing[12]}),
        transparent 100%
      );
      -webkit-mask-image: linear-gradient(
        to bottom,
        #000 0,
        #000 calc(100% - ${theme.spacing[12]}),
        transparent 100%
      );

      scrollbar-width: thin;
      scrollbar-color: ${theme.colors.border} transparent;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: ${theme.colors.border};
        border-radius: ${theme.radius.pill};
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }
    `}
`;

export const ViewAllButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.xs};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
  text-align: left;
  transition:
    border-color ${({ theme }) => theme.animation.fast} ease,
    background ${({ theme }) => theme.animation.fast} ease,
    box-shadow ${({ theme }) => theme.animation.fast} ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }

  &:active {
    box-shadow: none;
    transform: translateY(1px);
  }
`;

export const ViewAllTrail = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
