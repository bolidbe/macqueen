import React, { ReactNode, useEffect, useState } from 'react'
import classNames from "classnames"
import noScroll from 'no-scroll'

import { CrossIcon } from "@bolid/mcqueen-icons"
import ConditionalPortal from "./ConditionalPortal"

import styles from "./Modal.module.scss"

export interface ModalPropsType {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
  shouldHideCloseButton?: boolean;
  shouldModalScroll?: boolean;
  shouldCloseOnCurtainClick?: boolean;
  width?: 'small' | 'medium' | 'large';
  height?: 'auto' | 'medium' | 'large';
  onClose(): void;
}

export default function Modal({
  children,
  isOpen,
  className,
  width = 'medium',
  height = 'auto',
  shouldHideCloseButton = false,
  shouldModalScroll = true,
  shouldCloseOnCurtainClick = true,
  onClose
}: ModalPropsType): JSX.Element | null {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if(isOpen) noScroll.on()
    else noScroll.off()
  }, [isOpen])

  useEffect(() => {
    setIsLoaded(true)
    return () => {
      noScroll.off()
    }
  }, [])

  const onClickCurtain = (event: any) => {
    if (shouldCloseOnCurtainClick && event.target === event.currentTarget) {
      onClose();
    }
  }

  if(!isLoaded){
    return null
  }

  return (
    <ConditionalPortal>
      <div role="dialog" aria-label="Modal" tabIndex={-1}>
        <div className={classNames({
          [styles.curtain]: true,
          [styles.curtainOpen]: isOpen
        })} style={{ visibility: isOpen ? "visible" : "hidden" }}>
          <div onClick={onClickCurtain} className={styles.curtainInner}>
            <div className={classNames({
              [styles.modal]: true,
              [styles.modalOpen]: isOpen,
              [styles.modalWidthSmall]: width === 'small',
              [styles.modalWidthMedium]: width === 'medium',
              [styles.modalWidthLarge]: width === 'large',
              [styles.modalHeightMedium]: height === 'medium',
              [styles.modalHeightLarge]: height === 'large',
              [styles.modalShouldScroll]: shouldModalScroll
            })}>
              <div className={classNames(styles.container, className)}>
                {!shouldHideCloseButton && (
                  <div className={styles.closeButton}>
                    <div className="m-3">
                      <button onClick={onClose}>
                        <CrossIcon size="medium"/>
                      </button>
                    </div>
                  </div>
                )}
                <div className={styles.content}>
                  <div className={styles.contentPadding}>
                    { children }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConditionalPortal>
  )
}
