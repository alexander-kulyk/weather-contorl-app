import styled from 'styled-components';

export const Alert = styled.div`
  width: min(520px, calc(100vw - ${({ theme }) => theme.spacing[8]}));
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[5]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: calc(100vw - ${({ theme }) => theme.spacing[6]});
    padding: ${({ theme }) => theme.spacing[4]};
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

export const Icon = styled.span`
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.errorSoft};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
  }
`;

export const Copy = styled.div`
  min-width: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.125rem;
  font-weight: 800;
  line-height: 1.25;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Status = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.small.fontSize};
  }
`;

export const Separator = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
`;

export const CodeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radius.xs};
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.errorSoft};
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: 800;
  letter-spacing: 0.06em;
`;

export const Description = styled.p`
  max-width: 420px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  line-height: 1.45;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.small.fontSize};
  }
`;

export const Meta = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: ${({ theme }) => theme.typography.micro.fontWeight};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: stretch;
  }
`;

export const Action = styled.button`
  min-height: ${({ theme }) => theme.buttonSizes.control};
  padding: 0 ${({ theme }) => theme.spacing[5]};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.surface};
  background: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  font-weight: 800;
  cursor: pointer;
  transition:
    box-shadow ${({ theme }) => theme.animation.fast} ease,
    filter ${({ theme }) => theme.animation.fast} ease;

  &:hover {
    filter: brightness(0.96);
  }

  &:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 4px rgba(224, 58, 75, 0.22);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;
