const postcss_preset_env = require('postcss-preset-env');
const tailwindcss = require('tailwindcss')({
  config: "./assets/tailwind.config.js"
});
const uncss = require('uncss').postcssPlugin;
const css_declaration_sorter = require('css-declaration-sorter');
const autoprefixer = require('autoprefixer'); // @TODO: test if preset_env does this automatically

module.exports = {
  plugins: [
    postcss_preset_env,
    tailwindcss,
    ...process.env.HUGO_ENVIRONMENT === 'release' ? [
      uncss({
        timeout: 3,
        html: [
          './test/404.html',
          './test/portals/closed/index.html',
          './test/portals/opened/index.html',
          './test/wearables/index.html',
          './test/consumables/index.html',
          './test/index.html'
        ],
        report: true,
        htmlroot: "./test/", // prebuild of final css classes is outputting in test
        ignoreSheets: [
          /sw.+.js/,
          /manifest/,

        ],
        ignore: [
          `html[data-theme='dark']`,
          ':root',
          /.+hide+/g,
        ]
      }),
      autoprefixer, // present_env is supposed to apply this, idk
      css_declaration_sorter,
    ] : [] // save dev time by avoiding optimization
  ]
}
