import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import commonjs from "@rollup/plugin-commonjs"
import postcss from "rollup-plugin-postcss"

import { peerDependencies } from './package.json'

const formats = ['esm', 'umd']

export default {
  input: './index.tsx',
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      typescript: require('typescript')
    }),
    babel(),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    commonjs()
  ],
  output: formats.map(format => ({
    file: `dist/index.${format}.js`,
    format,
    name: 'mcqueenreact',
    globals: {
      'react': 'React',
      'classnames': 'classNames'
    }
  })),
  external: [
    ...Object.keys(peerDependencies || {}),
  ]
}
