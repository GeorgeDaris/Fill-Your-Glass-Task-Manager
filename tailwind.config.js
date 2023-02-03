/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accentColor: "#7C94D2",
        bgColor: "white",
        textColor: "#283453",
        accentLight: "#89a4e9",
        lightGrey: "#EAEDF5",
        darkBg: "#1D212A",
        darkText: "#E7ECF8",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
