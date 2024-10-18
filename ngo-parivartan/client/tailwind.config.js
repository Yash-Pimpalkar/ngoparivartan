/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Added 'jsx' for React components
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)', // Linking to CSS custom variables
        'secondary-color': 'var(--secondary-color)',
        'background-color': 'var(--background-color)',
        'text-color': 'var(--text-color)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Defining the custom font family
        island: ['Island Moments', 'cursive'],    // Defining Island Moments for headings
      },
    },
  },
  plugins: [],
}
