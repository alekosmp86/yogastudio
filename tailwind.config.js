/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#BA6E6E", //Warm accent — events, important notes, small highlights
          200: "#7AA08A", //Highlight color — success states, active states, CTA accent
          300: "#6D6766", //Soft neutral accent / buttons / tags.
          400: "#A4A3A6", //Secondary text, icons, muted labels.
          500: "#D6D6DA", //Lightest gray — headings, bright text.
          600: "#2C323A", //Borders, dividers, input outlines.
          700: "#1A222C", //Secondary background (panels, cards).
          800: "#0F151B", //Primary app background — calm, modern, immersive.
        },
      },
    },
  },
  plugins: [],
};
