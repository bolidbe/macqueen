import React, { ReactNode } from 'react';
import classNames from 'classnames';
import Label from "./subcomponents/Label"
import InputNote from "./subcomponents/InputNote"
import { noop } from 'lodash';

import styles from './TextArea.module.scss';

type UiState = 'disabled' | 'error' | 'default';

const getUIState = ({
  hasError,
  isDisabled,
}: Pick<TextAreaPropsType, 'isDisabled' | 'hasError'>): UiState => {
  if (!!isDisabled) {
    return 'disabled';
  }
  if (!!hasError) {
    return 'error';
  }
  return 'default';
};

export interface TextAreaPropsType {
  id?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  hasError?: boolean;
  placeholder?: string;
  name?: string;
  value?: string;
  maxLength?: number;
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  label?: ReactNode;
  note?: ReactNode;
  rows?: number;
}

export default React.forwardRef<HTMLTextAreaElement, TextAreaPropsType>(
  function TextArea (
    {
      hasError,
      id,
      isDisabled,
      isReadOnly,
      isRequired,
      maxLength,
      onBlur = noop,
      onChange = noop,
      onFocus = noop,
      placeholder,
      value,
      name,
      className,
      label,
      note,
      rows = 4
    }: TextAreaPropsType,
    outerRef
  ): JSX.Element {
    const uiState = getUIState({ hasError, isDisabled });

    return (
      <div className={className}>
        {label && (
          <Label {...{ hasError, isDisabled }} className="mb-1">{ label }</Label>
        )}
        <textarea
          className={classNames({
            [styles.textArea]: true,
            [styles.textAreaStateDisabled]: uiState === 'disabled',
            [styles.textAreaStateError]: uiState === 'error',
            [styles.textAreaStateDefault]: uiState === 'default',
          })}
          ref={outerRef}
          id={id}
          disabled={isDisabled}
          readOnly={isReadOnly}
          maxLength={maxLength}
          required={isRequired}
          placeholder={placeholder}
          value={value}
          onChange={(e): void => onChange(e.target.value, e)}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
          rows={rows}
        />
        {note && (
          <InputNote className="mt-1" hasError={hasError}>{ note }</InputNote>
        )}
      </div>
    )
  }
)
