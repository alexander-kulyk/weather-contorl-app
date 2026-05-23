import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radius.lg};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  background: ${({ theme }) => theme.colors.surface};
`;

export const Message = styled.p`
  font-size: 1.125rem;
  line-height: 1.4;
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
