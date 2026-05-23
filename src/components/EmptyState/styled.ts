import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 160px;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing[8]};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  text-align: center;
`;

export const Content = styled.div`
  max-width: 320px;
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
  justify-items: center;
`;

export const Icon = styled.div`
  width: ${({ theme }) => theme.buttonSizes.control};
  height: ${({ theme }) => theme.buttonSizes.control};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primarySoft};
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
