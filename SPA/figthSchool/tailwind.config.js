/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        preto: {
          DEFAULT: "#121212",
          100: "#1E1E1E",
          200: "#2A2A2A",
          300: "#3A3A3A",
          text: "#F5F5F5",
        },
        vermelho: {
          DEFAULT: "#D7263D",
          100: "#FF4E5B",
          200: "#B91C2C",
          text: "#FFF1F1",
        },
        amarelo: {
          DEFAULT: "#FFCE00",
          100: "#FFE44D",
          200: "#CCAA00",
          text: "#1A1A1A",
        },
      },
    },
  },
  plugins: [],
};
