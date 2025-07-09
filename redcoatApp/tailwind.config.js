/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'logo': ['Playfair Display', 'serif'],
        'brand': ['Montserrat', 'sans-serif'],
        'modern': ['Inter', 'sans-serif'],
        'elegant': ['Cormorant Garamond', 'serif'],
        'bold': ['Oswald', 'sans-serif'],
        'clean': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

