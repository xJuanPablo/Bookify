/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'views/**/*.handlebars',
    'views/*.handlebars',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

