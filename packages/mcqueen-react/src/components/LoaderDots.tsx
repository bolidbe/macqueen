import React from 'react';
import classNames from 'classnames';

import styles from './LoaderDots.module.scss';

export interface LoaderDotsPropsType {
  assistiveText?: string;
  size?: 'small' | 'medium';
  theme?: 'primary' | 'secondary' | 'tertiary' | 'caution' | 'inverse';
  className?: string;
}

export default function LoaderDots({
  assistiveText = 'Loading',
  size = 'medium',
  theme = 'primary',
  className
}: LoaderDotsPropsType): JSX.Element {
  const dotClassName = classNames({
    [styles.dot]: true,
    [styles.dotThemePrimary]: theme === 'primary',
    [styles.dotThemeSecondary]: theme === 'secondary',
    [styles.dotThemeTertiary]: theme === 'tertiary',
    [styles.dotThemeCaution]: theme === 'caution',
    [styles.dotThemeInverse]: theme === 'inverse',
    [styles.dotSizeSmall]: size === 'small',
    [styles.dotSizeMedium]: size === 'medium',
  });

  return (
    <ul className={classNames(styles.loader, className)} role="status">
      <li className={dotClassName} />
      <li className={dotClassName} />
      <li className={dotClassName} />
      <li className={styles.hiddenText}>{assistiveText}</li>
    </ul>
  );
}
