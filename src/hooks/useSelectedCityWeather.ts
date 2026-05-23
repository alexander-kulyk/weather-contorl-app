import { useCallback, useEffect, useMemo, useState } from 'react';
import { getWeatherByCity, isApiError, isRequestCanceled } from '../api';
import type { IApiError } from '../api';
import type { AsyncStatus, IAppError, IWeatherResponse } from '../types';

interface IUseSelectedCityWeatherParams {
  onApiError?: (error: IApiError) => void;
}

interface IUseSelectedCityWeatherValues {
  selectedWeather: IWeatherResponse | null;
  status: AsyncStatus;
  error: IAppError | null;
}

interface IUseSelectedCityWeatherHandlers {
  selectWeather: (weather: IWeatherResponse) => void;
  selectCityByName: (city: string) => void;
  clearSelected: () => void;
  retrySelected: () => void;
}

interface IUseSelectedCityWeatherReturn {
  values: IUseSelectedCityWeatherValues;
  handlers: IUseSelectedCityWeatherHandlers;
}

export const useSelectedCityWeather = ({
  onApiError,
}: IUseSelectedCityWeatherParams = {}): IUseSelectedCityWeatherReturn => {
  const [requestedCity, setRequestedCity] = useState<string | null>(null);
  const [lastRequestedCity, setLastRequestedCity] = useState<string | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<IWeatherResponse | null>(null);
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

  useEffect(() => {
    if (!requestedCity) {
      return;
    }

    const abortController = new AbortController();

    getWeatherByCity(requestedCity, abortController.signal)
      .then((weather: IWeatherResponse): void => {
        setSelectedWeather(weather);
        setStatus('success');
        setError(null);
      })
      .catch((requestError: unknown): void => {
        if (isRequestCanceled(requestError)) {
          return;
        }

        if (isApiError(requestError)) {
          onApiError?.(requestError);
        }

        setSelectedWeather(null);
        setStatus('error');
        setError(toAppError(requestError));
      });

    return (): void => {
      abortController.abort();
    };
  }, [onApiError, requestedCity]);

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

const toAppError = (error: unknown): IAppError => {
  if (isApiError(error)) {
    return {
      code: error.code,
      message: error.message,
    };
  }

  return {
    code: 'UNKNOWN',
    message: 'Could not load weather data. Please try again.',
  };
};
