import { formatTemperature } from '../../../utils';
import type { IHourlyChartPoint } from '../types';

export const getChartSummary = (points: IHourlyChartPoint[]): string => {
  const temperatures = points.map(
    (point: IHourlyChartPoint): number => point.temperature,
  );
  const minTemperature = Math.min(...temperatures);
  const maxTemperature = Math.max(...temperatures);
  const firstPoint = points[0];
  const lastPoint = points.at(-1);

  if (!firstPoint || !lastPoint) {
    return 'Hourly temperature data is unavailable.';
  }

  return `Temperature ranges from ${formatTemperature(minTemperature)} to ${formatTemperature(
    maxTemperature,
  )}, from ${firstPoint.time} through ${lastPoint.time}.`;
};
