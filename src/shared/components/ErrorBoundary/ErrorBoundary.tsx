import * as React from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';
import styles from './ErrorBoundary.module.scss';

interface IErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface IErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; errorInfo: React.ErrorInfo }>;
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} errorInfo={this.state.errorInfo!} />;
      }

      return (
        <div className={styles.errorBoundary}>
          <MessageBar messageBarType={MessageBarType.error}>
            <strong>Something went wrong</strong>
            <p>An unexpected error occurred. Please refresh the page or contact support if the problem persists.</p>
            {process.env.NODE_ENV === 'development' && (
              <details className={styles.errorDetails}>
                <summary>Error Details (Development Only)</summary>
                <pre>{this.state.error?.stack}</pre>
              </details>
            )}
          </MessageBar>
        </div>
      );
    }

    return this.props.children;
  }
}
