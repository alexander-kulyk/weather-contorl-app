import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.errorSoft};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.surface};
`;

export const Message = styled.p`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  line-height: ${({ theme }) => theme.typography.small.lineHeight};
`;

export const RetryButton = styled.button`
  min-height: ${({ theme }) => theme.buttonSizes.iconSm};
  padding: 0 ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.error};
  background: transparent;
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  font-weight: 700;
`;
