import React from 'react';
import {
  Sunrise,
  Sunset,
  Wind,
  Droplets,
  Gauge,
  Eye,
  Sun,
  Thermometer,
  CloudSun,
  CloudDrizzle,
  CloudRain,
  Cloud,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { WeatherThemeKey } from '../theme';

interface IIconOptions {
  size?: number;
  color?: string;
}

const DEFAULT_ICON_SIZE = 20;
const DEFAULT_STROKE_WIDTH = 1.5;

const createIcon = (Icon: LucideIcon, options: IIconOptions = {}): React.ReactNode =>
  React.createElement(Icon, {
    size: options.size ?? DEFAULT_ICON_SIZE,
    strokeWidth: DEFAULT_STROKE_WIDTH,
    color: options.color,
    'aria-hidden': true,
  });

export const getWeatherIcon = (
  condition: string,
  size: number = DEFAULT_ICON_SIZE,
): React.ReactNode => {
  const normalizedCondition = condition.toLowerCase();

  if (normalizedCondition.includes('drizzle') || normalizedCondition.includes('showers')) {
    return createIcon(CloudDrizzle, { size });
  }

  if (normalizedCondition.includes('rain') || normalizedCondition.includes('storm')) {
    return createIcon(CloudRain, { size });
  }

  if (normalizedCondition.includes('partly')) {
    return createIcon(CloudSun, { size });
  }

  if (normalizedCondition.includes('cloud') || normalizedCondition.includes('fog')) {
    return createIcon(Cloud, { size });
  }

  return createIcon(Sun, { size });
};

export const getMetricIcon = (metricId: string): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    wind: createIcon(Wind),
    humidity: createIcon(Droplets),
    pressure: createIcon(Gauge),
    visibility: createIcon(Eye),
    uvIndex: createIcon(Sun, { color: '#f59e0b' }),
    feelsLike: createIcon(Thermometer),
    sunrise: createIcon(Sunrise),
    sunset: createIcon(Sunset),
  };

  return icons[metricId] ?? createIcon(Sun);
};

export const getWeatherThemeKey = (condition: string, icon: string = ''): WeatherThemeKey => {
  const normalized = `${condition} ${icon}`.toLowerCase();

  if (normalized.includes('clear-night')) {
    return 'clearNight';
  }

  if (normalized.includes('thunder') || normalized.includes('storm')) {
    return 'storm';
  }

  if (normalized.includes('snow') || normalized.includes('sleet') || normalized.includes('ice')) {
    return 'snow';
  }

  if (
    normalized.includes('rain') ||
    normalized.includes('drizzle') ||
    normalized.includes('showers')
  ) {
    return 'rain';
  }

  if (normalized.includes('fog') || normalized.includes('mist') || normalized.includes('haze')) {
    return 'fog';
  }

  if (normalized.includes('partly')) {
    return 'partlyCloudy';
  }

  if (normalized.includes('cloud') || normalized.includes('overcast')) {
    return 'cloudy';
  }

  return 'sunny';
};
