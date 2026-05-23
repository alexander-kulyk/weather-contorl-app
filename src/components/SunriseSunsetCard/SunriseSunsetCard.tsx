//core
import React from 'react';
import { Clock, Sunrise, Sunset } from 'lucide-react';
//other
import { formatDayLength, formatHourLabel } from '../../utils';
import type { ISunriseSunsetCardProps } from './types';
import * as S from './styled';

export const SunriseSunsetCard: React.FC<ISunriseSunsetCardProps> = ({ day, themeKey }) => {
  const sunrise = formatHourLabel(day.sunrise);
  const sunset = formatHourLabel(day.sunset);
  const dayLength = formatDayLength(day.dayLengthMinutes);

  return (
    <S.Section aria-labelledby="sun-daylight-title">
      <S.Title id="sun-daylight-title">Sun & daylight</S.Title>
      <S.Card $themeKey={themeKey}>
        <S.Arc aria-hidden="true" />
        <S.Metric>
          <S.Label $themeKey={themeKey}>
            <Sunrise size={16} strokeWidth={1.5} aria-hidden="true" />
            Sunrise
          </S.Label>
          <S.Value>{sunrise}</S.Value>
        </S.Metric>
        <S.Metric>
          <S.Label $themeKey={themeKey}>
            <Sunset size={16} strokeWidth={1.5} aria-hidden="true" />
            Sunset
          </S.Label>
          <S.Value>{sunset}</S.Value>
        </S.Metric>
        <S.Metric>
          <S.Label $themeKey={themeKey}>
            <Clock size={16} strokeWidth={1.5} aria-hidden="true" />
            Day length
          </S.Label>
          <S.Value>{dayLength}</S.Value>
        </S.Metric>
      </S.Card>
    </S.Section>
  );
};
