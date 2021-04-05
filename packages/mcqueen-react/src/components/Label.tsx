import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Label.module.scss';

export interface LabelPropsType {
  children: ReactNode | string;
  hasError?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export default function Label({
  children,
  hasError,
  isDisabled,
  className
}: LabelPropsType): JSX.Element {
  return (
    <div className={classNames({
      [styles.label]: true,
      [styles.labelStateError]: !!hasError,
      [styles.labelStateDisabled]: !!isDisabled
    }, className)}>{ children }</div>
  )
}
