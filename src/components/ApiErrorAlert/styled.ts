import styled from 'styled-components';

export const Alert = styled.div`
  width: min(420px, calc(100vw - ${({ theme }) => theme.spacing[8]}));
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.errorSoft};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const Header = styled.div`
  display: flex;
  align-items: start;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const Icon = styled.span`
  width: ${({ theme }) => theme.buttonSizes.iconSm};
  height: ${({ theme }) => theme.buttonSizes.iconSm};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.errorSoft};
`;

export const Copy = styled.div`
  min-width: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.cardTitle.fontSize};
  font-weight: ${({ theme }) => theme.typography.cardTitle.fontWeight};
  line-height: ${({ theme }) => theme.typography.cardTitle.lineHeight};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  line-height: ${({ theme }) => theme.typography.small.lineHeight};
`;

export const Meta = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: ${({ theme }) => theme.typography.micro.fontWeight};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const Action = styled.button`
  min-height: ${({ theme }) => theme.buttonSizes.control};
  justify-self: end;
  padding: 0 ${({ theme }) => theme.spacing[5]};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.surface};
  background: ${({ theme }) => theme.colors.error};
  font-weight: 800;

  &:hover {
    filter: brightness(0.96);
  }
`;
