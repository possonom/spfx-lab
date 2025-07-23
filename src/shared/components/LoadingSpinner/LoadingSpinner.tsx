import * as React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import styles from './LoadingSpinner.module.scss';

interface ILoadingSpinnerProps {
  size?: SpinnerSize;
  label?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({
  size = SpinnerSize.medium,
  label = 'Loading...',
  className
}) => {
  return (
    <div className={`${styles.loadingContainer} ${className || ''}`}>
      <Spinner size={size} label={label} />
    </div>
  );
};
