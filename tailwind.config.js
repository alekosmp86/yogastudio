/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Core
        primary: {
          DEFAULT: "#236C88",
          hover: "#6096B4",
          soft: "#93BFCF",
        },
        secondary: {
          DEFAULT: "#A08963",
          hover: "#C9B194",
          soft: "#C9B194",
        },
        negative: {
          DEFAULT: "#ce0303",
          hover: "#c54141",
          soft: "#c54141",
        },

        // Wellness Accents
        accent: {
          mint: "#7CCFB5",
          lavender: "#B7A7DA",
          peach: "#F7C4B2",
        },

        // Semantic UI
        success: {
          DEFAULT: "#609966",
          soft: "#9DC08B",
          text: "#EDF1D6",
        },
        warning: {
          DEFAULT: "#E5890A",
          soft: "#F7D08A",
          text: "#FAFAFA",
        },
        error: {
          DEFAULT: "#6A1F1F",
          soft: "#C68484",
          text: "#EEEEEE",
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
          app: "#001524",
          section: "#313647",
          card: "#435663",
          input: "#889EAF",
          navbar: "#506D84",
          border: "#B2C9AD",
          divider: "#DDE1E6",
          white: "#FFFFFF",
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
