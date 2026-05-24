//core
import React, { useMemo } from 'react';
//other
import type { ForecastRange } from '../../types';
import { getForecastSwitcherState } from './utils';
import type { IForecastSwitcherProps, IForecastSwitcherState } from './types';
import * as S from './styled';

export const ForecastSwitcher: React.FC<IForecastSwitcherProps> = ({ value, onChange }) => {
  const handleSevenDays = (): void => {
    onChange(7);
  };

  const handleFifteenDays = (): void => {
    onChange(15);
  };

  const state = useMemo<IForecastSwitcherState>(
    () => getForecastSwitcherState(value),
    [value],
  );
  const { isFifteenActive, isSevenActive } = state;

  return (
    <S.Switcher
      role="group"
      aria-label="Forecast range"
      $activeIndex={isFifteenActive ? 1 : 0}
    >
      <S.Button
        type="button"
        aria-pressed={isSevenActive}
        $isActive={isSevenActive}
        onClick={handleSevenDays}
      >
        7 days
      </S.Button>
      <S.Button
        type="button"
        aria-pressed={isFifteenActive}
        $isActive={isFifteenActive}
        onClick={handleFifteenDays}
      >
        15 days
      </S.Button>
    </S.Switcher>
  );
};

export type { ForecastRange };
