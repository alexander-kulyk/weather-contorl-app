import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const Logo = styled.div`
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.surface};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, #82a7ff);
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const TitleGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.sectionTitle.fontSize};
  font-weight: ${({ theme }) => theme.typography.sectionTitle.fontWeight};
  line-height: ${({ theme }) => theme.typography.sectionTitle.lineHeight};
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: ${({ theme }) => theme.typography.micro.fontWeight};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const FavoriteBadge = styled.div`
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: 0 ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.accentSoft};
  font-weight: 800;
`;
