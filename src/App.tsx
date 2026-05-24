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
        <AppHeader favoriteCount={values.favoritesCount} />
      </ErrorBoundary>

      <S.Workspace>
        <S.Sidebar>
          <ErrorBoundary component='SearchInput'>
            <SearchInput
              value={values.searchQuery}
              status={values.searchStatus}
              error={values.searchError}
              onChange={handlers.setSearchQuery}
              onClear={handlers.clearSearch}
            />
          </ErrorBoundary>
          <ErrorBoundary component='SearchResultsList'>
            <SearchResultsList
              results={values.searchResults}
              status={values.searchStatus}
              error={values.searchError}
              hasSearchStarted={values.hasSearchStarted}
              selectedWeatherId={values.selectedWeatherId}
              isFavorite={values.isFavorite}
              onSelect={handlers.handleWeatherSelect}
              onToggleFavorite={handlers.handleWeatherFavoriteToggle}
            />
          </ErrorBoundary>
          <ErrorBoundary component='FavoriteCitiesSection'>
            <FavoriteCitiesSection
              selectedWeatherId={values.selectedWeatherId}
              onSelect={handlers.handleFavoriteSelect}
            />
          </ErrorBoundary>
        </S.Sidebar>

        <S.Details>
          <ErrorBoundary component='WeatherDetailsCard'>
            <WeatherDetailsCard
              weather={values.selectedWeather}
              status={values.detailStatus}
              error={values.detailError}
              isFavorite={values.selectedIsFavorite}
              onToggleFavorite={handlers.handleWeatherFavoriteToggle}
              onRetry={handlers.retrySelected}
            />
          </ErrorBoundary>
        </S.Details>
      </S.Workspace>
    </S.Shell>
  );
};
