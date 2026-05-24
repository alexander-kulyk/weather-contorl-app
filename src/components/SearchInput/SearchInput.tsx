//core
import React, { useMemo } from 'react';
import { LoaderCircle, Search, X } from 'lucide-react';
//components
import { Button } from '../Button';
//other
import { SEARCH_ERROR_ID, SEARCH_INPUT_ID } from './constants';
import { getSearchInputDescribedBy, getSearchInputState } from './utils';
import type { ISearchInputProps, ISearchInputState } from './types';
import * as S from './styled';

export const SearchInput: React.FC<ISearchInputProps> = ({
  value,
  status,
  error,
  onChange,
  onClear,
  disabled = false,
}) => {
  const state = useMemo<ISearchInputState>(
    () => getSearchInputState(value, status, error),
    [error, status, value],
  );
  const { hasError, hasValue, isLoading, showErrorText } = state;
  const describedBy = getSearchInputDescribedBy(showErrorText, SEARCH_ERROR_ID);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <S.Wrapper>
      <S.Label htmlFor={SEARCH_INPUT_ID}>Search</S.Label>
      <S.Field $hasError={hasError}>
        <S.IconSlot $isLoading={isLoading}>
          {isLoading ? (
            <LoaderCircle size={20} strokeWidth={1.5} aria-hidden='true' />
          ) : (
            <Search size={20} strokeWidth={1.5} aria-hidden='true' />
          )}
        </S.IconSlot>
        <S.Input
          id={SEARCH_INPUT_ID}
          type='text'
          value={value}
          placeholder='Search city...'
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          autoComplete='off'
          onChange={handleChange}
        />
        {hasValue && (
          <Button
            variant='soft'
            tone='secondary'
            size='sm'
            shape='pill'
            iconOnly
            aria-label='Clear city search'
            onClick={onClear}
          >
            <X size={16} strokeWidth={1.8} aria-hidden='true' />
          </Button>
        )}
      </S.Field>
      {showErrorText && (
        <S.ErrorText id={SEARCH_ERROR_ID}>{error?.message}</S.ErrorText>
      )}
    </S.Wrapper>
  );
};
