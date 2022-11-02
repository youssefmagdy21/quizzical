/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      color: {
        bgClr: "#F5F7FB",
        textClr: "#293264",
        btnClr: "#4D5B9E",
      },
      fontFamily: {
        inter: "Inter",
        karla: "Karla",
      },
    },
  },
  plugins: [],
};
