import React, { ReactNode } from 'react'
import classNames from "classnames"

import { Icon } from "@bolid/mcqueen-icons"

import styles from "./Modal.module.scss"

interface ModalPropsType {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
  shouldPageScrollAboveSmall?: boolean;
  width?: 'small' | 'medium' | 'wide';
  heightAboveSmall?: 'auto' | 'medium' | 'tall';
}

export default function Modal({
  children,
  isOpen,
  className,
  width = 'medium',
  heightAboveSmall = 'tall',
  shouldPageScrollAboveSmall=true
}: ModalPropsType) {
  return (
    <div role="dialog" aria-label="Modal" tabIndex={-1}>
      <div className={classNames({
        [styles.curtain]: true,
        [styles.curtainOpen]: isOpen
      })}>
        <div className={classNames({
          [styles.curtainInner]: true,
          [styles.curtainInnerShouldPageScrollAboveSmall]: shouldPageScrollAboveSmall
        })}>
          <div className={classNames({
            [styles.modal]: true,
            [styles.modalWidthSmall]: width === 'small',
            [styles.modalWidthMedium]: width === 'medium',
            [styles.modalWidthWide]: width === 'wide',
            [styles.modalHeightMedium]: heightAboveSmall === 'medium',
            [styles.modalHeightTall]: heightAboveSmall === 'tall',
            [styles.modalOpen]: isOpen,
            [styles.modalShouldPageScrollAboveSmall]: shouldPageScrollAboveSmall
          })}>
            <div className={styles.container}>
              { children }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
