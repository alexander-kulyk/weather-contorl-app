import styled from 'styled-components';

interface IResultNoticeProps {
  $variant: 'default' | 'error';
}

export const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Label = styled.h2`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: ${({ theme }) => theme.typography.micro.fontWeight};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Hint = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
`;

export const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const ResultNotice = styled.div<IResultNoticeProps>`
  min-height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radius.lg};
  color: ${({ theme, $variant }) =>
    $variant === 'error' ? theme.colors.error : theme.colors.textSecondary};
  text-align: center;
  background: ${({ theme }) => theme.colors.surface};
`;

export const ResultNoticeText = styled.p`
  color: currentColor;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.4;
`;
