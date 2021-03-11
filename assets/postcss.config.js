const postcss_preset_env = require('postcss-preset-env');
const tailwindcss = require('tailwindcss')({
  config: "./assets/tailwind.config.js"
});
const uncss = require('postcss-uncss');
const css_declaration_sorter = require('css-declaration-sorter');
const autoprefixer = require('autoprefixer'); // @TODO: test if preset_env does this automatically
// const hugo_html_elements = require('../hugo_stats').htmlElements;
// let items = [].concat([], ...Object.values(hugo_html_elements));

// require("debug")("*")(process.env);

module.exports = {
  plugins: [
    postcss_preset_env,
    tailwindcss,
    ...process.env.HUGO_ENVIRONMENT === 'release' ? [
      uncss({
        html: [
          // '../public/**.html',
        //   // 'public/post/index.html',
        //   // 'public/post/markdown-syntax/index.html'
        //   //'./layouts/**/*.html',
          './test/404.html',
          './test/portals/closed/index.html',
          './test/portals/opened/index.html',
          './test/wearables/index.html',
          './test/consumables/index.html',
          './test/index.html',
        //   // './layouts/_default/*.html',
        //   // './layouts/partials/*.html'
          // './test/index.html',
        //   '../test/*.html',
        //   '../test/portals/**/index.html',
        //   // './test/post/markdown-syntax/index.html',
        ],
        report: true,
        htmlroot: "./test/",
        ignoreSheets: [
          /sw.+.js/,
          /manifest/
        ],
        ignore: [
          // items
          // /\*/,
          `html[data-theme='dark']`,
          ':root',
          '.hide'
          // ...hugo_html_elements.tags,
          // ...hugo_html_elements.classes.map((e) => '.' + e),
          // ...hugo_html_elements.ids.map((e) => '#' + e),
          // hugo_html_elements.classes,
          // hugo_html_elements.ids
          // /.+chroma+/g,
          // /.+medium-zoom+/g,
          // /.+markdown+/g,
          // /.+pagination+/g,
          // /.+tag+/g,
          // /.tag+/g,
          // '.post-footer'
        ]
      }),
      autoprefixer, // present_env is supposed to apply this, idk
      css_declaration_sorter,
    ] : [] // save dev time by avoiding optimization
  ]
}
