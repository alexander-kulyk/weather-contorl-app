//core
import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { ErrorInfo, ReactNode } from 'react';
//components
import { Confirmation } from '../Confirmation';
//other
import type { IErrorBoundaryProps, IErrorBoundaryState } from './types';

const DEFAULT_COMPONENT_NAME = 'APP';
const DEFAULT_FALLBACK_TITLE = 'Something went wrong, contact the administrator';
const DEFAULT_CONFIRM_LABEL = 'OK';
const ERROR_LOGGING_FORMAT = 'WEATHER.UI.ERROR';

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  public state: IErrorBoundaryState = {
    hasError: false,
    isDismissed: false,
  };

  public static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true, isDismissed: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const component = this.props.component ?? DEFAULT_COMPONENT_NAME;

    this.props.onError?.({
      component,
      error,
      errorInfo,
    });

    console.error(`${ERROR_LOGGING_FORMAT}.${component}`, error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.isDismissed) {
      return null;
    }

    if (!this.state.hasError) {
      return this.props.children;
    }

    const component = this.props.component ?? DEFAULT_COMPONENT_NAME;
    const title = this.props.fallbackTitle ?? DEFAULT_FALLBACK_TITLE;
    const confirmLabel = this.props.fallbackConfirmLabel ?? DEFAULT_CONFIRM_LABEL;
    const layout = this.props.fallbackLayout ?? 'page';
    const icon = this.props.fallbackIcon ?? (
      <AlertTriangle size={42} strokeWidth={1.7} aria-hidden="true" />
    );

    return (
      <Confirmation
        title={title}
        description={this.props.fallbackMessage}
        icon={icon}
        confirmLabel={confirmLabel}
        tone="danger"
        layout={layout}
        role="alertdialog"
        ariaLabel={`${component} error`}
        onConfirm={this.handleConfirm}
      />
    );
  }

  private handleConfirm = (): void => {
    this.setState({ hasError: false, isDismissed: true });
  };
}
