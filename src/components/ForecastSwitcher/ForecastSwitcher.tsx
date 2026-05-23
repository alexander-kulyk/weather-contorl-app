//core
import React, { useCallback } from 'react';
//other
import type { ForecastRange } from '../../types';
import type { IForecastSwitcherProps } from './types';
import * as S from './styled';

export const ForecastSwitcher: React.FC<IForecastSwitcherProps> = ({ value, onChange }) => {
  const handleSevenDays = useCallback((): void => {
    onChange(7);
  }, [onChange]);

  const handleFifteenDays = useCallback((): void => {
    onChange(15);
  }, [onChange]);

  const isSevenActive = value === 7;
  const isFifteenActive = value === 15;

  return (
    <S.Switcher role="group" aria-label="Forecast range">
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
