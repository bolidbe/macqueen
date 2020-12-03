import React from 'react';
import classNames from "classnames"
let Link: any;
try{
  Link = require('next/link').default
}catch{
  Link = undefined
}

import styles from "./Breadcrumbs.module.scss"

interface BreadcrumbType {
  title: string;
  href: string;
  as?: string;
}

interface BreadcrumbsPropsType {
  breadcrumbs: BreadcrumbType[],
  className?: string
}

export default function Breadcrumbs({
  breadcrumbs,
  className
}: BreadcrumbsPropsType): JSX.Element {
  return (
    <ul className={classNames("flex flex-wrap pl-0 text-body-3 heading-body-3", styles.breadcrumbs, className)}>
      {breadcrumbs.map((breadcrumb, i) => i < breadcrumbs.length - 1 ? (
        <li key={i}>
        {
          Link ? (
            <Link href={breadcrumb.href} as={breadcrumb.as}>
              <a className="text-blue">{ breadcrumb.title }</a>
            </Link>
          ) : (
            <a href={breadcrumb.href} className="text-blue">{ breadcrumb.title }</a>
          )
        }
        </li>
      ) : (
        <li key={i}>
          <span>{ breadcrumb.title }</span>
        </li>
      ))}
    </ul>
  )
}
