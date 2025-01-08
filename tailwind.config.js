/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      background: "var(--background)",
      surface: "var(--surface)",
      surfaceLighter: "var(--surface-lighter)",
      positive: "var(--positive)",
      foreground: "var(--foreground)",
    },
  },
  plugins: [],
};
