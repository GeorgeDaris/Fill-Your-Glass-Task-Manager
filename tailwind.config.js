/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accentColor: "rgb(var(--accent-color) / <alpha-value>)",
        bgColor: "rgb(var(--bg-color) / <alpha-value>)",
        textColor: "rgb(var(--text-color) / <alpha-value>)",
        accentLight: "rgb(var(--accent-light) / <alpha-value>)",
        lightGrey: "rgb(var(--light-grey) / <alpha-value>)",
        lightDark: "rgb(var(--light-dark) / <alpha-value>)",
        hrDark: "rgb(var(--hr-dark) / <alpha-value>)",
        darkBg: "rgb(var(--dark-bg) / <alpha-value>)",
        darkText: "rgb(var(--dark-text) / <alpha-value>)",
        hrDarkOdd: "rgb(var(--hr-dark-odd) / <alpha-value>)",
      },
      // colors: {
      //   accentColor: "#7C94D2",
      //   bgColor: "white",
      //   textColor: "#283453",
      //   accentLight: "#89a4e9",
      //   lightGrey: "#EAEDF5",
      //   lightDark: "#343945",
      //   hrOdd: "#F5EAF0",
      //   darkBg: "#1D212A",
      //   darkText: "#E7ECF8",
      //   hrDarkOdd: "#403C40",
      // },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        gfsDidot: ["GFS Didot", "serif"],
        raleway: ["Raleway", "sans-serif"],
        monoton: ["Monoton", "cursive"],
      },
      keyframes: {
        waves: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-50%) scaleY(120%)" },
          "100%": { transform: "translateX(0%) scaleY(100%)" },
        },
      },
      animation: {
        waves: "waves 20s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
