import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Image from './Image';

import styles from './Avatar.module.scss';

const dimensions = {
  xsmall: '32',
  small: '48',
  medium: '72',
  large: '100',
  xlarge: '140',
};

const CLASSNAMES: string[] = [
  styles.avatarTheme1,
  styles.avatarTheme2,
  styles.avatarTheme3,
  styles.avatarTheme4,
  styles.avatarTheme5
];

const getClassName = (initials?: string): string =>
  initials
    ? CLASSNAMES[initials.charCodeAt(0) % CLASSNAMES.length]
    : CLASSNAMES[0];

export interface EntityAvatarPropsType {
  imageUrl?: string;
  initial?: string;
  fullName?: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  shouldForceEarlyRender?: boolean;
}

const EntityAvatar = forwardRef<HTMLElement, EntityAvatarPropsType>(
  (
    {
      imageUrl,
      size = 'small',
      initial,
      fullName,
      className,
      shouldForceEarlyRender = false
    }: EntityAvatarPropsType,
    outerRef
  ): JSX.Element => {
    const sizeInPixels = typeof size === 'string' ? dimensions[size] : size
    return (
      <div
        className={classNames(styles.avatar, {
          [styles.avatarSizeXsmall]: size === 'xsmall',
          [styles.avatarSizeSmall]: size === 'small',
          [styles.avatarSizeMedium]: size === 'medium',
          [styles.avatarSizeLarge]: size === 'large',
          [styles.avatarSizeXlarge]: size === 'xlarge',
        }, className)}
        style={{ width: `${sizeInPixels}px`, height: `${sizeInPixels}px` }}
      >
        {imageUrl ? (
          <Image
            className={styles.square}
            src={imageUrl}
            alt={fullName ? `Avatar for ${fullName}` : 'Avatar'}
            height={sizeInPixels}
            ref={outerRef}
            forceEarlyRender={shouldForceEarlyRender ? `${sizeInPixels}px` : undefined}
          />
        ) : (
          <span
            className={`${styles.initials} ${styles.square} ${getClassName(initial)}`}
            title={fullName && `Avatar for ${fullName}`}
          >
            {initial}
          </span>
        )}
      </div>
    )
  }
)

// Needed because of the `forwardRef`.
EntityAvatar.displayName = 'EntityAvatar';

export interface UserAvatarPropsType {
  imageUrl?: string;
  initials?: string;
  fullName?: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  shouldForceEarlyRender?: boolean;
}

const UserAvatar = forwardRef<HTMLElement, UserAvatarPropsType>(
  (
    {
      imageUrl,
      size = 'small',
      initials,
      fullName,
      className,
      shouldForceEarlyRender = false
    }: UserAvatarPropsType,
    outerRef
  ): JSX.Element => {
    const sizeInPixels = typeof size === 'string' ? dimensions[size] : size
    return (
      <div
        className={classNames(styles.avatar, {
          [styles.avatarSizeXsmall]: size === 'xsmall',
          [styles.avatarSizeSmall]: size === 'small',
          [styles.avatarSizeMedium]: size === 'medium',
          [styles.avatarSizeLarge]: size === 'large',
          [styles.avatarSizeXlarge]: size === 'xlarge',
        }, className)}
        style={{ width: `${sizeInPixels}px`, height: `${sizeInPixels}px` }}
      >
        {imageUrl ? (
          <Image
            className={styles.circle}
            src={imageUrl}
            alt={fullName ? `Avatar for ${fullName}` : 'Avatar'}
            height={sizeInPixels}
            ref={outerRef}
            forceEarlyRender={shouldForceEarlyRender ? `${sizeInPixels}px` : undefined}
          />
        ) : (
          <span
            className={`${styles.initials} ${styles.circle} ${getClassName(initials)}`}
            title={fullName && `Avatar for ${fullName}`}
          >
            {initials}
          </span>
        )}
      </div>
    )
  }
)

// Needed because of the `forwardRef`.
UserAvatar.displayName = 'UserAvatar';

export { UserAvatar, EntityAvatar };
