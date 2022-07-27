import React, { ReactNode } from "react";
import classNames from 'classnames';

import { Icon, IconPropsType } from "@bolid/mcqueen-icons/dist/es";

import styles from './Pill.module.scss';

const iconSizes: {
  [key: string]: 'tiny' | 'small' | 'medium';
} = {
  small: 'tiny',
  medium: 'small',
  large: 'medium'
}

export interface PillPropsType {
  children: ReactNode;
  icon?: IconPropsType['name'];
  color?: 'green' | 'red' | 'orange' | 'blue' | 'yellow' | 'purple' | 'pink';
  variant?: 'solid' | 'inverse';
  className?: string;
  size?: 'large' | 'medium' | 'small';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function Pill({
  color,
  icon,
  children,
  className,
  size = 'medium',
  variant = 'inverse',
  onClick,
  style
}: PillPropsType): JSX.Element {
  return (
    <div
      className={classNames({
        [styles.pill]: true,
        [styles.pillVariantSolid]: variant === 'solid',
        [styles.pillVariantInverse]: variant === 'inverse',
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
      style={style}
      onClick={onClick}
    >
      <div className="flex items-center">
        {!!icon && (
          <Icon className="mr-1" size={iconSizes[size]} name={icon}/>
        )}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
