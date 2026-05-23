const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

export const formatHourLabel = (time: string): string => time.slice(0, 5);

export const formatDateLabel = (dateString: string): string => {
  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const formatDayLabel = (dateString: string, index: number): string => {
  if (index === 0) {
    return 'Today';
  }

  if (index === 1) {
    return 'Tomorrow';
  }

  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
};

export const getDayLengthMinutes = (sunrise: string, sunset: string): number => {
  const sunriseMinutes = parseTimeToMinutes(sunrise);
  const sunsetMinutes = parseTimeToMinutes(sunset);

  if (sunriseMinutes === null || sunsetMinutes === null) {
    return 0;
  }

  const rawMinutes = sunsetMinutes - sunriseMinutes;

  return rawMinutes >= 0 ? rawMinutes : rawMinutes + HOURS_IN_DAY * MINUTES_IN_HOUR;
};

export const formatDayLength = (minutes: number): string => {
  const safeMinutes = Math.max(0, minutes);
  const hours = Math.floor(safeMinutes / MINUTES_IN_HOUR);
  const remainingMinutes = safeMinutes % MINUTES_IN_HOUR;

  return `${hours}h ${remainingMinutes}m`;
};

export const parseTimeToMinutes = (time: string): number | null => {
  const [hourPart, minutePart] = time.split(':');
  const hours = Number(hourPart);
  const minutes = Number(minutePart);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return null;
  }

  return hours * MINUTES_IN_HOUR + minutes;
};
