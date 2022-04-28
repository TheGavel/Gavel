// "./app/helpers/**/*.rb",
// "./app/javascript/**/*.js?",
// "./app/views/**/*.{erb,haml,html,slim}",

// "app/helpers/**/*.rb",
// "app/javascript/**/*.jsx",
// "app/views/**/*.{erb,haml,html,slim}",
const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  purge: [
"app/helpers/**/*.rb",
"app/javascript/**/*.jsx",
"app/views/**/*.{erb,haml,html,slim}",
  ],
  variants: {
    extend: {
        borderStyle: ["responsive", "hover"],
        fontSize: ['responsive',"group-hover"], //加入 group-hover
    },
},
  theme: {
    tabSize: {
      1: '1',
      2: '2',
      "30px": "30",
      "36px": '32px'
    },
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
        'fit-250' : 'repeat(auto-fit, minmax(250px , 1fr))',
        // size: var(--fontSize);
      },
      gridTemplateRows: {
        'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
  plugin(function({ matchUtilities, theme }) {
    matchUtilities(
      {
        gridfit: (value) => ({
          "grid-template-columns": `repeat(auto-fit, minmax(${value}, 1fr))`
        }),
      },
      { values: theme('width') }
    )
  })

],
};
