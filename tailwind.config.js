/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'views/**/*.handlebars',
    'views/*.handlebars',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    fontFamily: {
      'display': ['Oswald']
    },
    extend: {
      backgroundImage: {
        'dicks': "url('assets/DICKS.png')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')({
        charts: true,
    }),
  ]
}

