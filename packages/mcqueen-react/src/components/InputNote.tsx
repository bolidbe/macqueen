import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './InputNote.module.scss';

export interface InputNotePropsType {
  children: ReactNode | string;
  hasError?: boolean;
  className?: string;
}

export default function InputNote({
  children,
  hasError,
  className
}: InputNotePropsType): JSX.Element {
  return (
    <div className={classNames({
      [styles.inputNote]: true,
      [styles.inputNoteStateError]: !!hasError
    }, className)}>{ children }</div>
  )
}
