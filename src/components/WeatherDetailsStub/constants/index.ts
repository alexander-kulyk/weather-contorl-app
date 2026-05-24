export interface IStubMetric {
  id: string;
  label: string;
}

export const STUB_METRICS: IStubMetric[] = [
  { id: 'wind', label: 'Wind' },
  { id: 'humidity', label: 'Humidity' },
  { id: 'pressure', label: 'Pressure' },
  { id: 'visibility', label: 'Visibility' },
  { id: 'uvIndex', label: 'UV Index' },
  { id: 'feelsLike', label: 'Feels like' },
];
