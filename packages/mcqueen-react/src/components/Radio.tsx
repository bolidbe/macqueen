import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { noop } from 'lodash';

import styles from './Radio.module.scss';

export interface RadioPropsType {
  isDisabled?: boolean,
  children?: ReactNode,
  id?: string,
  isChecked?: boolean,
  isRequired?: boolean,
  hasError?: boolean,
  name?: string,
  value?: string;
  labelPadding?: string,
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void,
  radioVerticalAlign?: 'top' | 'center',
  className?: string
}

export default React.forwardRef<HTMLInputElement, RadioPropsType>(
  function Radio(
    {
      children = null,
      id,
      isChecked,
      isDisabled,
      isRequired,
      hasError,
      labelPadding = '14px 0',
      name,
      value,
      onChange = noop,
      radioVerticalAlign = 'center',
      className
    }: RadioPropsType,
    outerRef
  ): JSX.Element {
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
      <label
        className={classNames(styles.radio, {
          [styles.radioRadioVerticalAlignTop]: radioVerticalAlign === 'top',
          [styles.radioRadioVerticalAlignCenter]: radioVerticalAlign === 'center',
        }, className)}
        style={{ padding: labelPadding, cursor: !!isDisabled ? "default" : "pointer" }}
      >
        <input
          className={styles.input}
          type="radio"
          ref={outerRef}
          id={id}
          onChange={(e): void => onChange(e.target.value, e)}
          checked={isChecked}
          name={name}
          value={value}
          disabled={isDisabled}
          required={isRequired}
        />

        <svg
          className={classNames({
            [styles.radioContainer]: true,
            [styles.radioContainerStateError]: !!hasError
          })}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className={styles.circleBackground} fillRule="evenodd">
            <circle className={styles.circleBorder} strokeWidth="2" cx="10" cy="10" r="9" />
            <circle className={styles.circleRadio} cx="10" cy="10" r="6" />
          </g>
        </svg>

        {children && (
          <span className={classNames({
            [styles.text]: true,
            [styles.textStateError]: !!hasError
          })}>
            {children}
          </span>
        )}
      </label>
    )
  }
)
