import path from 'path'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import commonjs from "@rollup/plugin-commonjs"
import postcss from "rollup-plugin-postcss"
import copy from 'rollup-plugin-cpy'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from "rollup-plugin-terser"
import { includes } from "lodash"

const { peerDependencies } = require('./package.json')

const formats = [{
  name: 'es',
  preserveModules: true,
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: path.join('dist', 'es', 'src')
        }
      }
    }),
    copy({
      files: ['src/**/*.scss', 'src/**/*.css', '!dist/**'],
      dest: path.join('dist', 'es'),
      options: {
        parents: true,
      }
    }),
  ],
  external: id =>
    // Don't attempt to bundle peerDependencies.
    peerDependencies[id] ||
    id === "next" ||
    id === "next/router" ||
    id === "next/link" ||
    includes(id, "lodash") ||
    // Don't attempt to parse CSS modules.
    /module\.s?css$/.test(id)
}, {
  name: 'cjs',
  preserveModules: false,
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: path.join('dist', 'cjs')
        }
      }
    }),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    })
  ],
  external: id =>
    // Don't attempt to bundle peerDependencies.
    peerDependencies[id] ||
    id === "next" ||
    id === "next/router" ||
    id === "next/link" ||
    includes(id, "lodash")
}]

module.exports = formats.map(format => ({
  input: './src/index.tsx',
  plugins: [
    babel(),
    nodeResolve(),
    commonjs(),
    json(),
    terser(),
    ...format.plugins
  ],
  output: {
    dir: path.join('dist', format.name),
    format: format.name,
    preserveModules: format.preserveModules,
    globals: {
      'react': 'React'
    }
  },
  external: format.external
}))
