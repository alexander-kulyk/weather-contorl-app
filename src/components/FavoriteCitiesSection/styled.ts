import styled, { css } from 'styled-components';

interface IFavoriteRowProps {
  $isSelected: boolean;
}

export const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Title = styled.h2`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: ${({ theme }) => theme.typography.micro.fontWeight};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Count = styled.span`
  min-width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: 700;
`;

export const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const Row = styled.div<IFavoriteRowProps>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.xs};

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
