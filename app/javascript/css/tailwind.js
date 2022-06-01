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
      colors: {
        "gavel-blue": "#0066CC",
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
