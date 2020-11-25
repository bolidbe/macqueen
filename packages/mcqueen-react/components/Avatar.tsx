import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { isNumber } from 'lodash';
import colors from "@bolid/mcqueen-scss/config/colors.json"
import Image from './Image';

import styles from './Avatar.module.scss';

const dimensions = {
  xsmall: '32px',
  small: '48px',
  medium: '72px',
  large: '100px',
  xlarge: '140px',
};

interface StyleType {
  color: string;
  backgroundColor: string;
}

const STYLES: StyleType[] = [{
  color: colors.purple["500"],
  backgroundColor: colors.purple["200"],
}, {
  color: colors.green["500"],
  backgroundColor: colors.green["200"],
}, {
  color: colors.yellow["500"],
  backgroundColor: colors.yellow["200"],
}, {
  color: colors.red["500"],
  backgroundColor: colors.red["200"],
}, {
  color: colors.blue["500"],
  backgroundColor: colors.blue["200"],
}, {
  color: colors.orange["500"],
  backgroundColor: colors.orange["200"],
}];

const getStyle = (initials?: string): StyleType =>
  initials
    ? STYLES[initials.charCodeAt(0) % STYLES.length]
    : { color: colors.black.default, backgroundColor: colors.gray["200"] };

interface EntityAvatarPropsType {
  imageUrl?: string,
  initial?: string,
  fullName?: string,
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | number,
  className?: string
}

const EntityAvatar = forwardRef<HTMLElement, EntityAvatarPropsType>(
  ({
    imageUrl,
    size = 'small',
    initial,
    fullName,
    className
  }: EntityAvatarPropsType, outerRef ): JSX.Element => {
    return (
      <div
        className={classNames(styles.avatar, {
          [styles.avatarSizeXsmall]: size === 'xsmall',
          [styles.avatarSizeSmall]: size === 'small',
          [styles.avatarSizeMedium]: size === 'medium',
          [styles.avatarSizeLarge]: size === 'large',
          [styles.avatarSizeXlarge]: size === 'xlarge',
        }, className)}
        style={
          isNumber(size)
            ? { width: size, height: size }
            : { width: dimensions[size], height: dimensions[size] }
        }
      >
        {imageUrl ? (
          <Image
            className={styles.square}
            src={imageUrl}
            alt={fullName ? `Avatar for ${fullName}` : 'Avatar'}
            height={typeof size === 'string' ? dimensions[size] : `${size}px`}
            ref={outerRef}
          />
        ) : (
          <span
            className={`${styles.initials} ${styles.square}`}
            style={getStyle(initial)}
            title={fullName && `Avatar for ${fullName}`}
          >
            {initial}
          </span>
        )}
      </div>
    );
  },
);

// Needed because of the `forwardRef`.
EntityAvatar.displayName = 'EntityAvatar';

interface UserAvatarPropsType {
  imageUrl?: string,
  initials?: string,
  fullName?: string,
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | number,
  className?: string
}

const UserAvatar = forwardRef<HTMLElement, UserAvatarPropsType>(
  ({
    imageUrl,
    size = 'small',
    initials,
    fullName,
    className
  }: UserAvatarPropsType, outerRef): JSX.Element => {
    return (
      <div
        className={classNames(styles.avatar, {
          [styles.avatarSizeXsmall]: size === 'xsmall',
          [styles.avatarSizeSmall]: size === 'small',
          [styles.avatarSizeMedium]: size === 'medium',
          [styles.avatarSizeLarge]: size === 'large',
          [styles.avatarSizeXlarge]: size === 'xlarge',
        }, className)}
        style={
          isNumber(size)
            ? { width: size, height: size }
            : { width: dimensions[size], height: dimensions[size] }
        }
      >
        {imageUrl ? (
          <Image
            className={styles.circle}
            src={imageUrl}
            alt={fullName ? `Avatar for ${fullName}` : 'Avatar'}
            height={typeof size === 'string' ? dimensions[size] : `${size}px`}
            ref={outerRef}
          />
        ) : (
          <span
            className={`${styles.initials} ${styles.circle}`}
            style={getStyle(initials)}
            title={fullName && `Avatar for ${fullName}`}
          >
            {initials}
          </span>
        )}
      </div>
    );
  },
);

// Needed because of the `forwardRef`.
UserAvatar.displayName = 'UserAvatar';

export { UserAvatar, EntityAvatar };
