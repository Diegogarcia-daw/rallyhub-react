/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rallyRed: '#e63946',
        rallyDark: '#1a1a1a',
      }
    },
  },
  plugins: [],
}