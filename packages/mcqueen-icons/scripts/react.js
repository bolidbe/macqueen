#!/usr/bin/env node
const mcQueenIcons = require('../dist/data.json')
const fse = require('fs-extra')
const {join, resolve} = require('path')

const srcDir = resolve(__dirname, '../dist')
const iconsFile = join(srcDir, 'index.js')
const typesFile = join(srcDir, 'index.d.ts')

const GENERATED_HEADER = '/* THIS FILE IS GENERATED. DO NOT EDIT IT. */'

function pascalCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

const icons = Object.entries(mcQueenIcons)
  .map(([key, octicon]) => {
    const name = `${pascalCase(key)}Icon`
    const code = `
function ${name}(props) {
  const svgDataByHeight = ${JSON.stringify(octicon.heights)}
  return <svg {...getSvgProps({...props, svgDataByHeight})} />
}
${name}.defaultProps = {
  size: 16,
  verticalAlign: 'text-bottom'
}
    `

    return {
      key,
      name,
      octicon,
      code
    }
  })
  .sort((a, b) => a.key.localeCompare(b.key))

function writeIcons(file) {
  const count = icons.length
  const code = `
${GENERATED_HEADER}
import React from 'react'

const sizeMap = {
  tiny: 12,
  small: 16,
  medium: 24
}

function closestNaturalHeight(naturalHeights, height) {
  return naturalHeights
    .map(naturalHeight => parseInt(naturalHeight, 10))
    .reduce((acc, naturalHeight) => (naturalHeight <= height ? naturalHeight : acc), naturalHeights[0])
}

function getSvgProps({'aria-label': ariaLabel, className, size, verticalAlign, svgDataByHeight}) {
  const height = sizeMap[size] || size
  const naturalHeight = closestNaturalHeight(Object.keys(svgDataByHeight), height)
  const naturalWidth = svgDataByHeight[naturalHeight].width
  const width = height * (naturalWidth / naturalHeight)
  const path = svgDataByHeight[naturalHeight].path

  return {
    'aria-hidden': ariaLabel ? 'false' : 'true',
    'aria-label': ariaLabel,
    role: 'img',
    className,
    viewBox: \`0 0 \${naturalWidth} \${naturalHeight}\`,
    width,
    height,
    fill: 'currentColor',
    style: {
      display: 'inline-block',
      userSelect: 'none',
      verticalAlign
    },
    dangerouslySetInnerHTML: {__html: path}
  }
}
${icons.map(({code}) => code).join('\n')}
export {
  ${icons.map(({name}) => name).join(',\n  ')}
}
  `
  return fse.writeFile(file, code, 'utf8').then(() => {
    console.warn('wrote %s with %d exports', file, count)
    return icons
  })
}

function writeTypes(file) {
  const count = icons.length
  const code = `
${GENERATED_HEADER}
import * as React from 'react'

type Size = 'tiny' | 'small' | 'medium'

interface IconProps {
  'aria-label'?: string
  className?: string
  size?: number | Size
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top' | 'unset'
}

type Icon = React.FC<IconProps>

${icons.map(({name}) => `declare const ${name}: Icon`).join('\n')}

export {
  Icon,
  IconProps,
  ${icons.map(({name}) => name).join(',\n  ')}
}
  `
  return fse.writeFile(file, code, 'utf8').then(() => {
    console.warn('wrote %s with %d exports', file, count)
    return icons
  })
}

fse
  .mkdirs(srcDir)
  .then(() => writeIcons(iconsFile))
  .then(() => writeTypes(typesFile))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
