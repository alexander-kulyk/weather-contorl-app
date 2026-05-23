export interface ITemperatureRangePosition {
  left: number;
  width: number;
}

const CARDINAL_DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const FULL_CIRCLE_DEGREES = 360;
const CARDINAL_SEGMENT_DEGREES = 45;

export const formatTemperature = (value: number): string => `${Math.round(value)}°`;

export const formatTemperatureWithUnit = (value: number): string =>
  `${Math.round(value)}°C`;

export const formatWindSpeed = (value: number): string => `${Math.round(value)} km/h`;

export const formatHumidity = (value: number): string => `${Math.round(value)}%`;

export const formatPressure = (value: number): string => `${Math.round(value)} hPa`;

export const formatVisibility = (value: number): string => `${Math.round(value)} km`;

export const formatPrecipitation = (value: number): string => {
  if (value <= 0) {
    return '-';
  }

  return `${Math.round(value)}%`;
};

export const formatWindDirection = (degrees: number): string => {
  const normalizedDegrees = ((degrees % FULL_CIRCLE_DEGREES) + FULL_CIRCLE_DEGREES) %
    FULL_CIRCLE_DEGREES;
  const index = Math.round(normalizedDegrees / CARDINAL_SEGMENT_DEGREES) %
    CARDINAL_DIRECTIONS.length;

  return CARDINAL_DIRECTIONS[index] ?? 'N';
};

export const getUvDescription = (uvIndex: number): string => {
  if (uvIndex >= 8) {
    return 'Very high';
  }

  if (uvIndex >= 6) {
    return 'High';
  }

  if (uvIndex >= 3) {
    return 'Moderate';
  }

  return 'Low';
};

export const getTemperatureRangePosition = (
  min: number,
  max: number,
  domainMin: number,
  domainMax: number,
): ITemperatureRangePosition => {
  const domain = Math.max(1, domainMax - domainMin);
  const left = ((min - domainMin) / domain) * 100;
  const width = ((max - min) / domain) * 100;

  return {
    left: Math.max(0, Math.min(100, left)),
    width: Math.max(8, Math.min(100, width)),
  };
};
