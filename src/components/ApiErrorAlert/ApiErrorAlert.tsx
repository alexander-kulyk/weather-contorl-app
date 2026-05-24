//core
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Toaster, toast } from 'sonner';
//other
import { useApiErrorContext } from '../../context';
import type { IApiErrorAlertProps, IApiErrorDetails } from './types';
import * as S from './styled';

const TOASTER_STYLE: React.CSSProperties & Record<'--width', string> = {
  '--width': 'min(520px, calc(100vw - 32px))',
};

export const ApiErrorAlert: React.FC<IApiErrorAlertProps> = ({
  position = 'bottom-right',
}) => {
  const { values, handlers } = useApiErrorContext();
  const toastIdRef = useRef<string | number | null>(null);

  const details = useMemo<IApiErrorDetails | null>(() => {
    if (!values.apiError) {
      return null;
    }

    const statusLabel = values.apiError.status
      ? `${values.apiError.status}`
      : 'No status';

    return {
      title: values.apiError.message,
      description: getApiErrorDescription(values.apiError.code),
      statusLabel,
      codeLabel: values.apiError.code,
    };
  }, [values.apiError]);

  const handleConfirm = useCallback((): void => {
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }

    handlers.clearApiError();
  }, [handlers]);

  useEffect(() => {
    if (!details) {
      return;
    }

    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
    }

    toastIdRef.current = toast.custom(
      () => (
        <S.Alert role='alert' aria-live='assertive'>
          <S.IconColumn>
            <S.Icon>
              <AlertTriangle size={26} strokeWidth={1.7} aria-hidden='true' />
            </S.Icon>
          </S.IconColumn>
          <S.Content>
            <S.Header>
              <S.StatusBadge>{details.statusLabel}</S.StatusBadge>
              <S.CodeBadge>{details.codeLabel}</S.CodeBadge>
            </S.Header>
            <S.Copy>
              <S.Title>{details.title}</S.Title>
              <S.Description>{details.description}</S.Description>
            </S.Copy>
          </S.Content>
          <S.Actions>
            <S.Action type='button' onClick={handleConfirm}>
              Confirm
            </S.Action>
          </S.Actions>
        </S.Alert>
      ),
      {
        duration: Infinity,
        unstyled: true,
      },
    );
  }, [details, handleConfirm]);

  return (
    <Toaster
      position={position}
      closeButton={false}
      toastOptions={{ unstyled: true }}
      style={TOASTER_STYLE}
    />
  );
};

const getApiErrorDescription = (code: string): string => {
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
