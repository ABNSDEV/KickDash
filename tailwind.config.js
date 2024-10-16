/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d1d1d',
        secondary: '#8ac44d',
        text: '#fff',
        text2: '#f5f5f5',
      },
    },
  },
  plugins: [],
}
