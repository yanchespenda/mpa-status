const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'trueGray': colors.trueGray,
      },

      // that is animation class
      // animation: {
      //   fade: 'fadeOut 5s ease-in-out',
      // },

      // // that is actual animation
      // keyframes: theme => ({
      //   fadeOut: {
      //     '0%': { opacity: 0 },
      //     '100%': { opacity: 1 },
      //   },
      // }),
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}
