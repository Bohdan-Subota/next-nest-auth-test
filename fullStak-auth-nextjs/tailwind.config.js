/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        "copy-primary": "rgb(var(--copy-primary))",
        cta: "rgb(var(--cta))",
        border: "rgb(var(--border))",
        card: "rgb(var(--card))",
      },
    },
  },
  plugins: [],
};
