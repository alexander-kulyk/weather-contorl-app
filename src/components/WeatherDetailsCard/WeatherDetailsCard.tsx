//core
import React, { useMemo } from 'react';
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
import { formatTemperature, getMetricIcon, getWeatherIcon } from '../../utils';
import { buildViewModel, getForecastDays, getSelectedDay } from './utils';
import type {
  IWeatherDetailsCardProps,
  IWeatherDetailsViewModel,
} from './types';
import type { IWeatherMetric } from '../../types';
import * as S from './styled';

export const WeatherDetailsCard: React.FC<IWeatherDetailsCardProps> = ({
  weather,
  status,
  error,
  forecastRange,
  isFavorite,
  onToggleFavorite,
  onForecastRangeChange,
  onRetry,
}) => {
  const viewModel = useMemo<IWeatherDetailsViewModel | null>(
    () => (weather ? buildViewModel(weather) : null),
    [weather],
  );
  const selectedDay = useMemo(() => getSelectedDay(weather), [weather]);
  const forecastDays = useMemo(
    () => getForecastDays(weather, forecastRange),
    [forecastRange, weather],
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
    <S.Card $themeKey={weather.themeKey}>
      <S.Hero>
        <S.CityBlock>
          <S.Location>
            <S.CityName>
              <MapPin size={22} strokeWidth={1.7} aria-hidden='true' />
              {weather.city}
            </S.CityName>
            <S.Address $themeKey={weather.themeKey}>
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
            <S.SoftText $themeKey={weather.themeKey}>
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
            themeKey={weather.themeKey}
          />
        ))}
      </S.MetricsGrid>

      <HourlyForecastChart
        hours={selectedDay?.hours ?? []}
        themeKey={weather.themeKey}
      />

      <section aria-labelledby='forecast-title'>
        <S.SectionHeader>
          <S.SectionTitle id='forecast-title'>Forecast</S.SectionTitle>
          <ForecastSwitcher
            value={forecastRange}
            onChange={onForecastRangeChange}
          />
        </S.SectionHeader>
        <ForecastList days={forecastDays} themeKey={weather.themeKey} />
      </section>

      {selectedDay && (
        <SunriseSunsetCard day={selectedDay} themeKey={weather.themeKey} />
      )}
    </S.Card>
  );
};
