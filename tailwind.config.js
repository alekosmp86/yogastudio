/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    /*extend: {
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
    },*/
    extend: {
      colors: {
        // Brand Core
        primary: {
          DEFAULT: "#2A84A6",
          hover: "#236C88",
          soft: "#E3F3F8",
        },
        secondary: {
          DEFAULT: "#F2A13A",
          hover: "#D78525",
          soft: "#FFF4E6",
        },

        // Wellness Accents
        accent: {
          mint: "#7CCFB5",
          lavender: "#B7A7DA",
          peach: "#F7C4B2",
        },

        // Semantic UI
        success: {
          DEFAULT: "#3B9B72",
          soft: "#E7F6EF",
          text: "#1F5A41",
        },
        warning: {
          DEFAULT: "#D98E04",
          soft: "#FFF7E1",
          text: "#5C4200",
        },
        error: {
          DEFAULT: "#C44545",
          soft: "#F9E9E9",
          text: "#6A1F1F",
        },

        // Typography
        textcolor: {
          primary: "#1B1B21",
          secondary: "#4A4D52",
          muted: "#7B7F85",
          ondark: "#F5F6F8",
        },

        // UI Surfaces (Light Mode)
        surface: {
          app: "#EEF2F4",
          section: "#F6F8FA",
          card: "#FFFFFF",
          input: "#FAFBFC",
          navbar: "#FFFFFF",
          border: "#C9CED6",
          divider: "#DDE1E6",
        },

        // Dark Mode (optional)
        darksurface: {
          app: "#0E1114",
          surface: "#161A1E",
          card: "#1D2227",
          border: "#2B3138",
          divider: "#23292E",
        },
      },

      // Shadows for a professional UI feel
      boxShadow: {
        card: "0 2px 6px rgba(0,0,0,0.05)",
        elevated: "0 6px 18px rgba(0,0,0,0.12)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
