module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        "primary-dark": "var(--primary-dark)",
        "primary-gray": "var(--primary-gray)",
        "primary-gray-dark": "var(--primary-gray-dark)",
        "primary-gray-darker": "var(--primary-gray-darker)",
        "primary-light": "var(--primary-light)",
        "theme-red": "var(--theme-red)",
        "theme-red-active": "var(--theme-red-active)",
      },
      fontFamily: {
        sans: ["var(--font-main)"],
        icons: ["var(--font-icons)"],
        display: ["var(--font-display)"],
      },
    },
  },
};
