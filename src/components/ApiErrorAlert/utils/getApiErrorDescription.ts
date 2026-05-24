export const getApiErrorDescription = (code: string): string => {
  if (code === 'NO_RESULTS') {
    return 'The query returned no matching cities. The request was well-formed but no records exist.';
  }

  if (code === 'NETWORK') {
    return 'The request could not reach the weather service. Check the connection and try again.';
  }

  if (code === 'API_LIMIT') {
    return 'The weather service rejected the request or temporarily limited access.';
  }

  return 'The weather request failed before the dashboard could load fresh data.';
};
