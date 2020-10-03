import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Label.module.scss';

interface ILabelProps {
  children: ReactNode | string,
  hasError?: boolean,
  isDisabled?: boolean,
  className?: string,
}

const Label = ({
  children,
  hasError = false,
  isDisabled = false,
  className
}: ILabelProps): JSX.Element => (
  <div className={classNames({
    [styles.label]: true,
    [styles.labelStateError]: hasError,
    [styles.labelStateDisabled]: isDisabled
  }, className)}>{ children }</div>
)

export default Label
