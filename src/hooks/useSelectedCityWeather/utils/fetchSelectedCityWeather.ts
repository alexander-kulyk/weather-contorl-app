import { isApiError, isRequestCanceled, weatherApi } from '../../../api';
import type { IWeatherResponse } from '../../../types';
import { toAppError } from '../../../utils';
import type { IFetchSelectedCityWeatherParams } from '../types';

export const fetchSelectedCityWeather = async ({
  city,
  onApiError,
  setError,
  setSelectedWeather,
  setStatus,
  signal,
}: IFetchSelectedCityWeatherParams): Promise<void> => {
  try {
    const weather: IWeatherResponse = await weatherApi.fetchWeatherByCity(
      city,
      signal,
    );

    if (signal.aborted) {
      return;
    }

    setSelectedWeather(weather);
    setStatus('success');
    setError(null);
  } catch (requestError: unknown) {
    if (signal.aborted || isRequestCanceled(requestError)) {
      return;
    }

    if (isApiError(requestError)) {
      onApiError?.(requestError);
    }

    setSelectedWeather(null);
    setStatus('error');
    setError(toAppError(requestError));
  }
};
