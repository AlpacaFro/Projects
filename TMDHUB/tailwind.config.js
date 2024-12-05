/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#111111",
        dimGray: "#707078",
        crime: "#b6c6f7",
        drama: "#dd9b55",
        comedy: "#E8CFDF",
        family: "#00FF00",
        fantasy: "#BD90D7",
        romance: "#FFC9FF",
        rateFive: "#ffb366",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
