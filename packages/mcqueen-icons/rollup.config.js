import path from 'path'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

const pkg = require('./package.json')

const formats = [{
  name: 'es',
  preserveModules: true
}, {
  name: 'cjs',
  preserveModules: false
}]

module.exports = formats.map(format => ({
  input: 'src/index.js',
  plugins: [
    babel(),
    commonjs(),
    // terser()
  ],
  output: {
    dir: path.join('dist', format.name),
    format: format.name,
    preserveModules: format.preserveModules,
    globals: {
      'react': 'React'
    }
  },
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
  ]
}))
