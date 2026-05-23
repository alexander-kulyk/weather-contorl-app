//core
import React from 'react';
//other
import type { IWeatherMetricCardProps } from './types';
import * as S from './styled';

export const WeatherMetricCard: React.FC<IWeatherMetricCardProps> = ({
  label,
  value,
  helper,
  icon,
  themeKey,
}) => (
  <S.Card $themeKey={themeKey}>
    <S.Header>
      <S.Icon $themeKey={themeKey}>{icon}</S.Icon>
      <S.Label $themeKey={themeKey}>{label}</S.Label>
    </S.Header>
    <S.Value>{value}</S.Value>
    {helper && <S.Helper $themeKey={themeKey}>{helper}</S.Helper>}
  </S.Card>
);
