//core
import React from 'react';
//components
import {
  AppHeader,
  ErrorBoundary,
  FavoriteCitiesSection,
  SearchInput,
  SearchResultsList,
  WeatherDetailsCard,
} from './components';
//other
import { useAppWeatherDashboard } from './hooks';
import * as S from './styled';

export const App: React.FC = () => {
  const { values, handlers } = useAppWeatherDashboard();

  return (
    <S.Shell>
      <title>Weather Dashboard</title>
      <ErrorBoundary component='AppHeader'>
        <AppHeader favoriteCount={values.favorites.values.favorites.length} />
      </ErrorBoundary>

      <S.Workspace>
        <S.Sidebar>
          <ErrorBoundary component='SearchInput'>
            <SearchInput
              value={values.weather.values.searchQuery}
              status={values.weather.values.searchStatus}
              error={values.weather.values.searchError}
              onChange={values.weather.handlers.setSearchQuery}
              onClear={values.weather.handlers.clearSearch}
            />
          </ErrorBoundary>
          <ErrorBoundary component='SearchResultsList'>
            <SearchResultsList
              results={values.weather.values.searchResults}
              status={values.weather.values.searchStatus}
              error={values.weather.values.searchError}
              hasSearchStarted={values.weather.values.hasSearchStarted}
              selectedWeatherId={values.selectedWeatherId}
              isFavorite={values.favorites.handlers.isFavorite}
              onSelect={handlers.handleWeatherSelect}
              onToggleFavorite={handlers.handleWeatherFavoriteToggle}
            />
          </ErrorBoundary>
          <ErrorBoundary component='FavoriteCitiesSection'>
            <FavoriteCitiesSection
              favorites={values.favorites.values.favorites}
              selectedWeatherId={values.selectedWeatherId}
              onSelect={handlers.handleFavoriteSelect}
              onRemove={values.favorites.handlers.removeFavorite}
            />
          </ErrorBoundary>
        </S.Sidebar>

        <S.Details>
          <ErrorBoundary component='WeatherDetailsCard'>
            <WeatherDetailsCard
              weather={values.weather.values.selectedWeather}
              status={values.weather.values.detailStatus}
              error={values.weather.values.detailError}
              forecastRange={values.weather.values.forecastRange}
              isFavorite={values.selectedIsFavorite}
              onToggleFavorite={handlers.handleWeatherFavoriteToggle}
              onForecastRangeChange={values.weather.handlers.setForecastRange}
              onRetry={values.weather.handlers.retrySelected}
            />
          </ErrorBoundary>
        </S.Details>
      </S.Workspace>
    </S.Shell>
  );
};
