/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#90A423',
        'brand-dark': '#1a1a1a',
        'brand-light': '#f9f9f9',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['"Lato"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
