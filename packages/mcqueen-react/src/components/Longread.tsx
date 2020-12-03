import React, { ReactNode } from "react"
import classNames from "classnames"

import styles from "./Longread.module.scss"

interface LongreadPropsType {
  children: ReactNode;
  className?: string;
}

export default function Longread({
  children,
  className
}: LongreadPropsType){
  return (
    <div className={classNames(styles.longread, className)}>
      {children}
    </div>
  )
}
