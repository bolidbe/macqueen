import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Label.module.scss';

export interface LabelPropsType {
  children: ReactNode | string;
  hasError?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  className?: string;
}

export default function Label({
  children,
  hasError,
  isDisabled,
  isReadOnly,
  className
}: LabelPropsType): JSX.Element {
  return (
    <div className={classNames({
      [styles.label]: true,
      [styles.labelStateError]: !!hasError,
      [styles.labelStateDisabled]: !!isDisabled,
      [styles.labelStateReadOnly]: !!isReadOnly
    }, className)}>{ children }</div>
  )
}
