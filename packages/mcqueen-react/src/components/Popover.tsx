import React, { ReactNode, useState, useEffect } from 'react';
import classNames from 'classnames';
import { usePopper } from 'react-popper';
import canUseDOM from "../utils/canUseDOM"
import useCloseOnEscape from "../utils/useCloseOnEscape"
import useFocusTrap from '../utils/useFocusTrap';

import ConditionalPortal from './ConditionalPortal';

import styles from './Popover.module.scss';

export interface PopoverPropsType {
  children: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  isOpen: boolean;
  size?: 'small' | 'large';
  onClose: () => void;
  container?: 'inline' | 'body';
  className?: string;
  closeButtonIsHidden?: boolean;
  shouldCloseOnClickOutside?: boolean;
}

export default function Popover({
    children,
    content,
    onClose,
    isOpen,
    size = 'small',
    position = 'top',
    container = 'body',
    className,
    closeButtonIsHidden = false,
    shouldCloseOnClickOutside = false
}: PopoverPropsType): JSX.Element {
  const [elementRef, setElementRef] = useState<any | null>(null);
  const [popperRef, setPopperRef] = useState<any | null>(null);
  const [arrowRef, setArrowRef] = useState<any | null>(null);

  const { attributes, styles: popperStyles } = usePopper(elementRef, popperRef, {
    placement: position,
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8],
      }
    }, {
      name: 'preventOverflow',
      options: {
        boundary: 'window',
      }
    }, {
      name: 'arrow',
      options: {
        element: arrowRef
      }
    }],
    positionFixed: false
  })

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const shouldTrapFocus: boolean = canUseDOM && !!elementRef;
  const shouldBindEscListener: boolean = canUseDOM && isOpen;

  useCloseOnEscape(onClose, shouldBindEscListener);
  useFocusTrap(elementRef, shouldTrapFocus, elementRef);

  const handleClickOutside = (e: any) => {
    if (!!popperRef && !popperRef.contains(e.target)){
      onClose()
    }
  }

  useEffect(() => {
    setIsLoaded(true)
  }, []);

  useEffect(() => {
    if(isOpen && shouldCloseOnClickOutside){
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen, popperRef, shouldCloseOnClickOutside]);

  const placement = attributes.popper ? attributes.popper['data-popper-placement'] : null

  const popover = isOpen && (
    <div
      ref={setPopperRef}
      role="dialog"
      className={classNames({
        [styles.popover]: true,
        [styles.popoverStateIsOpen]: isOpen,
        [styles.popoverSizeSmall]: size === 'small',
        [styles.popoverSizeLarge]: size === 'large'
      })}
      style={popperStyles.popper}
      {...attributes.popper}
    >
      <div className={styles.content}>
        <div className={styles.popoverBorder}></div>
        { content }
        {!closeButtonIsHidden && (
          <div className={styles.closeButton}>
            <button onClick={onClose}>
              <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.closeButtonIcon}
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div
        ref={setArrowRef}
        className={classNames({
          [styles.arrow]: true,
          [styles.arrowPositionTop]: placement === 'top',
          [styles.arrowPositionBottom]: placement === 'bottom',
          [styles.arrowPositionLeft]: placement === 'left',
          [styles.arrowPositionRight]: placement === 'right',
        })}
        style={popperStyles.arrow}
      />
    </div>
  )

  return (
    <>
      <div
        className={classNames("inline-block", className)}
        ref={setElementRef}
      >
        { children }
      </div>
      {isLoaded && (
        <ConditionalPortal shouldDisplace={container === 'body'}>
          { popover }
        </ConditionalPortal>
      )}
    </>
  );
}
