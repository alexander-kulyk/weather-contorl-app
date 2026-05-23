import styled from 'styled-components';
import type { WeatherThemeKey } from '../../theme';

interface IMetricProps {
  $themeKey: WeatherThemeKey;
}

export const Card = styled.article<IMetricProps>`
  min-height: 116px;
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid rgba(255, 255, 255, 0.58);
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].ink};
  background: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].card};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const Icon = styled.span<IMetricProps>`
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].metricTint};
  background: rgba(255, 255, 255, 0.62);
`;

export const Label = styled.h3<IMetricProps>`
  color: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].inkSoft};
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: ${({ theme }) => theme.typography.micro.fontWeight};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Value = styled.p`
  color: inherit;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.15;
`;

export const Helper = styled.p<IMetricProps>`
  color: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].inkSoft};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
`;
