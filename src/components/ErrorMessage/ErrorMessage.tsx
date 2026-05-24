//core
import React from 'react';
import { AlertTriangle } from 'lucide-react';
//components
import { Button } from '../Button';
//other
import type { IErrorMessageProps } from './types';
import * as S from './styled';

export const ErrorMessage: React.FC<IErrorMessageProps> = ({ message, onRetry }) => (
  <S.Wrapper role='alert'>
    <AlertTriangle size={24} strokeWidth={1.7} aria-hidden='true' />
    <S.Message>{message}</S.Message>
    {onRetry && (
      <Button
        variant='outline'
        tone='danger'
        size='sm'
        shape='pill'
        onClick={onRetry}
      >
        Retry
      </Button>
    )}
  </S.Wrapper>
);
