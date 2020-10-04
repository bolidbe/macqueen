import React from 'react';
import classNames from 'classnames';

import styles from './LoaderDots.module.scss';

interface ILoaderDotsProps {
  assistiveText?: string,
  size?: 'small' | 'medium',
  theme?: 'brand' | 'inverse' | 'muted'
}

export default function LoaderDots({
  assistiveText = 'Loading',
  size = 'medium',
  theme = 'brand'
}: ILoaderDotsProps): JSX.Element {
  const dotClassName = classNames({
    [styles.dot]: true,
    [styles.dotThemeBrand]: theme === 'brand',
    [styles.dotThemeInverse]: theme === 'inverse',
    [styles.dotThemeMuted]: theme === 'muted',
    [styles.dotSizeSmall]: size === 'small',
    [styles.dotSizeMedium]: size === 'medium',
  });

  return (
    <ul className={styles.loader} role="status">
      <li className={dotClassName} />
      <li className={dotClassName} />
      <li className={dotClassName} />
      <li className={styles.hiddenText}>{assistiveText}</li>
    </ul>
  );
}
