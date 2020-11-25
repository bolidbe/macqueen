import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Radio.module.scss';
import colors from '@bolid/mcqueen-scss/config/colors.json';

const borderColor = {
  disabled: colors.gray["300"],
  checked: colors.blue.default,
  unchecked: colors.gray.default,
  error: colors.red.default,
};

const labelCursor = {
  disabled: 'default',
  checked: 'pointer',
  unchecked: 'pointer',
  error: 'pointer',
};

const backgroundColor = {
  disabled: colors.gray["200"],
  checked: colors.white,
  unchecked: colors.white,
  error: colors.white,
};

/**
 * Color of the inner circle when the radio is checked.
 */
const circleColor: {
  disabled: string,
  checked: string,
  unchecked: string | undefined,
  error: string
} = {
  disabled: colors.gray.default,
  checked: colors.blue.default,
  unchecked: undefined,
  error: colors.red.default,
};

const textColor = {
  disabled: colors.gray.default,
  checked: 'inherit',
  unchecked: 'inherit',
  error: colors.red.default,
};

type UiState = 'disabled' | 'error' | 'checked' | 'unchecked';

const getUIState = ({
  isChecked,
  isDisabled,
  hasError,
}: Pick<RadioPropsType, 'isDisabled' | 'hasError' | 'isChecked'>): UiState => {
  if (isDisabled) {
    return 'disabled';
  }

  if (hasError) {
    return 'error';
  }

  if (isChecked) {
    return 'checked';
  }

  return 'unchecked';
};

interface RadioPropsType {
  isDisabled?: boolean,
  children?: ReactNode,
  id?: string,
  isChecked?: boolean,
  isRequired?: boolean,
  hasError?: boolean,
  name: string,
  labelPadding?: string,
  onChange: (isChecked: boolean, id?: string) => void,
  radioVerticalAlign?: 'top' | 'center',
  className?: string
}

export default function Radio({
  children = null,
  id,
  isChecked = false,
  isDisabled = false,
  isRequired = false,
  hasError = false,
  labelPadding = '14px 0',
  name,
  onChange,
  radioVerticalAlign = 'center',
  className
}: RadioPropsType): JSX.Element {
  const uiState = getUIState({ isChecked, isDisabled, hasError });

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
    <label
      className={classNames(styles.radio, {
        [styles.radioRadioVerticalAlignTop]: radioVerticalAlign === 'top',
        [styles.radioRadioVerticalAlignCenter]: radioVerticalAlign === 'center',
      }, className)}
      style={{ padding: labelPadding, cursor: labelCursor[uiState] }}
    >
      <input
        className={styles.input}
        type="radio"
        id={id}
        onChange={(event): void => onChange(event.target.checked, id)}
        checked={isChecked}
        name={name}
        disabled={isDisabled}
        required={isRequired}
      />

      <svg
        className={styles.circle}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill={backgroundColor[uiState]} fillRule="evenodd">
          <circle stroke={borderColor[uiState]} strokeWidth="2" cx="10" cy="10" r="9" />
          {isChecked && <circle fill={circleColor[uiState]} cx="10" cy="10" r="6" />}
        </g>
      </svg>

      {
        children && (
          <span className={styles.text} style={{ color: textColor[uiState] }}>
            {children}
          </span>
        )
      }
    </label>
  );
}
