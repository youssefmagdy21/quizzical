/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgClr: "#F5F7FB",
        textClr: "#293264",
        btnClr: "#4D5B9E",
        chooseClr: "#D6DBF5",
        correctAnswer: "#94D7A2",
        wrongAnswer: "#F8BCBC",
        borderClr: "#DBDEF0",
      },
      fontFamily: {
        inter: "Inter",
        karla: "Karla",
      },
      fontSize: {
        xxs: "0.625rem",
      },
    },
  },
  plugins: [],
};
