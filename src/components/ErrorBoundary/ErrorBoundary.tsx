//core
import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
//components
import { Confirmation } from '../Confirmation';
//other
import { getComponentName, getFallbackConfig } from './utils';
import type { IErrorBoundaryProps, IErrorBoundaryState } from './types';

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
    const component = getComponentName(this.props.component);

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

    const component = getComponentName(this.props.component);
    const { confirmLabel, icon, layout, title } = getFallbackConfig(this.props);

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
