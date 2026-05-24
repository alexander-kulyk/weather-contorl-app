import { useFavoritesContext, useWeatherContext } from '../context';
import type { IFavoriteCity, IWeatherResponse } from '../types';

interface IUseAppWeatherDashboardValues {
  weather: ReturnType<typeof useWeatherContext>;
  favorites: ReturnType<typeof useFavoritesContext>;
  selectedWeatherId?: string;
  selectedIsFavorite: boolean;
}

interface IUseAppWeatherDashboardHandlers {
  handleFavoriteSelect: (favorite: IFavoriteCity) => void;
  handleWeatherSelect: (weatherResult: IWeatherResponse) => void;
  handleWeatherFavoriteToggle: (weatherResult: IWeatherResponse) => void;
}

interface IUseAppWeatherDashboardReturn {
  values: IUseAppWeatherDashboardValues;
  handlers: IUseAppWeatherDashboardHandlers;
}

export const useAppWeatherDashboard = (): IUseAppWeatherDashboardReturn => {
  const weather = useWeatherContext();
  const favorites = useFavoritesContext();
  const selectedWeatherId = weather.values.selectedWeather?.id;
  const selectedIsFavorite = selectedWeatherId
    ? favorites.handlers.isFavorite(selectedWeatherId)
    : false;

  const handleFavoriteSelect = (favorite: IFavoriteCity): void => {
    weather.handlers.selectCityByName(favorite.resolvedAddress);
  };

  const handleWeatherSelect = (weatherResult: IWeatherResponse): void => {
    weather.handlers.selectWeather(weatherResult);
  };

  const handleWeatherFavoriteToggle = (weatherResult: IWeatherResponse): void => {
    favorites.handlers.toggleWeatherFavorite(weatherResult);
  };

  return {
    values: {
      weather,
      favorites,
      selectedWeatherId,
      selectedIsFavorite,
    },
    handlers: {
      handleFavoriteSelect,
      handleWeatherSelect,
      handleWeatherFavoriteToggle,
    },
  };
};
