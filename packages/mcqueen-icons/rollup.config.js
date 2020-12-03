const path = require('path')
const babel = require('@rollup/plugin-babel').default
const commonjs = require('@rollup/plugin-commonjs')

const pkg = require('./package.json')

const formats = ['es', 'cjs']

module.exports = {
  input: 'src/index.js',
  plugins: [
    babel(),
    commonjs()
  ],
  output: formats.map(format => ({
    dir: path.join('dist', format),
    format,
    globals: {
      'react': 'React'
    }
  })),
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
  ]
}
