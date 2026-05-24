import styled from 'styled-components';

export const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const HeaderCount = styled.span`
  min-width: 28px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.accentSoft};
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: 700;
`;
