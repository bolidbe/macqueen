import React from "react";
import classNames from 'classnames';

import { Icon } from "@bolid/mcqueen-icons";

import styles from './Pill.module.scss';

const iconSizes: {
  [key: string]: 'tiny' | 'small' | 'medium';
} = {
  small: 'tiny',
  medium: 'small',
  large: 'medium'
}

export interface PillPropsType {
  children: string;
  icon?: string;
  color?: 'green' | 'red' | 'orange' | 'blue' | 'yellow' | 'purple' | 'pink';
  className?: string;
  size?: 'large' | 'medium' | 'small';
}

export default function Pill({
  color,
  icon,
  children,
  className,
  size = 'medium'
}: PillPropsType): JSX.Element {
  return (
    <div
      className={classNames({
        [styles.pill]: true,
        [styles.pillColorGreen]: color === 'green',
        [styles.pillColorRed]: color === 'red',
        [styles.pillColorPurple]: color === 'purple',
        [styles.pillColorBlue]: color === 'blue',
        [styles.pillColorYellow]: color === 'yellow',
        [styles.pillColorOrange]: color === 'orange',
        [styles.pillColorPink]: color === 'pink',
        [styles.pillSizeSmall]: size === 'small',
        [styles.pillSizeMedium]: size === 'medium',
        [styles.pillSizeLarge]: size === 'large',
      }, className)}
    >
      <div className="flex items-center">
        {icon && (
          <Icon className="mr-1" size={iconSizes[size]} name={icon}/>
        )}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
