import { formatTemperature } from '../../../utils';

export const formatTemperatureTick = (value: string | number): string => {
  const numericValue = Number(value);

  return Number.isFinite(numericValue)
    ? formatTemperature(numericValue)
    : String(value);
};
