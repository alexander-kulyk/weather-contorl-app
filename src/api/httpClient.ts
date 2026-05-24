import axios from 'axios';
import { API } from './constants';
import { apiKeyGuard } from './utils';

const REQUEST_TIMEOUT_MS = 10_000;

export const httpClient = axios.create({
  baseURL: API.BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
});

httpClient.interceptors.request.use((config) => {
  const apiKey = apiKeyGuard(import.meta.env.VITE_VISUAL_CROSSING_API_KEY);

  config.params = {
    unitGroup: 'metric',
    contentType: 'json',
    ...config.params,
    key: apiKey,
  };

  return config;
});
