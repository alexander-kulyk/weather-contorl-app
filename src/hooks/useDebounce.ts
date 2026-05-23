import { useEffect, useState } from 'react';

export const useDebounce = <TValue>(value: TValue, delayMs: number): TValue => {
  const [debouncedValue, setDebouncedValue] = useState<TValue>(value);

  useEffect(() => {
    const timeoutId = window.setTimeout((): void => {
      setDebouncedValue(value);
    }, delayMs);

    return (): void => {
      window.clearTimeout(timeoutId);
    };
  }, [delayMs, value]);

  return debouncedValue;
};
