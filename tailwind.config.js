module.exports = {
  content: ["./client/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  darkMode: "media",
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        grey: "#f5f5f7",
        tomato: "#f45b5b",
      },
      fontFamily: {
        button: "Baloo Bhai",
        tapestry: "Tapestry",
        h1: "'Baloo Bhai'",
      },
      borderRadius: {
        sm: "14px",
        "10xs": "3px",
      },
    },
    fontSize: {
      smi: "13px",
      "45xl": "64px",
      base: "16px",
      "17xl": "36px",
      "5xl": "24px",
    },
  },
  corePlugins: {
    preflight: false,
  },
};


