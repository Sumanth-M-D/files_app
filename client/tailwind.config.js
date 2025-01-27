/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7E22CE",
        secondary: "#f5f6f9",
        black: "#333333",
        white: "#fff",
      },
      screens: {
        xxxs: "375px",
        xxs: "435px",
        xs: "528px",
        upperMd: "900px",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  plugins: [],
};
