import type { ForecastRange } from '../../../types';
import type { IForecastSwitcherState } from '../types';

export const getForecastSwitcherState = (
  value: ForecastRange,
): IForecastSwitcherState => ({
  isSevenActive: value === 7,
  isFifteenActive: value === 15,
});
