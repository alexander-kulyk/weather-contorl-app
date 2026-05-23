//core
import React from 'react';
//components
import {
  FavoriteCitiesSection,
  SearchResultsList,
  WeatherDetailsCard,
  SearchInput,
  AppHeader,
} from './components';
//other
import { useAppWeatherDashboard } from './hooks';
import * as S from './styled';

export const App: React.FC = () => {
  const { values, handlers } = useAppWeatherDashboard();

  return (
    <S.Shell>
      <title>Aeris Weather Dashboard</title>
      <AppHeader favoriteCount={values.favorites.values.favorites.length} />

      <S.Workspace>
        <S.Sidebar>
          <SearchInput
            value={values.weather.values.searchQuery}
            status={values.weather.values.searchStatus}
            error={values.weather.values.searchError}
            onChange={values.weather.handlers.setSearchQuery}
            onClear={values.weather.handlers.clearSearch}
          />
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
          <FavoriteCitiesSection
            favorites={values.favorites.values.favorites}
            selectedWeatherId={values.selectedWeatherId}
            onSelect={handlers.handleFavoriteSelect}
            onRemove={values.favorites.handlers.removeFavorite}
          />
        </S.Sidebar>

        <S.Details>
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
        </S.Details>
      </S.Workspace>
    </S.Shell>
  );
};
