//core
import React from 'react';
import { ThemeProvider } from 'styled-components';
//other
import { FavoritesProvider, WeatherProvider } from '../../context';
import { GlobalStyles, theme } from '../../theme';
import type { IAppProvidersProps } from './types';

export const AppProviders: React.FC<IAppProvidersProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <FavoritesProvider>
      <WeatherProvider>{children}</WeatherProvider>
    </FavoritesProvider>
  </ThemeProvider>
);
