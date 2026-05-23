import styled from 'styled-components';
import type { WeatherThemeKey } from '../../theme';

interface IPanelProps {
  $themeKey: WeatherThemeKey;
}

export const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const Header = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const Title = styled.h2`
  color: inherit;
  font-size: ${({ theme }) => theme.typography.sectionTitle.fontSize};
  font-weight: ${({ theme }) => theme.typography.sectionTitle.fontWeight};
`;

export const Meta = styled.p`
  color: currentColor;
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: ${({ theme }) => theme.typography.micro.fontWeight};
  letter-spacing: 0.08em;
  opacity: 0.72;
  text-transform: uppercase;
`;

export const Summary = styled.p`
  color: currentColor;
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  opacity: 0.76;
`;

export const ChartPanel = styled.div<IPanelProps>`
  height: 248px;
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[4]}
    ${({ theme }) => theme.spacing[3]};
  border: 1px solid rgba(255, 255, 255, 0.54);
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].card};
`;
