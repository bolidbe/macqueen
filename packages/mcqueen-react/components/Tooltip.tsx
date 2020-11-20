import React, { Component, ReactNode, ReactElement, cloneElement, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { assign } from 'lodash';
import classNames from 'classnames';
import { Manager, Reference, Popper } from 'react-popper';

import styles from './Tooltip.module.scss';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const doesWindowSupportTouch = (): boolean =>
  typeof window !== 'undefined' && 'ontouchstart' in window;

interface WhenChildrenChangePropsType {
  children: ReactElement,
  onChange(): void;
}

const WhenChildrenChange = ({
  children,
  onChange
}: WhenChildrenChangePropsType) => {
  useEffect(() => {
    onChange()
  }, [children])
  return children
}

interface TooltipPropsType {
  children: ReactNode;
  text: string;
  theme?: 'light' | 'dark';
  position?: 'top' | 'bottom';
  closeDelayLength?: 0 | 200;
  zIndex?: number;
}

export default function Tooltip({
  position = 'top',
  theme = 'dark',
  zIndex,
  text,
  children,
  closeDelayLength = 200
}: TooltipPropsType): JSX.Element {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openTimeout, setOpenTimeout] = useState<number | undefined>(undefined);
  const [closeTimeout, setCloseTimeout] = useState<number | undefined>(undefined);

  const show = (): void => {
    if(closeTimeout){
      window.clearTimeout(closeTimeout);
    }
    setIsOpen(true);
  };

  const hide = (): void => {
    setIsOpen(false);
  };

  const onFocus = (): void => {
    if(!doesWindowSupportTouch()){
      show();
    }
  };

  const onMouseEnter = (): void => {
    if(!doesWindowSupportTouch()){
      setOpenTimeout(window.setTimeout(show, 100));
    }
  };

  const onMouseLeave = (): void => {
    setCloseTimeout(window.setTimeout(hide, closeDelayLength));
    if (openTimeout) {
      clearTimeout(openTimeout);
    }
  };

  const onClick = (): void => {
    if(doesWindowSupportTouch()){
      if(isOpen){
        hide();
      }else{
        show();
      }
    }
  };

  useEffect((): (() => void) => {
    const handleKeyUp = (event: KeyboardEvent): void => {
      if (canUseDOM && event.keyCode === 27) {
        event.preventDefault();
        hide();
      }
    };

    setIsLoaded(true)

    document.addEventListener('keyup', handleKeyUp);
    return (): void => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const tooltip = <span>{ text }</span>

  const popper = isOpen && (
    <Popper
      placement={position}
      modifiers={[{
        name: 'offset',
        options: {
          offset: [0, 16],
        }
      }, {
        name: 'preventOverflow',
        options: {
          boundary: 'window',
        }
      }]}
      positionFixed={false}
    >
      {({ ref, style, placement, arrowProps, update }: any): ReactElement => (
        <div
          role="tooltip"
          className={classNames({
            [styles.tooltip]: true,
            [styles.tooltipDark]: theme === 'dark',
            [styles.tooltipLight]: theme === 'light',
          })}
          ref={ref}
          style={assign({}, style, { zIndex })}
          data-placement={placement}
          onMouseEnter={show}
          onMouseLeave={onMouseLeave}
          onClick={(event): void => {
            event.stopPropagation();
            if (doesWindowSupportTouch()) {
              hide();
            }
          }}
        >
          <WhenChildrenChange onChange={update}>
            { tooltip }
          </WhenChildrenChange>
          <div
            className={classNames({
              [styles.nubbin]: true,
              [styles.nubbinTop]: placement === 'top',
              [styles.nubbinBottom]: placement === 'bottom',
              [styles.nubbinDark]: theme === 'dark',
              [styles.nubbinLight]: theme === 'light',
            })}
            ref={arrowProps.ref}
            style={arrowProps.style}
          />
        </div>
      )}
    </Popper>
  )

  return (
    <Manager>
      <Reference>
        {({ ref }: any): ReactElement => (
          <div
            ref={ref}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={hide}
            aria-label={text}
          >
            { children }
          </div>
        )}
      </Reference>
      {
        (isLoaded && canUseDOM)
        ? createPortal(popper, document.body)
        : popper
      }
    </Manager>
  )
}
