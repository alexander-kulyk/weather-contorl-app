import styled from 'styled-components';
import type { WeatherThemeKey } from '../../theme';

interface IListProps {
  $themeKey: WeatherThemeKey;
}

export const List = styled.ul<IListProps>`
  display: grid;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.54);
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].card};
  list-style: none;
  overflow: hidden;
`;
