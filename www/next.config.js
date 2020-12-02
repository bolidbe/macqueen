// next.config.js
const plugins = require('next-compose-plugins');
const transpileModules = require('next-transpile-modules')([
  '@bolid/mcqueen-react',
  '@bolid/mcqueen-icons'
])

const nextConfig = {}

module.exports = plugins([
  transpileModules
], nextConfig);
