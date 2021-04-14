import React, { ReactNode } from 'react';
import classNames from 'classnames';
import Label from "../Label"
import InputNote from "../InputNote"
import { Icon } from "@bolid/mcqueen-icons"
import { noop } from 'lodash';

import styles from './Base.module.scss';

type UiState = 'disabled' | 'readonly' | 'error' | 'default';

/**
 * Prioritize the mutually exclusive UI states the user may end up in.
 */
const getUIState = ({
  isDisabled,
  isReadOnly,
  hasError,
}: Pick<TextInputBasePropsType, 'isDisabled' | 'isReadOnly' | 'hasError'>): UiState => {
  if (!!isDisabled) {
    return 'disabled';
  }

  if (!!isReadOnly) {
    return 'readonly';
  }

  if (!!hasError) {
    return 'error';
  }

  return 'default';
};

/**
 * Component that helps position icons within inputs.
 */
export interface TextInputBasePropsType {
  id?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isLoading?: boolean;
  /**
   * A regular expression that the `<input>` element's value is checked against when submitting a
   * form.
   */
  pattern?: string;
  maxLength?: number;
  hasError?: boolean;
  placeholder?: string;
  size?: 'small' | 'large';
  type?: 'email' | 'password' | 'text' | 'search' | 'tel' | 'number';
  /**
   * A [proposed specification](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)
   * that enables specification of virtual keyboard type in Chrome. Currently only supported in
   * Chrome and Android.
   */
  inputMode?: 'numeric';
  name?: string;
  value?: string;
  iconLeft?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>['autoComplete'];
  className?: string;
  label?: ReactNode;
  note?: ReactNode;
}

export default React.forwardRef<HTMLInputElement, TextInputBasePropsType>(
  function TextInputTextInputBase(
    {
      id,
      type = 'text',
      isDisabled,
      isReadOnly,
      isRequired,
      isLoading,
      hasError,
      placeholder,
      size = 'large',
      name,
      value,
      iconLeft,
      onClick = noop,
      onChange = noop,
      onFocus = noop,
      onBlur = noop,
      onKeyDown = noop,
      onKeyUp = noop,
      onKeyPress = noop,
      inputMode,
      pattern,
      maxLength,
      autoComplete,
      className,
      label,
      note
    }: TextInputBasePropsType,
    outerRef,
  ): JSX.Element {
    const uiState = getUIState({ isDisabled, isReadOnly, hasError });
    const iconSize = size === 'large' ? 'small' : 'tiny'

    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    return (
      <div
        className={classNames({
          [styles.textInputStateDefault]: uiState === 'default',
          [styles.textInputStateReadOnly]: uiState === 'readonly',
          [styles.textInputStateDisabled]: uiState === 'disabled',
          [styles.textInputStateError]: uiState === 'error',
        }, className)}
      >
        {label && (
          <Label {...{ hasError, isDisabled, isReadOnly }} className="mb-1">{ label }</Label>
        )}
        <div className={styles.inputContainer}>
          {iconLeft && (
            <div>
              <div
                className={classNames({
                  [styles.icon]: true,
                  [styles.iconPositionLeft]: true
                })}
              >
                <Icon name={iconLeft} size={iconSize}/>
              </div>
            </div>
          )}

          <input
            className={classNames({
              [styles.input]: true,
              [styles.inputSizeSmall]: size === 'small',
              [styles.inputSizeLarge]: size === 'large',
              [styles.inputWithIconLeft]: iconLeft,
            })}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
            placeholder={placeholder}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            name={name}
            type={type}
            value={value}
            onChange={(e): void => onChange(e)}
            onClick={(e): void => onClick(e)}
            onFocus={(e): void => onFocus(e)}
            onBlur={(e): void => onBlur(e)}
            onKeyDown={(e): void => onKeyDown(e)}
            onKeyUp={(e): void => onKeyUp(e)}
            onKeyPress={(e): void => onKeyPress(e)}
            id={id}
            ref={outerRef}
            inputMode={inputMode}
            pattern={pattern}
            maxLength={maxLength}
            autoComplete={autoComplete}
          />

          <div className={styles.inputStyles}/>

          {!!isLoading && (
            <div>
              <div
                className={classNames({
                  [styles.icon]: true,
                  [styles.iconPositionRight]: true
                })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24px"
                  height="24px"
                  viewBox="0 0 50 50"
                >
                  <path fill="#00A4BD" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                    <animateTransform
                      attributeType="xml"
                      attributeName="transform"
                      type="rotate"
                      from="0 25 25"
                      to="360 25 25"
                      dur="0.8s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>
            </div>
          )}
        </div>

        {note && (
          <InputNote className="mt-1" hasError={hasError}>{ note }</InputNote>
        )}
      </div>
    )
  }
)
