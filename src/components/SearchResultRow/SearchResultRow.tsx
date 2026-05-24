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
    onSelect(weather);
  };

  const handleFavoriteToggle = (): void => {
    onToggleFavorite(weather);
  };

  return (
    <S.Row $isSelected={isSelected}>
      <S.SelectButton
        type='button'
        disabled={disabled}
        aria-label={viewModel.rowLabel}
        aria-current={isSelected ? 'page' : undefined}
        onClick={handleSelect}
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
      </S.SelectButton>
      <FavoriteButton
        cityName={weather.city}
        isFavorite={isFavorite}
        onToggle={handleFavoriteToggle}
      />
    </S.Row>
  );
};
