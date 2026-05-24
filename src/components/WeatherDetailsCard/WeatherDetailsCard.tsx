//core
import React, { useCallback, useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';
//components
import { ErrorMessage } from '../ErrorMessage';
import { FavoriteButton } from '../Favorites';
import { ForecastList } from '../ForecastList';
import { ForecastSwitcher } from '../ForecastSwitcher';
import { HourlyForecastChart } from '../HourlyForecastChart';
import { LoadingSkeleton } from '../LoadingSkeleton';
import { SunriseSunsetCard } from '../SunriseSunsetCard';
import { WeatherDetailsStub } from '../WeatherDetailsStub';
import { WeatherMetricCard } from '../WeatherMetricCard';
//other
import {
  formatTemperature,
  getMetricIcon,
  getWeatherIcon,
  getWeatherThemeKey,
} from '../../utils';
import { buildViewModel, getForecastDays, getSelectedDay } from './utils';
import type {
  IWeatherDetailsCardProps,
  IWeatherDetailsViewModel,
} from './types';
import type { ForecastRange, IWeatherMetric } from '../../types';
import * as S from './styled';

const DEFAULT_FORECAST_RANGE: ForecastRange = 7;

export const WeatherDetailsCard: React.FC<IWeatherDetailsCardProps> = ({
  weather,
  status,
  error,
  isFavorite,
  onToggleFavorite,
  onRetry,
}) => {
  const [forecastRange, setForecastRange] = useState<ForecastRange>(
    DEFAULT_FORECAST_RANGE,
  );

  const handleForecastRangeChange = useCallback((range: ForecastRange): void => {
    setForecastRange(range);
  }, []);
  const viewModel = useMemo<IWeatherDetailsViewModel | null>(
    () => (weather ? buildViewModel(weather) : null),
    [weather],
  );
  const selectedDay = useMemo(() => getSelectedDay(weather), [weather]);
  const forecastDays = useMemo(
    () => getForecastDays(weather, forecastRange),
    [forecastRange, weather],
  );
  const themeKey = useMemo(
    () =>
      weather
        ? getWeatherThemeKey(weather.current.conditions, weather.current.icon)
        : 'sunny',
    [weather],
  );

  const handleFavoriteToggle = (): void => {
    if (weather) {
      onToggleFavorite(weather);
    }
  };

  if (status === 'loading') {
    return <LoadingSkeleton variant='details' />;
  }

  if (status === 'error' && error) {
    return <ErrorMessage message={error.message} onRetry={onRetry} />;
  }

  if (!weather || !viewModel) {
    return <WeatherDetailsStub />;
  }

  return (
    <S.Card $themeKey={themeKey}>
      <S.Hero>
        <S.CityBlock>
          <S.Location>
            <S.CityName>
              <MapPin size={22} strokeWidth={1.7} aria-hidden='true' />
              {weather.city}
            </S.CityName>
            <S.Address $themeKey={themeKey}>
              {weather.resolvedAddress}
            </S.Address>
          </S.Location>
          <S.Temperature>
            {formatTemperature(weather.current.temperature)}
          </S.Temperature>
        </S.CityBlock>

        <S.ConditionBlock>
          <FavoriteButton
            cityName={weather.city}
            isFavorite={isFavorite}
            onToggle={handleFavoriteToggle}
            variant='soft'
          />
          <S.ConditionIcon>
            {getWeatherIcon(weather.current.conditions, 58)}
          </S.ConditionIcon>
          <div>
            <S.ConditionText>{weather.current.conditions}</S.ConditionText>
            <S.SoftText $themeKey={themeKey}>
              Feels like {formatTemperature(weather.current.feelsLike)}
            </S.SoftText>
          </div>
        </S.ConditionBlock>
      </S.Hero>

      <S.MetricsGrid>
        {viewModel.metrics.map((metric: IWeatherMetric) => (
          <WeatherMetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            helper={metric.helper}
            icon={getMetricIcon(metric.id)}
            themeKey={themeKey}
          />
        ))}
      </S.MetricsGrid>

      <HourlyForecastChart
        hours={selectedDay?.hours ?? []}
        themeKey={themeKey}
      />

      <section aria-labelledby='forecast-title'>
        <S.SectionHeader>
          <S.SectionTitle id='forecast-title'>Forecast</S.SectionTitle>
          <ForecastSwitcher
            value={forecastRange}
            onChange={handleForecastRangeChange}
          />
        </S.SectionHeader>
        <ForecastList days={forecastDays} themeKey={themeKey} />
      </section>

      {selectedDay && (
        <SunriseSunsetCard day={selectedDay} themeKey={themeKey} />
      )}
    </S.Card>
  );
};
