const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  purge: [
    "app/helpers/**/*.rb",
    "app/javascript/**/*.jsx",
    "app/views/**/*.{erb,haml,html,slim}",
  ],
  variants: {
    extend: {},
  },
  theme: {
    extend: {
      colors: {
        "gavel-blue": "#0066CC"
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(10deg)' },
          '20%': { transform: 'rotate(-6deg)' },
          '30%': { transform: 'rotate(10deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(8.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      animation: {
        'waving': 'wave 1.5s ease-in-out 1',
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(0, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(0, 1fr))",
        "fit-250": "repeat(auto-fit, minmax(250px , 1fr))",
      },
      gridTemplateRows: {
        "auto-fit": "repeat(auto-fit, minmax(0, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(0, 1fr))",
      },
      zIndex: {
        1: "1",
        100: "100",
      },
      flexGrow: {
        '2': 2
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          gridfit: (value) => ({
            "grid-template-columns": `repeat(auto-fit, minmax(${value}, 1fr))`,
          }),
        },
        { values: theme("width") }
      );
    }),
  ],
};