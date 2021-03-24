import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Switch.module.scss';

const labelCursor = {
  error: 'pointer',
  disabled: 'default',
  default: 'pointer',
};

type FunctionalState = 'disabled' | 'error' | 'default';

const getFunctionalState = ({
  isDisabled,
  hasError,
}: Pick<TogglePropsType, 'isDisabled' | 'hasError'>): FunctionalState => {
  if (isDisabled) {
    return 'disabled';
  }

  if (hasError) {
    return 'error';
  }

  return 'default';
};

interface TogglePropsType {
  isDisabled?: boolean,
  isChecked?: boolean,
  hasError?: boolean,
  children?: ReactNode,
  id?: string,
  isRequired?: boolean,
  name?: string,
  onChange: (value: boolean, id?: string) => void,
  toggleVerticalAlign?: 'top' | 'center',
  value?: string | string[] | number,
  className?: string
}

export default function Toggle({
  toggleVerticalAlign = 'center',
  children,
  hasError = false,
  id,
  isChecked = false,
  isDisabled = false,
  isRequired = false,
  name,
  onChange,
  value,
  className
}: TogglePropsType): JSX.Element {
  const functionalState = getFunctionalState({ isDisabled, hasError });
  // React adds a `value` attribute (`value=""`) to `input[type="checkbox"]` even if the `value`
  // prop is `undefined`. This prevents the default browser behavior of `value="on"` when the
  // `value` attribute is omitted. We can work around the React behavior and avoid adding
  // `value=""` to the DOM by conditionally creating an object that we then spread onto the
  // element. More context: https://github.com/thumbtack/thumbprint/issues/589
  const valuePropObject = value ? { value } : {};

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
    <label
      className={classNames(styles.toggle, {
        [styles.toggleVerticalAlignTop]: toggleVerticalAlign === 'top',
        [styles.toggleVerticalAlignCenter]: toggleVerticalAlign === 'center',
      }, className)}
      style={{ cursor: labelCursor[functionalState] }}
    >
      <input
        className={styles.input}
        aria-checked={isChecked}
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
        className={classNames({
          [styles.toggleContainer]: true,
          [styles.toggleContainerStateError]: functionalState === 'error',
          [styles.toggleContainerStateDisabled]: functionalState === 'disabled',
          [styles.toggleContainerStateDefaultChecked]: functionalState === 'default' && isChecked,
          [styles.toggleContainerStateDefaultUnchecked]: functionalState === 'default' && !isChecked
        })}
      >
        <div
          className={classNames({
            [styles.toggleImage]: true,
            [styles.toggleImageStateError]: functionalState === 'error',
            [styles.toggleImageStateDisabled]: functionalState === 'disabled',
            [styles.toggleImageStateDefaultChecked]: functionalState === 'default' && isChecked,
            [styles.toggleImageStateDefaultUnchecked]: functionalState === 'default' && !isChecked
          })}
        >
          {isChecked && (
            <svg
              width="12"
              height="12"
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
        </div>
      </div>
      {children && (
        <span className={classNames({
          [styles.text]: true,
          [styles.textStateError]: functionalState === 'error',
          [styles.textStateDisabled]: functionalState === 'disabled',
          [styles.textStateDefault]: functionalState === 'default'
        })}>
          {children}
        </span>
      )}
    </label>
  );
}
