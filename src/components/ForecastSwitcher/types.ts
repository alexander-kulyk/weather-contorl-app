import type { ForecastRange } from '../../types';

export interface IForecastSwitcherProps {
  value: ForecastRange;
  onChange: (value: ForecastRange) => void;
}

export interface IForecastSwitcherState {
  isSevenActive: boolean;
  isFifteenActive: boolean;
}
