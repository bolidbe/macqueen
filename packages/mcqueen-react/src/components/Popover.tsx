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
  position?:
    'top-start'
    | 'top'
    | 'top-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end'
    | 'left-start'
    | 'left'
    | 'left-end'
    | 'right-start'
    | 'right'
    | 'right-end';
  isOpen: boolean;
  onClose: () => void;
  container?: 'inline' | 'body';
  popoverClassName?: string;
  className?: string;
}

export default function Popover({
    children,
    content,
    onClose,
    isOpen,
    position = 'top',
    container = 'body',
    popoverClassName,
    className
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

  useEffect(() => {
    setIsLoaded(true)
  }, []);

  const placement = attributes.popper ? attributes.popper['data-popper-placement'] : null
  const popover = isOpen && (
    <div
      ref={setPopperRef}
      role="dialog"
      className={classNames({
        [styles.popover]: true,
        [styles.popoverStateIsOpen]: isOpen,
      }, popoverClassName)}
      style={popperStyles.popper}
      {...attributes.popper}
    >
      { content }

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

      <div
        ref={setArrowRef}
        className={classNames({
          [styles.arrow]: true,
          [styles.arrowPositionTop]: placement === 'bottom',
          [styles.arrowPositionBottom]: placement === 'top',
          [styles.arrowPositionLeft]: placement === 'right',
          [styles.arrowPositionRight]: placement === 'left',
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
