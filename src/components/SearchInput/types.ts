import type { AsyncStatus, IAppError } from '../../types';

export interface ISearchInputProps {
  value: string;
  status: AsyncStatus;
  error: IAppError | null;
  onChange: (value: string) => void;
  onClear: () => void;
  disabled?: boolean;
}

export interface ISearchInputState {
  hasError: boolean;
  showErrorText: boolean;
  isLoading: boolean;
  hasValue: boolean;
}
