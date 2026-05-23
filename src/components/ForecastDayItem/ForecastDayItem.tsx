//core
import React, { useMemo } from 'react';
//other
import {
  formatPrecipitation,
  formatTemperature,
  getTemperatureRangePosition,
  getWeatherIcon,
} from '../../utils';
import type { IForecastDayItemProps } from './types';
import * as S from './styled';

export const ForecastDayItem: React.FC<IForecastDayItemProps> = ({
  day,
  domainMin,
  domainMax,
  themeKey,
}) => {
  const rangePosition = useMemo(
    () =>
      getTemperatureRangePosition(
        day.temperatureMin,
        day.temperatureMax,
        domainMin,
        domainMax,
      ),
    [day.temperatureMax, day.temperatureMin, domainMax, domainMin],
  );
  const precipitation = formatPrecipitation(day.precipitationProbability);
  const lowTemperature = formatTemperature(day.temperatureMin);
  const highTemperature = formatTemperature(day.temperatureMax);

  return (
    <S.Item $themeKey={themeKey}>
      <S.Day>{day.dayLabel}</S.Day>
      <S.Date $themeKey={themeKey}>{day.dateLabel}</S.Date>
      <S.Condition>
        {getWeatherIcon(day.conditions, 20)}
        <S.ConditionText $themeKey={themeKey}>{day.conditions}</S.ConditionText>
      </S.Condition>
      <S.Precipitation $themeKey={themeKey}>{precipitation}</S.Precipitation>
      <S.Range aria-hidden="true">
        <S.RangeFill $left={rangePosition.left} $width={rangePosition.width} />
      </S.Range>
      <S.Temperature>
        {lowTemperature} / {highTemperature}
      </S.Temperature>
    </S.Item>
  );
};
