import typescript from 'rollup-plugin-typescript2'

import { dependencies, peerDependencies } from './package.json';

const formats = ['esm', 'umd']

export default {
  input: './index.tsx',
  output: formats.map(format => ({
    file: `dist/index.${format}.js`,
    format,
    name: 'mcqueenreact'
  })),
  plugins: [
    typescript({
      typescript: require('typescript'),
    })
  ],
  external: [
    ...Object.keys(dependencies || {}),
    ...Object.keys(peerDependencies || {}),
  ]
}
