import React, { ReactNode, useState, useEffect } from 'react';
import classNames from 'classnames';
import { usePopper } from 'react-popper';
import useCloseOnEscape from "../utils/useCloseOnEscape"
// import useFocusTrap from '../utils/useFocusTrap';
import canUseDOM from '../utils/canUseDOM';

import ConditionalPortal from './ConditionalPortal';

import styles from './Popover.module.scss';

export interface PopoverPropsType {
  children: ReactNode;
  content: ReactNode;
  borderColor?: 'blue' | 'white';
  position?: 'top' | 'bottom' | 'left' | 'right';
  isOpen: boolean;
  size?: 'small' | 'large' | 'auto';
  onClose: () => void;
  shouldDisplace?: boolean;
  className?: string;
  closeButtonIsHidden?: boolean;
  shouldCloseOnClickOutside?: boolean;
  arrowIsHidden?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function Popover({
    children,
    content,
    onClose,
    isOpen,
    className,
    borderColor = 'blue',
    size = 'small',
    position = 'top',
    shouldDisplace = true,
    arrowIsHidden = false,
    closeButtonIsHidden = false,
    shouldCloseOnClickOutside = false,
    onClick,
    style
}: PopoverPropsType): JSX.Element {
  const [elementRef, setElementRef] = useState<any | null>(null);
  const [popperRef, setPopperRef] = useState<any | null>(null);
  const [arrowRef, setArrowRef] = useState<any | null>(null);

  const { attributes, styles: popperStyles } = usePopper(elementRef, popperRef, {
    placement: position,
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, arrowIsHidden ? 0 : 8],
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

  // const shouldTrapFocus: boolean = canUseDOM && !!elementRef;
  const shouldBindEscListener: boolean = canUseDOM && isOpen;

  useCloseOnEscape(onClose, shouldBindEscListener);
  // useFocusTrap(elementRef, shouldTrapFocus, elementRef);

  useEffect(() => {
    if(isOpen && !!popperRef && shouldCloseOnClickOutside){
      const handleClickOutside = (e: any) => {
        setTimeout(() => {
          if (!!popperRef && !popperRef.contains(e.target)){
            onClose()
          }
        }, 10)
      }
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }
  }, [popperRef, isOpen, shouldCloseOnClickOutside]);

  const placement = !!attributes.popper ? attributes.popper['data-popper-placement'] : null

  return (
    <>
      <div
        className={classNames("inline-block", className)}
        ref={setElementRef}
        style={style}
        onClick={onClick}
      >
        { children }
      </div>
      <ConditionalPortal shouldDisplace={shouldDisplace}>
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
            <div className={classNames({
              [styles.popoverBorder]: true,
              [styles.popoverBorderColorBlue]: borderColor === 'blue',
              [styles.popoverBorderColorWhite]: borderColor === 'white',
            })}></div>
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
          {!arrowIsHidden && (
            <div
              ref={setArrowRef}
              className={classNames({
                [styles.arrow]: true,
                [styles.arrowPositionTop]: placement === 'top',
                [styles.arrowPositionBottom]: placement === 'bottom',
                [styles.arrowPositionLeft]: placement === 'left',
                [styles.arrowPositionRight]: placement === 'right',
                [styles.arrowColorBlue]: borderColor === 'blue',
                [styles.arrowColorWhite]: borderColor === 'white'
              })}
              style={popperStyles.arrow}
            />
          )}
        </div>
      </ConditionalPortal>
    </>
  );
}
