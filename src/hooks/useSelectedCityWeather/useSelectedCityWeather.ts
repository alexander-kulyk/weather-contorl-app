import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AsyncStatus, IAppError, IWeatherResponse } from '../../types';
import type {
  IUseSelectedCityWeatherHandlers,
  IUseSelectedCityWeatherParams,
  IUseSelectedCityWeatherReturn,
  IUseSelectedCityWeatherValues,
  SelectedWeatherOutcome,
} from './types';
import { fetchSelectedCityWeather } from './utils';

export const useSelectedCityWeather = ({
  onApiError,
}: IUseSelectedCityWeatherParams = {}): IUseSelectedCityWeatherReturn => {
  const [requestedCity, setRequestedCity] = useState<string | null>(null);
  const [lastRequestedCity, setLastRequestedCity] = useState<string | null>(null);
  const [selectedWeather, setSelectedWeather] =
    useState<IWeatherResponse | null>(null);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [error, setError] = useState<IAppError | null>(null);

  const selectWeather = useCallback((weather: IWeatherResponse): void => {
    setRequestedCity(null);
    setLastRequestedCity(weather.resolvedAddress);
    setSelectedWeather(weather);
    setStatus('success');
    setError(null);
  }, []);

  const selectCityByName = useCallback((city: string): void => {
    setSelectedWeather(null);
    setLastRequestedCity(city);
    setRequestedCity(city);
    setStatus('loading');
    setError(null);
  }, []);

  const clearSelected = useCallback((): void => {
    setRequestedCity(null);
    setSelectedWeather(null);
    setStatus('idle');
    setError(null);
  }, []);

  const retrySelected = useCallback((): void => {
    const city = selectedWeather?.resolvedAddress ?? lastRequestedCity;

    if (!city) {
      return;
    }

    selectCityByName(city);
  }, [lastRequestedCity, selectCityByName, selectedWeather]);

  const applyOutcome = useCallback((outcome: SelectedWeatherOutcome): void => {
    if (outcome.kind === 'aborted') {
      return;
    }

    if (outcome.kind === 'success') {
      setSelectedWeather(outcome.weather);
      setStatus('success');
      setError(null);
      return;
    }

    setSelectedWeather(null);
    setStatus('error');
    setError(outcome.error);
  }, []);

  useEffect(() => {
    if (!requestedCity) {
      return;
    }

    const abortController = new AbortController();

    void fetchSelectedCityWeather({
      city: requestedCity,
      onApiError,
      signal: abortController.signal,
    }).then(applyOutcome);

    return (): void => {
      abortController.abort();
    };
  }, [applyOutcome, onApiError, requestedCity]);

  const values = useMemo<IUseSelectedCityWeatherValues>(
    () => ({
      selectedWeather,
      status,
      error,
    }),
    [error, selectedWeather, status],
  );

  const handlers = useMemo<IUseSelectedCityWeatherHandlers>(
    () => ({
      selectWeather,
      selectCityByName,
      clearSelected,
      retrySelected,
    }),
    [clearSelected, retrySelected, selectCityByName, selectWeather],
  );

  return { values, handlers };
};
