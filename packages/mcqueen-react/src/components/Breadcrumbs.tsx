import React from 'react';
import classNames from "classnames"
let Link: any;
try{
  Link = require('next/link').default
}catch(e){
  Link = undefined
}

import styles from "./Breadcrumbs.module.scss"

export interface BreadcrumbType {
  name: string;
  path: string;
}

export interface BreadcrumbsPropsType {
  breadcrumbs: BreadcrumbType[];
  className?: string;
}

export default function Breadcrumbs({
  breadcrumbs,
  className
}: BreadcrumbsPropsType): JSX.Element {
  return (
    <ul className={classNames("flex flex-wrap text-body-3 leading-body-3", styles.breadcrumbs, className)}>
      {breadcrumbs.map((breadcrumb, i) => i < breadcrumbs.length - 1 ? (
        <li key={i}>
        {Link ? (
          <Link href={breadcrumb.path}>
            <a className="text-blue">{ breadcrumb.name }</a>
          </Link>
        ) : (
          <a href={breadcrumb.path} className="text-blue">{ breadcrumb.name }</a>
        )}
        </li>
      ) : (
        <li key={i}>
          <span>{ breadcrumb.name }</span>
        </li>
      ))}
    </ul>
  )
}
