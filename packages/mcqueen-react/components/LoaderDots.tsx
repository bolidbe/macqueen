import React from 'react';
import classNames from 'classnames';

import styles from './LoaderDots.module.scss';

interface IProps {
  assistiveText?: string,
  size?: 'small' | 'medium',
  theme?: 'brand' | 'inverse' | 'muted'
}

const LoaderDots = ({
  assistiveText = 'Loading',
  size = 'medium',
  theme = 'brand'
}: IProps): JSX.Element => {
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

export default LoaderDots
