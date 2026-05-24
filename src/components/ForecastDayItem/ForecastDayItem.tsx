//core
import React, { useMemo } from 'react';
//other
import { getWeatherIcon } from '../../utils';
import { buildViewModel } from './utils';
import type { IForecastDayItemProps, IForecastDayItemViewModel } from './types';
import * as S from './styled';

export const ForecastDayItem: React.FC<IForecastDayItemProps> = ({
  day,
  domainMin,
  domainMax,
  themeKey,
}) => {
  const viewModel = useMemo<IForecastDayItemViewModel>(
    () => buildViewModel(day, domainMin, domainMax),
    [day, domainMax, domainMin],
  );

  return (
    <S.Item $themeKey={themeKey}>
      <S.Day>{day.dayLabel}</S.Day>
      <S.Date $themeKey={themeKey}>{day.dateLabel}</S.Date>
      <S.Condition>
        {getWeatherIcon(day.conditions, 20)}
        <S.ConditionText $themeKey={themeKey}>{day.conditions}</S.ConditionText>
      </S.Condition>
      <S.Precipitation $themeKey={themeKey}>
        {viewModel.precipitation}
      </S.Precipitation>
      <S.Range aria-hidden="true">
        <S.RangeFill
          $left={viewModel.rangePosition.left}
          $width={viewModel.rangePosition.width}
        />
      </S.Range>
      <S.Temperature>
        {viewModel.lowTemperature} / {viewModel.highTemperature}
      </S.Temperature>
    </S.Item>
  );
};
