/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "viol": "#542087",
        "viol-dark": "#13071E"
      },
      borderRadius: {
        'xl': '30px',
        '2xl': '25px',
        '3xl': '100%',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-textshadow'),
  ],
}