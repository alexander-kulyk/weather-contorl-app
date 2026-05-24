import styled from 'styled-components';
import type { IModalSurfaceProps, ModalSize } from './types';

const SIZE_TO_WIDTH: Record<ModalSize, string> = {
  sm: '420px',
  md: '560px',
  lg: '720px',
};

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing[6]};
  background: rgba(15, 23, 42, 0.42);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[4]};
    align-items: end;
  }
`;

export const Surface = styled.div<IModalSurfaceProps>`
  width: min(${({ $size }) => SIZE_TO_WIDTH[$size]}, calc(100vw - ${({ theme }) => theme.spacing[8]}));
  max-height: calc(100vh - ${({ theme }) => theme.spacing[12]});
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    max-height: 92vh;
    border-radius: ${({ theme }) => theme.radius.lg};
  }
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[6]} 0;
`;

export const TitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  min-width: 0;
`;

export const TitleIcon = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.accent};
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.sectionTitle.fontSize};
  font-weight: ${({ theme }) => theme.typography.sectionTitle.fontWeight};
  line-height: ${({ theme }) => theme.typography.sectionTitle.lineHeight};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const HeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const CloseButton = styled.button`
  width: ${({ theme }) => theme.buttonSizes.iconSm};
  height: ${({ theme }) => theme.buttonSizes.iconSm};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: transparent;
  transition:
    color ${({ theme }) => theme.animation.fast} ease,
    background ${({ theme }) => theme.animation.fast} ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

export const Description = styled.p`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[6]} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  line-height: ${({ theme }) => theme.typography.small.lineHeight};
  margin: 0;
`;

export const Body = styled.div`
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[6]};
  overflow-y: auto;
  min-height: 0;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.border} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.pill};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;
