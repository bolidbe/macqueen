import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './InputNote.module.scss';

interface IInputNoteProps {
  children: ReactNode | string,
  hasError?: boolean,
  className?: string,
}

const InputNote = ({
  children,
  hasError = false,
  className
}: IInputNoteProps): JSX.Element => (
  <div className={classNames({
    [styles.inputNote]: true,
    [styles.inputNoteStateError]: hasError
  }, className)}>{ children }</div>
)

export default InputNote
