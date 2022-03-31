import React, { ReactNode } from 'react'
import classNames from "classnames"
import { Icon, IconPropsType } from "@bolid/mcqueen-icons/dist/es"

import styles from "./Chip.module.scss"

export interface ChipPropsType {
  children: ReactNode;
  isSelected: boolean;
  onClick?(): void;
  className?: string;
  iconLeft?: IconPropsType['name'];
  iconRight?: IconPropsType['name'];
}

export function FilterChip({
  children,
  className,
  onClick,
  iconLeft,
  iconRight,
  isSelected
}: ChipPropsType): JSX.Element {
  return (
    <div onClick={onClick} className={classNames({
      [styles.chip]: true,
      [styles.chipThemeFilter]: true,
      [styles.chipStateSelected]: isSelected
    }, className)}>
      <div className="flex items-center">
        {iconLeft && (
          <div className="flex mr-2">
            <Icon name={iconLeft}/>
          </div>
        )}
        <div className="text-body-2 font-600">
        { children }
        </div>
        {iconRight && (
          <div className="flex ml-2">
            <Icon name={iconRight}/>
          </div>
        )}
      </div>
    </div>
  )
}

export function ToggleChip({
  children,
  onClick,
  className,
  iconLeft,
  iconRight,
  isSelected
}: ChipPropsType): JSX.Element {
  return (
    <div onClick={onClick} className={classNames({
      [styles.chip]: true,
      [styles.chipThemeToggle]: true,
      [styles.chipStateSelected]: isSelected
    }, className)}>
      <div className="flex items-center">
        {iconLeft && (
          <div className="flex mr-2">
            <Icon name={iconLeft}/>
          </div>
        )}
        <div className="text-body-2 font-600">
        { children }
        </div>
        {iconRight && (
          <div className="flex ml-2">
            <Icon name={iconRight}/>
          </div>
        )}
      </div>
    </div>
  )
}
