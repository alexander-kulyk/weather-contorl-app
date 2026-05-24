//core
import React, { useMemo } from 'react';
//components
import { EmptyState } from '../EmptyState';
import { ForecastDayItem } from '../ForecastDayItem';
//other
import { getForecastTemperatureDomain } from './utils';
import type { IForecastListProps, IForecastTemperatureDomain } from './types';
import type { IWeatherDay } from '../../types';
import * as S from './styled';

export const ForecastList: React.FC<IForecastListProps> = ({ days, themeKey }) => {
  const domain = useMemo<IForecastTemperatureDomain>(
    () => getForecastTemperatureDomain(days),
    [days],
  );
  const hasDays = days.length > 0;

  if (!hasDays) {
    return <EmptyState title="Forecast data is not available." />;
  }

  return (
    <S.List $themeKey={themeKey} aria-label="Daily forecast">
      {days.map((day: IWeatherDay) => (
        <ForecastDayItem
          key={day.datetime}
          day={day}
          domainMin={domain.min}
          domainMax={domain.max}
          themeKey={themeKey}
        />
      ))}
    </S.List>
  );
};
