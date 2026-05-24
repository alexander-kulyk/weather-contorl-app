import styled from 'styled-components';

export const Alert = styled.div`
  width: 100%;
  min-height: 180px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[5]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: auto minmax(0, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    min-height: auto;
    gap: ${({ theme }) => theme.spacing[4]};
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

export const IconColumn = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Icon = styled.span`
  width: 56px;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.errorSoft};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 44px;
    height: 44px;
  }
`;

export const Content = styled.div`
  min-width: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const StatusBadge = styled.span`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.surface};
  background: ${({ theme }) => theme.colors.error};
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 40px;
    padding: 0 ${({ theme }) => theme.spacing[3]};
    font-size: 1.25rem;
  }
`;

export const CodeBadge = styled.span`
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.errorSoft};
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: 800;
  letter-spacing: 0.06em;
  line-height: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 36px;
    padding: 0 ${({ theme }) => theme.spacing[3]};
    font-size: ${({ theme }) => theme.typography.micro.fontSize};
  }
`;

export const Copy = styled.div`
  min-width: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.25;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

export const Description = styled.p`
  max-width: 380px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  line-height: 1.45;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.body.fontSize};
  }
`;

export const Actions = styled.div`
  align-self: end;
  grid-column: 2;
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: auto;
    flex-direction: column;
  }
`;

export const Action = styled.button`
  min-width: 128px;
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
    min-height: ${({ theme }) => theme.buttonSizes.control};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
  }
`;
