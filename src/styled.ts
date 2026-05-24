import styled from 'styled-components';

export const Shell = styled.div`
  width: min(100%, 1680px);
  min-height: 100vh;
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing[8]};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[6]};
    padding: ${({ theme }) => theme.spacing[5]};
  }
`;

export const Workspace = styled.main`
  display: grid;
  grid-template-columns: minmax(320px, 430px) minmax(0, 1fr);
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(280px, 390px) minmax(0, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.aside`
  display: grid;
  gap: ${({ theme }) => theme.spacing[6]};
  align-self: start;
`;

export const Details = styled.div`
  min-width: 0;
  display: grid;
  align-self: stretch;

  > * {
    min-height: 100%;
  }
`;
