/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-lighter": "var(--background-lighter)",
        surface: "var(--surface)",
        "surface-lighter": "var(--surface-lighter)",
        positive: "var(--positive)",
        foreground: "var(--foreground)",
        "foreground-lighter": "var(--foreground-lighter)",
      },
    },
  },
  plugins: [],
};
