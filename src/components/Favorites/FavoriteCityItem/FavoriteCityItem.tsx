//core
import React from 'react';
//components
import { FavoriteButton } from '../FavoriteButton';
//other
import { formatTemperature, getWeatherIcon } from '../../../utils';
import type { IFavoriteCityItemProps } from './types';
import * as S from './styled';

const ICON_SIZE = 20;

export const FavoriteCityItem: React.FC<IFavoriteCityItemProps> = ({
  favorite,
  isSelected,
  onSelect,
  onRemove,
}) => {
  const handleSelect = (): void => {
    onSelect(favorite);
  };

  const handleRemove = (): void => {
    onRemove(favorite.id);
  };

  return (
    <S.Row $isSelected={isSelected}>
      <S.SelectButton
        type='button'
        aria-label={`Open weather details for ${favorite.city}`}
        aria-current={isSelected ? 'page' : undefined}
        onClick={handleSelect}
      >
        <S.City>
          <S.IconBox>{getWeatherIcon(favorite.conditions, ICON_SIZE)}</S.IconBox>
          <S.Body>
            <S.Name>{favorite.city}</S.Name>
            <S.Meta>{favorite.conditions}</S.Meta>
          </S.Body>
        </S.City>
        <S.Temperature>{formatTemperature(favorite.temperature)}</S.Temperature>
      </S.SelectButton>
      <FavoriteButton
        cityName={favorite.city}
        isFavorite
        onToggle={handleRemove}
      />
    </S.Row>
  );
};
