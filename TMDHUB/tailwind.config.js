/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background:'#111111',
        dimGray:'#707078',

      }
    },
  
  },
  plugins: [require('tailwind-scrollbar-hide')],
  
}
