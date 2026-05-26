/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        molten: '#F8F6F0', // Soft off-white accent
        mauve: '#9370DB',
        deepOrange: '#FF6F00',
        charcoal: '#1E1E1E',
        moonlight: '#C0C0C0'
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif']
      },
      keyframes: {
        gradientAnimation: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' }
        }
      },
      animation: {
        gradientAnimation: 'gradientAnimation 5s ease infinite'
      }
    }
  },
  plugins: [],
  darkMode: 'media'
};