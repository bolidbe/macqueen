import React from 'react';
import classNames from 'classnames';
import styles from './BannerAlert.module.scss';
import { WarningFillIcon, InfoFillIcon, StopFillIcon } from '@bolid/mcqueen-icons';

const ALERT_ICONS = {
  caution: <StopFillIcon size="medium" className={styles.icon} />,
  info: <InfoFillIcon size="medium" className={styles.icon} />,
  warning: <WarningFillIcon size="medium" className={styles.icon} />,
};

interface IBannerAlertProps {
  children: React.ReactNode | string,
  theme: 'info' | 'warning' | 'caution',
  className?: string
}

export default function AlertBanner({
  children,
  theme,
  className
}: IBannerAlertProps): JSX.Element {
  return (
    <div
      className={classNames({
        [styles.bannerAlert]: true,
        [styles.bannerAlertStateCaution]: theme === 'caution',
        [styles.bannerAlertStateInfo]: theme === 'info',
        [styles.bannerAlertStateWarning]: theme === 'warning',
      }, className)}
    >
      { ALERT_ICONS[theme] }
      <div>{ children }</div>
    </div>
  );
}
