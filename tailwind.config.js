module.exports = {
  content: ["./client/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  darkMode: "media",
  theme: {
    extend: {
      colors: {
        blue: {
          light: "#87ceeb",
          DEFAULT: "#0070f3",
          dark: "#0000ff",
        },
      },
      gradientColorStops: {
        blue: {
          light: "#87ceeb",
          DEFAULT: "#0070f3",
          dark: "#0000ff",
        },
      },
      gradientColors: {
        blue: "var(--gradient-blue)",
      },
    },
  },
  variants: {},
  plugins: [],
};
