import React, { useCallback } from 'react';
import {
  AppHeader,
  FavoriteCitiesSection,
  SearchInput,
  SearchResultsList,
  WeatherDetailsCard,
} from './components';
import { useFavoritesContext, useWeatherContext } from './context';
import type { IFavoriteCity, IWeatherResponse } from './types';
import * as S from './styled';

export const App: React.FC = () => {
  const weather = useWeatherContext();
  const favorites = useFavoritesContext();
  const selectedWeatherId = weather.values.selectedWeather?.id;
  const selectedIsFavorite = selectedWeatherId
    ? favorites.handlers.isFavorite(selectedWeatherId)
    : false;

  const handleFavoriteSelect = useCallback(
    (favorite: IFavoriteCity): void => {
      weather.handlers.selectCityByName(favorite.resolvedAddress);
    },
    [weather.handlers],
  );

  const handleWeatherSelect = useCallback(
    (weatherResult: IWeatherResponse): void => {
      weather.handlers.selectWeather(weatherResult);
    },
    [weather.handlers],
  );

  const handleWeatherFavoriteToggle = useCallback(
    (weatherResult: IWeatherResponse): void => {
      favorites.handlers.toggleWeatherFavorite(weatherResult);
    },
    [favorites.handlers],
  );

  return (
    <S.Shell>
      <title>Aeris Weather Dashboard</title>
      <AppHeader favoriteCount={favorites.values.favorites.length} />

      <S.Workspace>
        <S.Sidebar>
          <SearchInput
            value={weather.values.searchQuery}
            status={weather.values.searchStatus}
            error={weather.values.searchError}
            onChange={weather.handlers.setSearchQuery}
            onClear={weather.handlers.clearSearch}
          />
          <SearchResultsList
            results={weather.values.searchResults}
            status={weather.values.searchStatus}
            error={weather.values.searchError}
            hasSearchStarted={weather.values.hasSearchStarted}
            selectedWeatherId={selectedWeatherId}
            isFavorite={favorites.handlers.isFavorite}
            onSelect={handleWeatherSelect}
            onToggleFavorite={handleWeatherFavoriteToggle}
          />
          <FavoriteCitiesSection
            favorites={favorites.values.favorites}
            selectedWeatherId={selectedWeatherId}
            onSelect={handleFavoriteSelect}
            onRemove={favorites.handlers.removeFavorite}
          />
        </S.Sidebar>

        <S.Details>
          <WeatherDetailsCard
            weather={weather.values.selectedWeather}
            status={weather.values.detailStatus}
            error={weather.values.detailError}
            forecastRange={weather.values.forecastRange}
            isFavorite={selectedIsFavorite}
            onToggleFavorite={handleWeatherFavoriteToggle}
            onForecastRangeChange={weather.handlers.setForecastRange}
            onRetry={weather.handlers.retrySelected}
          />
        </S.Details>
      </S.Workspace>
    </S.Shell>
  );
};
