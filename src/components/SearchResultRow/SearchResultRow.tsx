//core
import React, { useCallback } from 'react';
//components
import { FavoriteButton } from '../FavoriteButton';
//other
import { formatHumidity, formatTemperature, formatWindSpeed, getWeatherIcon } from '../../utils';
import type { ISearchResultRowProps } from './types';
import * as S from './styled';

export const SearchResultRow: React.FC<ISearchResultRowProps> = ({
  weather,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite,
  disabled = false,
}) => {
  const temperature = formatTemperature(weather.current.temperature);
  const wind = formatWindSpeed(weather.current.windSpeed);
  const humidity = formatHumidity(weather.current.humidity);
  const rowLabel = `View weather details for ${weather.city}`;

  const handleSelect = useCallback((): void => {
    if (!disabled) {
      onSelect(weather);
    }
  }, [disabled, onSelect, weather]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleSelect();
      }
    },
    [handleSelect],
  );

  const handleFavoriteToggle = useCallback((): void => {
    onToggleFavorite(weather);
  }, [onToggleFavorite, weather]);

  return (
    <S.Row
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={rowLabel}
      aria-disabled={disabled}
      aria-current={isSelected ? 'true' : undefined}
      $isSelected={isSelected}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
    >
      <S.CityCell>
        <S.IconBox>{getWeatherIcon(weather.current.conditions, 20)}</S.IconBox>
        <span>
          <S.CityName>{weather.city}</S.CityName>
          <S.CityMeta>{weather.country || weather.resolvedAddress}</S.CityMeta>
        </span>
      </S.CityCell>
      <S.Metric>
        <strong>{temperature}</strong>
      </S.Metric>
      <S.Metric>{wind}</S.Metric>
      <S.Metric>{humidity}</S.Metric>
      <FavoriteButton
        cityName={weather.city}
        isFavorite={isFavorite}
        onToggle={handleFavoriteToggle}
      />
    </S.Row>
  );
};
