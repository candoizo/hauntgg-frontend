const {
  colors
} = require('tailwindcss/defaultTheme');
let formatcolors = {
  "black": "#000",
  "white": "#FFF",
  "gotchi-purple" : "#7217F4",
  "gotchi-pink" : "#FA34F3",
  "godlike" : "",
  "mythical" :"",
  "legendary" : "",
  "rare":"",
  "uncommon": "",
  "common":""
};
Object.keys(colors).map((key) => {
  if (Object.keys(colors[key])) {
    let keycolor = colors[key];
    if (keycolor['100']) {
      Object.entries(keycolor).map(([k, v]) => {
        formatcolors[`${key}-${k}`] = v;
      });
    }
  }
});
module.exports = {
  experimental: {
    darkModeVariant: true
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: false,
  plugins: [
    // require('@tailwindcss/typography'),
    require('@tailwindcss/custom-forms'),
    // require('tailwindcss-children'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-color-vars')({
      strategy: 'extend',
    }),
    require('tailwindcss-debug-screens')
  ],
  colors: formatcolors,
  fonts: {
    'sans': [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ],
    'serif': [
      'Constantia',
      'Lucida Bright',
      'Lucidabright',
      'Lucida Serif',
      'Lucida',
      'DejaVu Serif',
      'Bitstream Vera Serif',
      'Liberation Serif',
      'Georgia',
      'serif',
    ],
    'mono': [
      'Menlo',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ]
  },
  // fixing some pug specific issues
  prefix: "",
  separator: "__",
  theme: {
    extend: {
      variants: {
        display: ['children', 'default', 'children-first', 'children-last', 'children-odd', 'children-even', 'children-not-first', 'children-not-last', 'children-hover', 'hover', 'children-focus', 'focus', 'children-focus-within', 'focus-within', 'children-active', 'active', 'children-visited', 'visited', 'children-disabled', 'disabled', 'responsive'],
      },
      animation: {
        "bg-pan-left": "bg-pan-left 8s ease-in-out infinite alternate both"
      },
      keyframes: {
        "bg-pan-left": {
          '0%, 100%': {
            "background-position": "100% 50%",
          },
          '50%': {
            "background-position": "0% 50%"
          }
          // "background-position": "100% 50%",
          // "background-position": "0% 50%"
        }
      },
      screens: {
        'dark': {
          raw: '(prefers-color-scheme: dark)'
        }
      },
      colors: colors,
      width: {
        '1_2': '50%',
        '1_3': '33.333333%',
        '2_3': '66.666667%',
        '1_4': '25%',
        '2_4': '50%',
        '3_4': '75%',
        '1_5': '20%',
        '2_5': '40%',
        '3_5': '60%',
        '4_5': '80%',
        '1_6': '16.666667%',
        '2_6': '33.333333%',
        '3_6': '50%',
        '4_6': '66.666667%',
        '5_6': '83.333333%',
        '1_12': '8.333333%',
        '2_12': '16.666667%',
        '3_12': '25%',
        '4_12': '33.333333%',
        '5_12': '41.666667%',
        "11_24" : '45%',
        '6_12': '50%',
        '7_12': '58.333333%',
        '8_12': '66.666667%',
        '9_12': '75%',
        '10_12': '83.333333%',
        '11_12': '91.666667%',
      }
    },
  },
}
