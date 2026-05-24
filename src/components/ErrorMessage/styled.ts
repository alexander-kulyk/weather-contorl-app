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

