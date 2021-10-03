// next.config.js
const plugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const transpileModules = require('next-transpile-modules')([
  // '@bolid/mcqueen-react',
  // '@bolid/mcqueen-icons'
])

const nextConfig = {}

module.exports = plugins([
  bundleAnalyzer,
  transpileModules
], nextConfig);
