//core
import React, { useMemo } from 'react';
//components
import { FavoriteButton } from '../Favorites/FavoriteButton';
//other
import { getWeatherIcon } from '../../utils';
import { buildViewModel } from './utils';
import type { ISearchResultRowProps, ISearchResultRowViewModel } from './types';
import * as S from './styled';

export const SearchResultRow: React.FC<ISearchResultRowProps> = ({
  weather,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite,
  disabled = false,
}) => {
  const viewModel = useMemo<ISearchResultRowViewModel>(
    () => buildViewModel(weather),
    [weather],
  );

  const handleSelect = (): void => {
    if (!disabled) {
      onSelect(weather);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect();
    }
  };

  const handleFavoriteToggle = (): void => {
    onToggleFavorite(weather);
  };

  return (
    <S.Row
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={viewModel.rowLabel}
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
          <S.CityMeta>{viewModel.cityMeta}</S.CityMeta>
        </span>
      </S.CityCell>
      <S.Metric>
        <strong>{viewModel.temperature}</strong>
      </S.Metric>
      <S.Metric>{viewModel.wind}</S.Metric>
      <S.Metric>{viewModel.humidity}</S.Metric>
      <FavoriteButton
        cityName={weather.city}
        isFavorite={isFavorite}
        onToggle={handleFavoriteToggle}
      />
    </S.Row>
  );
};
