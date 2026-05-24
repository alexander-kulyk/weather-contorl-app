//core
import React from 'react';
import { ThemeProvider } from 'styled-components';
//components
import { ApiErrorAlert } from '../ApiErrorAlert';
import { ErrorBoundary } from '../ErrorBoundary';
//other
import {
  ApiErrorProvider,
  FavoritesProvider,
  SelectedWeatherProvider,
  WeatherSearchProvider,
} from '../../context';
import { GlobalStyles, theme } from '../../theme';
import type { IAppProvidersProps } from './types';

export const AppProviders: React.FC<IAppProvidersProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <ApiErrorProvider>
      <FavoritesProvider>
        <SelectedWeatherProvider>
          <WeatherSearchProvider>
            <ErrorBoundary component="APP" fallbackLayout="page">
              {children}
            </ErrorBoundary>
          </WeatherSearchProvider>
        </SelectedWeatherProvider>
      </FavoritesProvider>
      <ApiErrorAlert />
    </ApiErrorProvider>
  </ThemeProvider>
);
