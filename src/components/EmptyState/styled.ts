import styled from 'styled-components';
import type { IEmptyStateToneProps } from './types';

export const Wrapper = styled.div`
  min-height: 260px;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[8]};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 220px;
    padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[5]};
  }
`;

export const Content = styled.div`
  max-width: 440px;
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
  justify-items: center;
`;

export const Icon = styled.div<IEmptyStateToneProps>`
  width: ${({ theme }) => theme.spacing[16]};
  height: ${({ theme }) => theme.spacing[16]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme, $tone }) =>
    $tone === 'accent' ? theme.colors.accent : theme.colors.primary};
  background: ${({ theme, $tone }) =>
    $tone === 'accent' ? theme.colors.accentSoft : theme.colors.primarySoft};
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sectionTitle.fontSize};
  }
`;

export const Description = styled.p`
  max-width: 420px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.125rem;
  line-height: 1.45;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.body.fontSize};
  }
`;
