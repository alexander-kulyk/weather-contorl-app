//core
import React, { useCallback } from 'react';
import { Heart } from 'lucide-react';
//components
import { FavoriteButton } from '../FavoriteButton';
import { EmptyState } from '../EmptyState';
//other
import { formatTemperature, getWeatherIcon } from '../../utils';
import type { IFavoriteCitiesSectionProps } from './types';
import type { IFavoriteCity } from '../../types';
import * as S from './styled';

export const FavoriteCitiesSection: React.FC<IFavoriteCitiesSectionProps> = ({
  favorites,
  selectedWeatherId,
  onSelect,
  onRemove,
}) => {
  const hasFavorites = favorites.length > 0;

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

  const renderFavorite = (favorite: IFavoriteCity): React.ReactNode => {
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
        <S.Temperature>{formatTemperature(favorite.temperature)}</S.Temperature>
        <FavoriteButton
          cityName={favorite.city}
          isFavorite
          onToggle={handleRemove}
        />
      </S.Row>
    );
  };

  return (
    <S.Section aria-labelledby='favorite-cities-title'>
      <S.Header>
        <S.Title id='favorite-cities-title'>
          <Heart
            size={14}
            strokeWidth={1.8}
            fill='currentColor'
            aria-hidden='true'
          />
          Favorites
        </S.Title>
        <S.Count>{favorites.length}</S.Count>
      </S.Header>

      {!hasFavorites && (
        <EmptyState
          title='No favorite cities yet.'
          description='Add a city from results or details to keep it here.'
        />
      )}
      {hasFavorites && (
        <S.List role='list'>{favorites.map(renderFavorite)}</S.List>
      )}
    </S.Section>
  );
};
