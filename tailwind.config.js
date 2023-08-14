/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{handlebars, js}'],
  content: ['./node_modules/flowbite/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

