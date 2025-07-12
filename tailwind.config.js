/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey01: "#141414",
        grey02: "#999999",
        purple01: "#703BF7",
      },
    },
  },
  plugins: [],
};
