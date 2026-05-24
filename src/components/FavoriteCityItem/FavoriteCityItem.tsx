//core
import React, { useCallback } from 'react';
//components
import { FavoriteButton } from '../FavoriteButton';
//other
import { formatTemperature, getWeatherIcon } from '../../utils';
import type { IFavoriteCityItemProps } from './types';
import * as S from './styled';

const ICON_SIZE = 20;

export const FavoriteCityItem: React.FC<IFavoriteCityItemProps> = ({
  favorite,
  isSelected,
  onSelect,
  onRemove,
}) => {
  const handleSelect = useCallback((): void => {
    onSelect(favorite);
  }, [favorite, onSelect]);

  const handleRemove = useCallback((): void => {
    onRemove(favorite.id);
  }, [favorite.id, onRemove]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      event.preventDefault();
      onSelect(favorite);
    },
    [favorite, onSelect],
  );

  return (
    <S.Row
      role='button'
      tabIndex={0}
      aria-label={`Open weather details for ${favorite.city}`}
      aria-current={isSelected ? 'true' : undefined}
      $isSelected={isSelected}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
    >
      <S.City>
        <S.IconBox>{getWeatherIcon(favorite.conditions, ICON_SIZE)}</S.IconBox>
        <S.Body>
          <S.Name>{favorite.city}</S.Name>
          <S.Meta>{favorite.conditions}</S.Meta>
        </S.Body>
      </S.City>
      <S.Temperature>{formatTemperature(favorite.temperature)}</S.Temperature>
      <FavoriteButton
        cityName={favorite.city}
        isFavorite
        onToggle={handleRemove}
      />
    </S.Row>
  );
};
