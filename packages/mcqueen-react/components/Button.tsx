import React, { ReactNode } from 'react';
import classNames from 'classnames';
import LoaderDots from './LoaderDots';
import isString from 'lodash/isString';
import { Icon } from "@bolid/mcqueen-icons"

import styles from './Button.module.scss';

enum loaderDotsTheme {
  primary = 'inverse',
  secondary = 'brand',
  tertiary = 'muted'
}

/*
const bolidDomainPattern = /^(?:https?:)?\/\/(?:[a-zA-Z0-9-]+\.)*bolid\.be\//;
const rootRelativeUrlPattern = /^\//;
const hashUrlPattern = /^#/;

const isInternalUrl = (url?: string): boolean =>
    isString(url) && (
      bolidDomainPattern.test(url)
      || rootRelativeUrlPattern.test(url)
      || hashUrlPattern.test(url)
    )

const getRel = (url?: string, shouldOpenInNewTab = false): string | undefined => {
  if (shouldOpenInNewTab) {
    if (isInternalUrl(url)) {
      return 'noopener';
    }
    return 'noopener noreferrer';
  }
  return undefined;
};

const getAnchorProps = ({
  isDisabled,
  shouldOpenInNewTab,
  href,
  as,
  onClick,
}: {
  isDisabled?: boolean,
  shouldOpenInNewTab?: boolean,
  href?: string,
  as?: string,
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}): AnchorProps => ({
  onClick: isDisabled ? undefined : onClick,
  href: isDisabled ? undefined : url,
  as: isDisabled ? undefined : url,
  target: shouldOpenInNewTab ? '_blank' : '_self',
  rel: getRel(url, shouldOpenInNewTab),
});
*/

interface IButtonProps {
  children?: ReactNode | string,
  iconLeft?: string,
  iconRight?: string,
  isDisabled?: boolean,
  isLoading?: boolean,
  onClick?: () => void,
  href?: string,
  as?: string,
  shouldOpenInNewTab?: boolean,
  theme?: 'primary' | 'secondary' | 'tertiary' | 'caution' | 'solid',
  size?: 'small' | 'large',
  type?: 'button' | 'submit',
  className?: string
}

const Button = ({
  children,
  iconLeft,
  iconRight,
  isDisabled = false,
  isLoading = false,
  onClick,
  href,
  as,
  shouldOpenInNewTab,
  theme = 'primary',
  size = 'large',
  type = 'button',
  className
}: IButtonProps): JSX.Element => {
  const commonProps = {
    disabled: isLoading || isDisabled,
    className: classNames({
      [styles.button]: true,
      [styles.buttonThemePrimary]: theme === 'primary',
      [styles.buttonThemeTertiary]: theme === 'tertiary',
      [styles.buttonThemeSecondary]: theme === 'secondary',
      [styles.buttonThemeCaution]: theme === 'caution',
      [styles.buttonThemeSolid]: theme === 'solid',
      [styles.buttonSizeSmall]: size === 'small',
      [styles.buttonSizeLarge]: size === 'large'
    }, className)
  }

  const restrictedTheme =
    theme === 'primary' || theme === 'secondary' || theme === 'tertiary'
    ? theme
    : undefined

  const iconSize = size === 'large' ? 'medium' : 'small'

  const newChildren = isLoading
  ? (
    <span className={styles.loaderContainer}>
      <span className={styles.absoluteCenter}>
        <LoaderDots theme={loaderDotsTheme[restrictedTheme]} size="small" />
      </span>
      <span className="invisible">{children}</span>
    </span>
  ) : (
    <>
      {
        iconLeft && (
          <span
            className={classNames({
              [styles.iconContainer]: true,
              [styles.iconContainerHasRightChildren]: children,
            })}
          >
            <Icon size={iconSize} name={iconLeft} />
          </span>
        )
      }
      { children }
      {
        iconRight && (
          <span
            className={classNames({
              [styles.iconContainer]: true,
              [styles.iconContainerHasLeftChildren]: children,
            })}
          >
            <Icon size={iconSize} name={iconRight} />
          </span>
        )
      }

    </>
  )

  const isAnchor = !!href
  if (isAnchor) {
    return (
      <a
        {...commonProps}
        /*{...anchorProps}*/
      >
          { newChildren }
      </a>
    )
  }

  const buttonProps = {
    onClick: isDisabled || isLoading ? undefined : onClick,
    type
  }

  return (
    <button
      {...commonProps}
      {...buttonProps}
    >
      { newChildren }
    </button>
  )
}

export default Button
