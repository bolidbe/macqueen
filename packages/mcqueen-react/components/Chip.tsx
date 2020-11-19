import React, { ReactNode } from 'react'
import classNames from "classnames"

import { Icon } from "@bolid/mcqueen-icons"

import styles from "./Chip.module.scss"

interface ChipPropsType {
  children: ReactNode;
  isSelected: boolean;
  className?: string;
  iconLeft?: string;
  iconRight?: string;
}

export function FilterChip({
  children,
  className,
  iconLeft,
  iconRight,
  isSelected
}: ChipPropsType) {
  return (
    <div className={classNames({
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
  className,
  iconLeft,
  iconRight,
  isSelected
}: ChipPropsType) {
  return (
    <div className={classNames({
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
