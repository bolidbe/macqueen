#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const globby = require('globby')
const cheerio = require('cheerio')
const trimNewlines = require('trim-newlines')
const merge = require('lodash.merge')

const iconsDir = path.resolve("icons")
const srcDir = path.resolve("src")
const distDir = path.resolve("dist")
const componentsDir = path.join(srcDir, 'components')

const svgFiles = path.join(iconsDir, "**/*.svg")
const dataFile = path.join(srcDir, 'data.json')
const iconsFile = path.join(componentsDir, 'icons.js')
const indexFile = path.join(srcDir, 'index.js')
const utilsFile = path.join(srcDir, 'utils.js')
const typesFile = path.join(distDir, 'index.d.ts')

const svgFilepaths = globby.sync(svgFiles).filter(filepath => path.parse(filepath).ext === '.svg')

if (svgFilepaths.length === 0) {
  console.error('No SVG file(s) found')
  process.exit(1)
}

let exitCode = 0

const icons = svgFilepaths.map(filepath => {
  try {
    const filename = path.parse(filepath).base
    const filenamePattern = /(.+)-([0-9]+).svg$/

    if (!filenamePattern.test(filename)) {
      throw new Error(
        `${filename}: Invalid filename. Please append the height of the SVG to the end of the filename (e.g. alert-16.svg).`
      )
    }

    const [, name, height] = filename.match(filenamePattern)
    const svg = fs.readFileSync(path.resolve(filepath), 'utf8')
    const $ = cheerio.load(svg)
    $('[fill]:not([fill="white"]):not([fill="#FFFFFF"]):not([fill="#FFF"]):not([fill="#fff"]):not([fill="#ffffff"])').attr('fill', 'currentColor')
    const svgElement = $('svg')
    const svgWidth = parseInt(svgElement.attr('width'))
    const svgHeight = parseInt(svgElement.attr('height'))
    const svgViewBox = svgElement.attr('viewBox')
    const svgPath = trimNewlines(svgElement.html()).trim()

    if (!svgWidth) {
      throw new Error(`${filename}: Missing width attribute.`)
    }

    if (!svgHeight) {
      throw new Error(`${filename}: Missing height attribute.`)
    }

    if (!svgViewBox) {
      throw new Error(`${filename}: Missing viewBox attribute.`)
    }

    if (svgHeight !== parseInt(height)) {
      throw new Error(`${filename}: Height in filename does not match height attribute of SVG`)
    }

    const viewBoxPattern = /0 0 ([0-9]+) ([0-9]+)/

    if (!viewBoxPattern.test(svgViewBox)) {
      throw new Error(
        `${filename}: Invalid viewBox attribute. The viewBox attribute should be in the following format: "0 0 <width> <height>"`
      )
    }

    const [, viewBoxWidth, viewBoxHeight] = svgViewBox.match(viewBoxPattern)

    if (svgWidth !== parseInt(viewBoxWidth)) {
      throw new Error(`${filename}: width attribute and viewBox width do not match.`)
    }

    if (svgHeight !== parseInt(viewBoxHeight)) {
      throw new Error(`${filename}: height attribute and viewBox height do not match.`)
    }

    return {
      name,
      width: svgWidth,
      height: svgHeight,
      path: svgPath
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    // Instead of exiting immediately, we set exitCode to 1 and continue
    // iterating through the rest of the SVGs. This allows us to identify all
    // the SVGs that have errors, not just the first one. An exit code of 1
    // indicates that an error occured.
    // Reference: https://nodejs.org/api/process.html#process_exit_codes
    exitCode = 1
    return null
  }
})

// Exit early if any errors occurred.
if (exitCode !== 0) {
  process.exit(exitCode)
}

const iconsByName = icons.reduce(
  (acc, icon) =>
    merge(acc, {
      [icon.name]: {
        name: icon.name,
        heights: {
          [icon.height]: {
            width: icon.width,
            path: icon.path
          }
        }
      }
    }),
  {}
)

const GENERATED_HEADER = '/* THIS FILE IS GENERATED. DO NOT EDIT IT. */'

function pascalCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

const iconsComponents = Object.entries(iconsByName)
  .map(([key, icon]) => {
    const name = `${pascalCase(key)}Icon`
    const code = `
      function ${name}(props) {
        const svgDataByHeight = ${JSON.stringify(icon.heights)}
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
      code
    }
  })
  .sort((a, b) => a.key.localeCompare(b.key))

function writeIndex(file) {
  const code = `${GENERATED_HEADER}
import React from 'react'
export * from './components/icons'
  `
  return fs.writeFile(file, code, 'utf8').then(() => {
    console.warn('wrote %s', file)
    return iconsComponents
  })
}

function writeUtils(file) {
  const code = `${GENERATED_HEADER}
export const sizeMap = {
  tiny: 12,
  small: 16,
  medium: 24
}

export function closestNaturalHeight(naturalHeights, height) {
  return naturalHeights
    .map(naturalHeight => parseInt(naturalHeight, 10))
    .reduce((acc, naturalHeight) => (naturalHeight <= height ? naturalHeight : acc), naturalHeights[0])
}

export function getSvgProps({'aria-label': ariaLabel, className, size, verticalAlign, svgDataByHeight}) {
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
  `
  return fs.writeFile(file, code, 'utf8').then(() => {
    console.warn('wrote %s', file)
    return iconsComponents
  })
}

function writeIcons(file) {
  const code = `${GENERATED_HEADER}
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
${iconsComponents.map(({code}) => code).join('\n')}

function Icon(props) {
  switch(props.name){
    ${iconsComponents.map(({ key, name }) => (
    `
      case "${ key }":
        return <${name} {...props} />
        break;
    `
    )).join("")}
    default:
      return none;
  }
}
Icon.defaultProps = {
  size: 16,
  verticalAlign: 'text-bottom'
}

export {
  Icon,
  ${iconsComponents.map(({name}) => name).join(',\n  ')},
}
  `
  return fs.writeFile(file, code, 'utf8').then(() => {
    console.warn('wrote %s', file)
    return iconsComponents
  })
}

function writeTypes(file) {
  const code = `${GENERATED_HEADER}
import * as React from 'react'

type Size = 'tiny' | 'small' | 'medium'

interface IconProps {
  'aria-label'?: string
  className?: string
  size?: number | Size
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top' | 'unset',
  name?: string
}

type IconType = React.FC<IconProps>

${iconsComponents.map(({name}) => `declare const ${name}: IconType`).join('\n')}
declare const Icon: IconType

export {
  IconType,
  IconProps,
  Icon,
  ${iconsComponents.map(({name}) => name).join(',\n  ')}
}
  `
  return fs.writeFile(file, code, 'utf8').then(() => {
    console.warn('wrote %s', file)
    return iconsComponents
  })
}

fs
  .mkdirs(srcDir)
  .then(() => writeIndex(indexFile))
  .then(() => writeUtils(utilsFile))
  .then(() => fs.mkdirs(componentsDir))
  .then(() => writeIcons(iconsFile))
  .then(() => fs.mkdirs(distDir))
  .then(() => writeTypes(typesFile))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
