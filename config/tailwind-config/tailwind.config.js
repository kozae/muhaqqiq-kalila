module.exports = {
  content: [
    "../../lib/client-components/**/*.tsx",
    "./**/*.tsx",
    "./**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabicnoto: ["'Noto Naskh Arabic'", "serif"],
        arabicamiri: ["'Amiri'", "serif"],
      },
      colors: {
        primary: {
          50: "#f2f5f7",
          100: "#dbe1e6",
          200: "#b6c3ce",
          300: "#91a5b6",
          400: "#677f93",
          500: "#1b2e3c",
          600: "#192834",
          700: "#141f28",
          800: "#101920",
          900: "#0a0f13",
        },
        secondary: {
          50: "#fbfbe6",
          100: "#f6f6cc",
          200: "#eeeda3",
          300: "#e6e57a",
          400: "#d9d24c",
          500: "#F0EF3C",
          600: "#c7c329",
          700: "#9e981f",
          800: "#767015",
          900: "#4d4d0a",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
  ],
};
