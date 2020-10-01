import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Title.module.scss';

interface IProps {
  children: ReactNode,
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
  className?: string,
  heading?: 1 | 2 | 3 | 4 | 5 | 6,
  id?: string
}

export default function Title({
    children,
    size,
    className,
    heading,
    id,
}: IProps): JSX.Element {
    const elementName = heading ? `h${heading}` : 'div';

    const props = {
        className: classNames(styles[`title${size}`], className),
        id,
    };

    return React.createElement(elementName, props, children);
}
