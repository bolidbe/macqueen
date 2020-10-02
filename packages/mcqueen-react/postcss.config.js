module.exports = {
  plugins: [
    require('tailwindcss')('./node_modules/@bolid/mcqueen-scss/tailwind.config.js'),
    require('autoprefixer'),
    require('cssnano')
  ],
}
