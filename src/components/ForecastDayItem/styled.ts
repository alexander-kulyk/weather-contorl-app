import styled from 'styled-components';
import type { WeatherThemeKey } from '../../theme';

interface IThemeProps {
  $themeKey: WeatherThemeKey;
}

interface IRangeFillProps {
  $left: number;
  $width: number;
}

export const Item = styled.li<IThemeProps>`
  display: grid;
  grid-template-columns: 72px 72px minmax(130px, 1fr) 56px minmax(140px, 1.3fr) 56px;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  color: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].ink};
  border-bottom: 1px solid rgba(255, 255, 255, 0.38);

  &:last-child {
    border-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr auto;
    align-items: start;
  }
`;

export const Day = styled.span`
  font-weight: 800;
`;

export const Date = styled.span<IThemeProps>`
  color: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].inkSoft};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
`;

export const Condition = styled.span`
  min-width: 0;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const ConditionText = styled.span<IThemeProps>`
  overflow: hidden;
  color: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].inkSoft};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Precipitation = styled.span<IThemeProps>`
  color: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].inkSoft};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
`;

export const Range = styled.span`
  position: relative;
  height: 6px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(255, 255, 255, 0.28);
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: 1 / -1;
    width: 100%;
  }
`;

export const RangeFill = styled.span<IRangeFillProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $left }) => $left}%;
  width: ${({ $width }) => $width}%;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: linear-gradient(90deg, #3b6ff5 0%, #f0a323 54%, #e03a4b 100%);
`;

export const Temperature = styled.span`
  justify-self: end;
  font-weight: 800;
  white-space: nowrap;
`;
