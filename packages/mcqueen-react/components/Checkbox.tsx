import React from 'react';
import classNames from 'classnames';

import styles from './Checkbox.module.scss';
import colors from '@bolid/mcqueen-scss/config/colors.json';

const labelCursor = {
  error: 'pointer',
  disabled: 'default',
  default: 'pointer',
};

const color = {
  error: {
    unchecked: colors.red.default,
    checked: colors.red.default,
    indeterminate: colors.red.default,
  },
  disabled: {
    unchecked: colors.gray.default,
    checked: colors.gray.default,
    indeterminate: colors.gray.default,
  },
  default: {
    unchecked: 'inherit',
    checked: colors.white,
    indeterminate: colors.white,
  },
};

const borderColor = {
  error: {
    unchecked: colors.red.default,
    checked: colors.red.default,
    indeterminate: colors.red.default,
  },
  disabled: {
    unchecked: colors.gray["300"],
    checked: colors.gray["300"],
    indeterminate: colors.gray["300"],
  },
  default: {
    unchecked: colors.gray.default,
    checked: colors.blue.default,
    indeterminate: colors.blue.default,
  },
};

const backgroundColor = {
  error: {
    unchecked: colors.white,
    checked: colors.white,
    indeterminate: colors.white,
  },
  disabled: {
    unchecked: colors.gray["200"],
    checked: colors.gray["200"],
    indeterminate: colors.gray["200"],
  },
  default: {
    unchecked: colors.white,
    checked: colors.blue.default,
    indeterminate: colors.blue.default,
  },
};

const textColor = {
  error: colors.red.default,
  disabled: colors.gray.default,
  default: 'inherit',
};

type CheckedState = 'checked' | 'indeterminate' | 'unchecked';
type FunctionalState = 'disabled' | 'error' | 'default';

const getCheckedState = ({
  isChecked,
  isIndeterminate,
}: Pick<CheckboxPropsType, 'isChecked' | 'isIndeterminate'>): CheckedState => {
  if (isChecked) {
    return 'checked';
  }

  if (isIndeterminate) {
    return 'indeterminate';
  }

  return 'unchecked';
};

const getFunctionalState = ({
  isDisabled,
  hasError,
}: Pick<CheckboxPropsType, 'isDisabled' | 'hasError'>): FunctionalState => {
  if (isDisabled) {
    return 'disabled';
  }

  if (hasError) {
    return 'error';
  }

  return 'default';
};

interface CheckboxPropsType {
  isDisabled?: boolean,
  isChecked?: boolean,
  hasError?: boolean,
  children?: React.ReactNode,
  id?: string,
  isRequired?: boolean,
  name?: string,
  labelPadding?: string,
  onChange: (value: boolean, id?: string) => void,
  isIndeterminate?: boolean,
  checkboxVerticalAlign?: 'top' | 'center',
  value?: string | string[] | number,
  className?: string
}

export default function Checkbox({
  checkboxVerticalAlign = 'center',
  children,
  hasError = false,
  id,
  isChecked = false,
  isDisabled = false,
  isIndeterminate = false,
  labelPadding = '14px 0',
  isRequired = false,
  name,
  onChange,
  value,
  className
}: CheckboxPropsType): JSX.Element {
  const functionalState = getFunctionalState({ isDisabled, hasError });
  const checkedState = getCheckedState({ isChecked, isIndeterminate });

  // React adds a `value` attribute (`value=""`) to `input[type="checkbox"]` even if the `value`
  // prop is `undefined`. This prevents the default browser behavior of `value="on"` when the
  // `value` attribute is omitted. We can work around the React behavior and avoid adding
  // `value=""` to the DOM by conditionally creating an object that we then spread onto the
  // element. More context: https://github.com/thumbtack/thumbprint/issues/589
  const valuePropObject = value ? { value } : {};

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
    <label
      className={classNames(styles.checkbox, {
        [styles.checkboxVerticalAlignTop]: checkboxVerticalAlign === 'top',
        [styles.checkboxVerticalAlignCenter]: checkboxVerticalAlign === 'center',
      }, className)}
      style={{ cursor: labelCursor[functionalState], padding: labelPadding }}
    >
      <input
        className={styles.input}
        aria-checked={isIndeterminate ? 'mixed' : isChecked}
        type="checkbox"
        id={id}
        name={name}
        checked={isChecked}
        onChange={(event): void => onChange(event.target.checked, id)}
        disabled={isDisabled}
        required={isRequired}
        {...valuePropObject}
      />

      <div
        className={styles.checkboxImage}
        style={{
          color: color[functionalState][checkedState],
          backgroundColor: backgroundColor[functionalState][checkedState],
          borderColor: borderColor[functionalState][checkedState],
        }}
      >
        {isChecked && !isIndeterminate && (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="15.232"
              y="4.003"
              width="11.701"
              height="1.879"
              rx=".939"
              transform="rotate(123 15.232 4.003)"
            />
            <rect
              x="8.83"
              y="13.822"
              width="7.337"
              height="1.879"
              rx=".939"
              transform="rotate(-146 8.83 13.822)"
            />
            <path d="M8.072 13.306l1.03-1.586.787.512-1.03 1.586z" />
          </svg>
        )}
        {
          isIndeterminate && (
            <svg
              width="10"
              height="2"
              viewBox="0 0 10 2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0" y="0" width="10" height="2" />
            </svg>
          )
        }
      </div>

      {
        children && (
          <span style={{ color: textColor[functionalState] }} className={styles.text}>
            {children}
          </span>
        )
      }
    </label>
  );
}
