//core
import React from 'react';
import { CloudSun, Heart } from 'lucide-react';
//other
import type { IAppHeaderProps } from './types';
import * as S from './styled';

export const AppHeader: React.FC<IAppHeaderProps> = ({ favoriteCount }) => (
  <S.Header>
    <S.Brand>
      <S.Logo>
        <CloudSun size={24} strokeWidth={1.7} aria-hidden="true" />
      </S.Logo>
      <S.TitleGroup>
        <S.Title>Aeris</S.Title>
        <S.Subtitle>Weather dashboard</S.Subtitle>
      </S.TitleGroup>
    </S.Brand>

    <S.FavoriteBadge aria-label={`${favoriteCount} favorite cities`}>
      <Heart size={16} strokeWidth={1.8} fill="currentColor" aria-hidden="true" />
      {favoriteCount}
    </S.FavoriteBadge>
  </S.Header>
);
