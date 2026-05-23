//core
import React, { useCallback } from 'react';
//components
import { FavoriteButton } from '../../FavoriteButton';
//other
import { formatTemperature, getWeatherIcon } from '../../../utils';
import type { IFavoriteCity } from '../../../types';
import type { IFavoriteCitiesSectionProps } from '../types';
import * as S from '../styled';

interface IUseFavoriteCitiesSectionParams {
  selectedWeatherId?: IFavoriteCitiesSectionProps['selectedWeatherId'];
  onSelect: IFavoriteCitiesSectionProps['onSelect'];
  onRemove: IFavoriteCitiesSectionProps['onRemove'];
}

interface IUseFavoriteCitiesSectionReturn {
  renderFavorite: (favorite: IFavoriteCity) => React.ReactNode;
}

export const useFavoriteCitiesSection = ({
  selectedWeatherId,
  onSelect,
  onRemove,
}: IUseFavoriteCitiesSectionParams): IUseFavoriteCitiesSectionReturn => {
  const handleKeyDown = useCallback(
    (
      event: React.KeyboardEvent<HTMLDivElement>,
      favorite: IFavoriteCity,
    ): void => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect(favorite);
      }
    },
    [onSelect],
  );

  const renderFavorite = useCallback(
    (favorite: IFavoriteCity): React.ReactNode => {
      const handleSelect = (): void => {
        onSelect(favorite);
      };

      const handleRemove = (): void => {
        onRemove(favorite.id);
      };

      const handleRowKeyDown = (
        event: React.KeyboardEvent<HTMLDivElement>,
      ): void => {
        handleKeyDown(event, favorite);
      };

      return (
        <S.Row
          key={favorite.id}
          role='button'
          tabIndex={0}
          aria-label={`View weather details for ${favorite.city}`}
          aria-current={selectedWeatherId === favorite.id ? 'true' : undefined}
          $isSelected={selectedWeatherId === favorite.id}
          onClick={handleSelect}
          onKeyDown={handleRowKeyDown}
        >
          <S.City>
            <S.IconBox>{getWeatherIcon(favorite.conditions, 20)}</S.IconBox>
            <span>
              <S.Name>{favorite.city}</S.Name>
              <S.Meta>{favorite.conditions}</S.Meta>
            </span>
          </S.City>
          <S.Temperature>
            {formatTemperature(favorite.temperature)}
          </S.Temperature>
          <FavoriteButton
            cityName={favorite.city}
            isFavorite
            onToggle={handleRemove}
          />
        </S.Row>
      );
    },
    [handleKeyDown, onRemove, onSelect, selectedWeatherId],
  );

  return {
    renderFavorite,
  };
};
