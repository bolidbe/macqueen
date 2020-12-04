import React, { ReactNode } from "react"
import classNames from "classnames"
import queryString from 'query-string'
import { range } from "lodash"
import { ArrowLeftIcon, ArrowRightIcon } from "@bolid/mcqueen-icons"
let useRouter: any;
let Link: any;
try{
  useRouter = require('next/router').useRouter
  Link = require('next/link').default
}catch(e){
  useRouter = () => null
  Link = undefined
}

import styles from "./Pagination.module.scss"

const getPath = () => {
  if(typeof window !== 'undefined'){
    return `${window.location.pathname}${window.location.search}`
  }else{
    return ""
  }
}

const getPrevLinks = (Component: any, currentPage: number, props: {[key: string]: any} = {}) => {
  const min = currentPage - 2 > 1
  ? currentPage - 1
  : 1

  return (min === 1 ? [] : [
    <Component key={1} page={1} {...props}>1</Component>
  ])
  .concat(min > 2 ? [
    <span key={currentPage} className="mx-1">...</span>
  ] : [])
  .concat(range(min, currentPage).map((page: number) => (
    <Component key={page} page={page} {...props}>{ page }</Component>
  )))
}

const getNextLinks = (Component: any, currentPage: number, pagesCount: number, props: {[key: string]: any} = {}) => {
  const max = currentPage + 2 < pagesCount
  ? currentPage + 1
  : pagesCount

  return range(currentPage + 1, max + 1).map((page: number) => (
    <Component key={page} page={page} {...props}>{ page }</Component>
  ))
  .concat(max < pagesCount - 1 ? [
    <span key={currentPage} className="mx-1">...</span>
  ] : [])
  .concat(max === pagesCount ? [] : [
    <Component key={pagesCount} page={pagesCount} {...props}>{ pagesCount }</Component>
  ])
}

interface LinkPagePropsType {
  page: number,
  isDisabled?: boolean,
  children?: ReactNode
}

let LinkPage = ({
  page,
  children,
  isDisabled=false
}: LinkPagePropsType) => {
  const router = useRouter()
  const { url, query } = queryString.parseUrl(router ? router.asPath : getPath())

  const anchorProps = {
    className: classNames(styles.link, { [styles.disabled]: isDisabled })
  }

  const params = queryString.stringify({
    ...query,
    page: page === 1 ? undefined : page
  })

  const newUrl = url + (params !== "" ? `?${params}` : "")

  const link = Link ? (
    <Link href={url} as={newUrl}>
      <a {...anchorProps}>
        { children }
      </a>
    </Link>
  ) : (
    <a href={newUrl} {...anchorProps}>
      { children }
    </a>
  )

  return !isDisabled ? link : <div {...anchorProps}>{ children }</div>
}

interface LinkPaginationPropsType {
  pagesCount: number;
  className?: string;
}

const LinkPagination = ({
  pagesCount,
  className
}: LinkPaginationPropsType) => {
  const router = useRouter()
  const { query } = queryString.parseUrl(router ? router.asPath : getPath())
  const currentPage = query.page ? +query.page : 1

  return pagesCount > 1 ? (
    <div className={classNames("flex justify-center items-center", className)}>
      <LinkPage isDisabled={currentPage === 1} page={currentPage - 1}>
        <small><ArrowLeftIcon/></small> <span className="hidden large:block ml-2">Précédent</span>
      </LinkPage>
      { getPrevLinks(LinkPage, currentPage) }
      <span className={classNames(styles.link, styles.active)}>{ currentPage }</span>
      { getNextLinks(LinkPage, currentPage, pagesCount) }
      <LinkPage isDisabled={currentPage === pagesCount} page={currentPage + 1}>
        <span className="hidden large:block mr-2">Suivant</span> <small><ArrowRightIcon/></small>
      </LinkPage>
    </div>
  ) : null
}

interface ClickPagePropsType {
  isDisabled?: boolean;
  children?: ReactNode;
  onClick(page: number): void;
  page: number;
}

const ClickPage = ({
  onClick,
  children,
  isDisabled=false,
  page
}: ClickPagePropsType) => {
  const buttonProps = {
    className: classNames(styles.link, { [styles.disabled]: isDisabled })
  }

  return !isDisabled ? (
    <button {...buttonProps} onClick={() => onClick(page)}>
      { children }
    </button>
  ) : <div {...buttonProps}>{ children }</div>
}

interface ClickPaginationPropsType {
  pagesCount: number;
  currentPage: number;
  className?: string;
  onClick(page: number): void
}

const ClickPagination = ({
  pagesCount,
  currentPage,
  onClick,
  className
}: ClickPaginationPropsType) => pagesCount > 1 ? (
  <div className={classNames("flex justify-center items-center", className)}>
    <ClickPage isDisabled={currentPage === 1} page={currentPage - 1} onClick={onClick}>
      <small><ArrowLeftIcon/></small> <span className="hidden large:block ml-2">Précédent</span>
    </ClickPage>
    { getPrevLinks(ClickPage, currentPage, { onClick }) }
    <span className={classNames(styles.link, styles.active)}>{ currentPage }</span>
    { getNextLinks(ClickPage, currentPage, pagesCount, { onClick }) }
    <ClickPage isDisabled={currentPage === pagesCount} page={currentPage + 1} onClick={onClick}>
      <span className="hidden large:block mr-2">Suivant</span> <small><ArrowRightIcon/></small>
    </ClickPage>
  </div>
) : null

export { LinkPagination, ClickPagination }
