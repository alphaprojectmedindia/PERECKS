/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nhs: {
          blue: '#005EB8',
          darkBlue: '#003087',
          brightBlue: '#0072CE',
          lightBlue: '#41B6E6',
          aquaGreen: '#00A499',
          green: '#009639',
          yellow: '#FFB81C',
          orange: '#ED8B00',
          red: '#DA291C',
          text: '#212B32',
          secondaryText: '#425563',
          borderGrey: '#768692',
          background: '#F0F4F5',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        accessible: ['Atkinson Hyperlegible', 'Arial', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'Arial', 'sans-serif'],
        bengali: ['Noto Sans Bengali', 'Arial', 'sans-serif'],
        gurmukhi: ['Noto Sans Gurmukhi', 'Arial', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'Arial', 'sans-serif'],
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      }
    },
  },
  plugins: [],
}
