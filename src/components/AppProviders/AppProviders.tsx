//core
import React from 'react';
import { ThemeProvider } from 'styled-components';
//components
import { ApiErrorAlert } from '../ApiErrorAlert';
//other
import { ApiErrorProvider, FavoritesProvider, WeatherProvider } from '../../context';
import { GlobalStyles, theme } from '../../theme';
import type { IAppProvidersProps } from './types';

export const AppProviders: React.FC<IAppProvidersProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <ApiErrorProvider>
      <FavoritesProvider>
        <WeatherProvider>{children}</WeatherProvider>
      </FavoritesProvider>
      <ApiErrorAlert />
    </ApiErrorProvider>
  </ThemeProvider>
);
