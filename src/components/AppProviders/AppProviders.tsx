//core
import React from 'react';
import { ThemeProvider } from 'styled-components';
//components
import { ApiErrorAlert } from '../ApiErrorAlert';
import { ErrorBoundary } from '../ErrorBoundary';
//other
import { ApiErrorProvider, FavoritesProvider, WeatherProvider } from '../../context';
import { GlobalStyles, theme } from '../../theme';
import type { IAppProvidersProps } from './types';

export const AppProviders: React.FC<IAppProvidersProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <ApiErrorProvider>
      <FavoritesProvider>
        <WeatherProvider>
          <ErrorBoundary component="APP" fallbackLayout="page">
            {children}
          </ErrorBoundary>
        </WeatherProvider>
      </FavoritesProvider>
      <ApiErrorAlert />
    </ApiErrorProvider>
  </ThemeProvider>
);
