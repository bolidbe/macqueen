import React, { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import LoaderDots from './LoaderDots';
import { isString } from 'lodash';
import { Icon } from "@bolid/mcqueen-icons"

import styles from './Button.module.scss';

enum loaderDotsTheme {
  primary = 'inverse',
  secondary = 'primary',
  tertiary = 'muted'
}

const bolidDomainPattern = /^(?:https?:)?\/\/(?:[a-zA-Z0-9-]+\.)*bolid\.be\//;
const rootRelativeUrlPattern = /^\//;
const hashUrlPattern = /^#/;

const isInternalUrl = (href?: string): boolean =>
    isString(`${href}`) && (
      bolidDomainPattern.test(`${href}`)
      || rootRelativeUrlPattern.test(`${href}`)
      || hashUrlPattern.test(`${href}`)
    )

const getRel = (href?: string, shouldOpenInNewTab = false): string | undefined => {
  if (shouldOpenInNewTab) {
    if (isInternalUrl(href)) {
      return 'noopener';
    }
    return 'noopener noreferrer';
  }
  return undefined;
};

interface AnchorPropsType {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
  target: string,
  rel?: string,
  href?: string
}

const getAnchorProps = ({
  isDisabled,
  shouldOpenInNewTab,
  onClick,
  href
}: {
  isDisabled?: boolean,
  shouldOpenInNewTab?: boolean,
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
  href?: string
}): AnchorPropsType => ({
  onClick: isDisabled ? undefined : onClick,
  target: shouldOpenInNewTab ? '_blank' : '_self',
  rel: getRel(href, shouldOpenInNewTab),
  href: isDisabled ? undefined : href
});

interface ButtonPropsType {
  children?: ReactNode,
  iconLeft?: string,
  iconRight?: string,
  isDisabled?: boolean,
  isLoading?: boolean,
  onClick?: () => void,
  href?: string,
  shouldOpenInNewTab?: boolean,
  theme?: 'primary' | 'secondary' | 'tertiary' | 'caution' | 'solid',
  size?: 'small' | 'large',
  type?: 'button' | 'submit',
  className?: string
}

const FlexWrapper = ({
  children,
  size
}: {
  children: ReactNode | string,
  size: 'small' | 'large'
}) => (
  <div className={classNames({
    [styles.flexWrapper]: true,
    [styles.flexWrapperSizeSmall]: size === 'small',
    [styles.flexWrapperSizeLarge]: size === 'large'
  })}>
    { children }
  </div>
)

export default forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonPropsType>(
  function Button(
    {
      children,
      iconLeft,
      iconRight,
      isDisabled = false,
      isLoading = false,
      onClick,
      href,
      shouldOpenInNewTab,
      theme = 'primary',
      size = 'large',
      type = 'button',
      className
    }: ButtonPropsType,
    outerRef
  ): JSX.Element {
    const commonProps = {
      disabled: isLoading || isDisabled,
      className: classNames({
        [styles.button]: true,
        [styles.buttonThemePrimary]: theme === 'primary',
        [styles.buttonThemeTertiary]: theme === 'tertiary',
        [styles.buttonThemeSecondary]: theme === 'secondary',
        [styles.buttonThemeCaution]: theme === 'caution',
        [styles.buttonThemeSolid]: theme === 'solid'
      }, className)
    }

    const restrictedTheme =
      theme === 'primary' || theme === 'secondary' || theme === 'tertiary'
      ? theme
      : undefined

    const iconSize = size === 'large' ? 'medium' : 'small'

    const newChildren = isLoading
    ? (
      <FlexWrapper size={size}>
        <span className={styles.loaderContainer}>
          <span className={styles.absoluteCenter}>
            <LoaderDots theme={restrictedTheme ? loaderDotsTheme[restrictedTheme] : restrictedTheme} size="small" />
          </span>
          <span className="invisible">{children}</span>
        </span>
      </FlexWrapper>
    ) : (
      <FlexWrapper size={size}>
        {iconLeft && (
          <span
            className={classNames({
              [styles.iconContainer]: true,
              [styles.iconContainerHasRightChildren]: children,
            })}
          >
            <Icon name={iconLeft} size={iconSize}/>
          </span>
        )}
        { children }
        {iconRight && (
          <span
            className={classNames({
              [styles.iconContainer]: true,
              [styles.iconContainerHasLeftChildren]: children,
            })}
          >
            <Icon name={iconRight} size={iconSize}/>
          </span>
        )}
      </FlexWrapper>
    )

    const isAnchor = !!href
    if (isAnchor) {
      return (
        <a
          {...commonProps}
          {...getAnchorProps({
            isDisabled,
            shouldOpenInNewTab,
            onClick,
            href
          })}
          ref={outerRef as React.Ref<HTMLAnchorElement>}
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
        ref={outerRef as React.Ref<HTMLButtonElement>}
      >
        { newChildren }
      </button>
    )
  }
)
