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
      backgroundImage: {
        'bg': "url('https://images.unsplash.com/photo-1531403009284-440f080d1e12')",
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