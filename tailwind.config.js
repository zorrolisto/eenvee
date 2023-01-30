/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{svelte,js}"],
  theme: {
    extend: {
      colors: {
        indigo: { 700: "#B67429", 800: "#623D15" },
      },
    },
  },
  plugins: [],
};
