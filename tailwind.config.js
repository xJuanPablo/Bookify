/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'views/**/*.handlebars',
    'views/*.handlebars',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    screens: {
      'sm': {'min': '576px', 'max': '767px'},
      'md': {'min': '768px', 'max': '991px'},
      'lg': {'min': '992px', 'max': '1199px'},
      'xl': {'min': '1200px'},
    },
    fontFamily: {
      'display': ['Oswald']
    },
    extend: {
      backgroundImage: {
        'dicks': "url('/assets/DICKS.png')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')({
        charts: true,
    }),
  ]
};

