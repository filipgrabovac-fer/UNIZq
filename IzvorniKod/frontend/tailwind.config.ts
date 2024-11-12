/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111D4A",
        secondary: "#d9d9d9",
        gray: "#52525C",
        red: "red",
        error: "red",
        black: "black",
        gray_border: "#D9D9D9",
        gray_hover: "#F2F2F2",
      },
      fontSize: {
        xs: 10,
        sm: 14,
        md: 18,
        lg: 24,
        xl: 30,
        xxl: 40,
        xxxl: 50,
      },
    },
  },
  plugins: [],
};
