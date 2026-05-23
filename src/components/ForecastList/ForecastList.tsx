//core
import React, { useMemo } from 'react';
//components
import { EmptyState } from '../EmptyState';
import { ForecastDayItem } from '../ForecastDayItem';
//other
import type { IForecastListProps } from './types';
import type { IWeatherDay } from '../../types';
import * as S from './styled';

export const ForecastList: React.FC<IForecastListProps> = ({ days, themeKey }) => {
  const domainMin = useMemo(
    () => Math.min(...days.map((day: IWeatherDay) => day.temperatureMin)),
    [days],
  );
  const domainMax = useMemo(
    () => Math.max(...days.map((day: IWeatherDay) => day.temperatureMax)),
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
          domainMin={domainMin}
          domainMax={domainMax}
          themeKey={themeKey}
        />
      ))}
    </S.List>
  );
};
