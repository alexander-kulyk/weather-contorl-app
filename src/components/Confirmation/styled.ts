import styled, { css } from 'styled-components';
import { Button } from '../Button';
import type {
  IConfirmationLayoutProps,
  IConfirmationToneProps,
} from './types';

const getToneColor = css<IConfirmationToneProps>`
  ${({ theme, $tone }) => {
    if ($tone === 'primary') {
      return theme.colors.primary;
    }

    if ($tone === 'success') {
      return theme.colors.success;
    }

    if ($tone === 'warning') {
      return theme.colors.warning;
    }

    return theme.colors.error;
  }}
`;

const getToneBackground = css<IConfirmationToneProps>`
  ${({ theme, $tone }) => {
    if ($tone === 'primary') {
      return theme.colors.primarySoft;
    }

    if ($tone === 'success') {
      return 'rgba(24, 169, 87, 0.12)';
    }

    if ($tone === 'warning') {
      return 'rgba(240, 163, 35, 0.14)';
    }

    return theme.colors.errorSoft;
  }}
`;

export const Overlay = styled.div<IConfirmationLayoutProps>`
  position: fixed;
  inset: 0;
  z-index: 1000000000;
  width: 100vw;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing[8]};
  overflow: auto;
  background: rgba(15, 23, 42, 0.38);
  backdrop-filter: blur(6px);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

export const Dialog = styled.div<IConfirmationLayoutProps>`
  width: min(
    ${({ $layout }) => ($layout === 'page' ? '680px' : '520px')},
    calc(100vw - ${({ theme }) => theme.spacing[12]})
  );
  max-height: calc(100vh - ${({ theme }) => theme.spacing[16]});
  display: grid;
  justify-items: center;
  gap: ${({ theme, $layout }) =>
    $layout === 'page' ? theme.spacing[8] : theme.spacing[5]};
  padding: ${({ theme, $layout }) =>
    $layout === 'page'
      ? `${theme.spacing[16]} ${theme.spacing[12]}`
      : `${theme.spacing[8]} ${theme.spacing[6]}`};
  overflow: auto;
  border-radius: ${({ theme }) => theme.radius.xl};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    max-height: calc(100vh - ${({ theme }) => theme.spacing[8]});
    gap: ${({ theme }) => theme.spacing[6]};
    padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[5]};
  }
`;

export const Icon = styled.span<IConfirmationToneProps>`
  width: 108px;
  height: 108px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${getToneColor};
  background: ${getToneBackground};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 88px;
    height: 88px;
  }
`;

export const Copy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
  justify-items: center;
`;

export const Title = styled.p<IConfirmationLayoutProps>`
  max-width: 560px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ $layout }) => ($layout === 'page' ? '2.5rem' : '1.5rem')};
  font-weight: 800;
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ $layout }) => ($layout === 'page' ? '1.75rem' : '1.25rem')};
  }
`;

export const Description = styled.p`
  max-width: 520px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
`;

export const ConfirmButton = styled(Button)<IConfirmationLayoutProps>`
  min-width: 180px;
  font-size: ${({ $layout }) => ($layout === 'page' ? '1.5rem' : '1.125rem')};
  font-weight: 800;

  ${({ $layout }) =>
    $layout === 'page' &&
    css`
      min-height: 76px;
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    min-height: 56px;
    font-size: 1.125rem;
  }
`;
