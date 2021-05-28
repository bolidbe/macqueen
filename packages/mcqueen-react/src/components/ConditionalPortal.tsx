import React from 'react';
import { createPortal } from 'react-dom';
import canUseDOM from '../utils/canUseDOM';

export interface ConditionalPortalPropsType {
  shouldDisplace?: boolean;
  children?: React.ReactNode;
}

export default function ConditionalPortal({
  shouldDisplace = true,
  children,
}: ConditionalPortalPropsType): JSX.Element | null {
  if (!children) {
    return null;
  }

  return (
    <>
      {
        (canUseDOM && shouldDisplace)
        ? createPortal(children, document.body)
        : children
      }
    </>
  );
}
