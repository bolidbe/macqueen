import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { noop } from 'lodash';

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
}: Pick<SwitchPropsType, 'isDisabled' | 'hasError'>): FunctionalState => {
  if (!!isDisabled) {
    return 'disabled';
  }

  if (!!hasError) {
    return 'error';
  }

  return 'default';
};

export interface SwitchPropsType {
  isDisabled?: boolean,
  isChecked?: boolean,
  hasError?: boolean,
  children?: ReactNode,
  id?: string,
  isRequired?: boolean,
  name?: string,
  onChange?: (isChecked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void,
  switchVerticalAlign?: 'top' | 'center',
  value?: string | string[] | number,
  className?: string
}

export default React.forwardRef<HTMLInputElement, SwitchPropsType>(
  function Switch(
    {
      switchVerticalAlign = 'center',
      children,
      hasError,
      id,
      isChecked,
      isDisabled,
      isRequired,
      name,
      onChange = noop,
      value,
      className
    }: SwitchPropsType,
    outerRef
  ): JSX.Element {
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
        className={classNames(styles.switch, {
          [styles.switchVerticalAlignTop]: switchVerticalAlign === 'top',
          [styles.switchVerticalAlignCenter]: switchVerticalAlign === 'center',
        }, className)}
        style={{ cursor: labelCursor[functionalState] }}
      >
        <input
          ref={outerRef}
          className={styles.input}
          aria-checked={isChecked}
          type="checkbox"
          id={id}
          name={name}
          checked={isChecked}
          onChange={(event): void => onChange(event.target.checked, event)}
          disabled={isDisabled}
          required={isRequired}
          {...valuePropObject}
        />

        <div
          className={classNames({
            [styles.switchContainer]: true,
            [styles.switchContainerStateError]: functionalState === 'error',
            [styles.switchContainerStateDisabled]: functionalState === 'disabled',
            [styles.switchContainerStateDefaultChecked]: functionalState === 'default' && !!isChecked,
            [styles.switchContainerStateDefaultUnchecked]: functionalState === 'default' && !isChecked
          })}
        >
          <div
            className={classNames({
              [styles.switchImage]: true,
              [styles.switchImageStateError]: functionalState === 'error',
              [styles.switchImageStateDisabled]: functionalState === 'disabled',
              [styles.switchImageStateDefaultChecked]: functionalState === 'default' && !!isChecked,
              [styles.switchImageStateDefaultUnchecked]: functionalState === 'default' && !isChecked
            })}
          >
            {!!isChecked && (
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
    )
  }
)
