//core
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Toaster, toast } from 'sonner';
//other
import { useApiErrorContext } from '../../context';
import type { IApiErrorAlertProps, IApiErrorDetails } from './types';
import * as S from './styled';

export const ApiErrorAlert: React.FC<IApiErrorAlertProps> = ({
  position = 'top-right',
}) => {
  const { values, handlers } = useApiErrorContext();
  const toastIdRef = useRef<string | number | null>(null);

  const details = useMemo<IApiErrorDetails | null>(() => {
    if (!values.apiError) {
      return null;
    }

    const status = values.apiError.status
      ? `Status ${values.apiError.status}`
      : 'No HTTP status';
    const detailsText = values.apiError.details
      ? ` · ${values.apiError.details}`
      : '';

    return {
      title: values.apiError.message,
      description: `${status} · ${values.apiError.code}${detailsText}`,
      error: values.apiError,
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
          <S.Header>
            <S.Icon>
              <AlertTriangle size={18} strokeWidth={1.8} aria-hidden='true' />
            </S.Icon>
            <S.Copy>
              <S.Title>{details.title}</S.Title>
              <S.Description>{details.description}</S.Description>
              <S.Meta>{details.error.name}</S.Meta>
            </S.Copy>
          </S.Header>
          <S.Action type='button' onClick={handleConfirm}>
            Confirm
          </S.Action>
        </S.Alert>
      ),
      {
        duration: Infinity,
      },
    );
  }, [details, handleConfirm]);

  return <Toaster position={position} closeButton={false} />;
};
