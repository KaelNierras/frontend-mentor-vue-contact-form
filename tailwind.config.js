/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          200: 'hsl(148, 38%, 91%)',
          550: 'hsl(169, 82%, 30%)',
          600: 'hsl(169, 82%, 27%)',
          red: 'hsl(0, 66%, 54%)',
        },
        neutral: {
          white: 'hsl(0, 0%, 100%)',
          500: 'hsl(186, 15%, 59%)',
          900: 'hsl(187, 24%, 22%)',
        },
      },
      fontSize: {
        base: '16px',
      },
      screens: {
        'mobile': '375px',
        'desktop': '1440px',
      },
      fontFamily: {
        'karla': ['Karla', 'sans-serif'],
      },
      fontWeight: {
        normal: 400,
        bold: 700,
      },
    },
  },
  plugins: [],
}

