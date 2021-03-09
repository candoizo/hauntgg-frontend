const postcss_preset_env = require('postcss-preset-env');
const tailwindcss = require('tailwindcss')({
  config: "./assets/tailwind.config.js"
});
const uncss = require('postcss-uncss');
const css_declaration_sorter = require('css-declaration-sorter');
const autoprefixer = require('autoprefixer'); // @TODO: test if preset_env does this automatically
// const hugo_html_elements = require('../hugo_stats').htmlElements;
// let items = [].concat([], ...Object.values(hugo_html_elements));
module.exports = {
  plugins: [
    postcss_preset_env,
    tailwindcss,
    ...process.env.NODE_ENV === 'release' ? [
      uncss({
        html: [
          // 'public/*.html',
          // 'public/post/index.html',
          // 'public/post/markdown-syntax/index.html'
          //'./layouts/**/*.html',
          // './layouts/404.html',
          // './layouts/_default/*.html',
          // './layouts/partials/*.html'
          //'./test/**/*.html',
          './test/*.html',
          './test/post/index.html',
          './test/post/markdown-syntax/index.html',
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
          // ...hugo_html_elements.tags,
          // ...hugo_html_elements.classes.map((e) => '.' + e),
          // ...hugo_html_elements.ids.map((e) => '#' + e),
          // hugo_html_elements.classes,
          // hugo_html_elements.ids
          /.+chroma+/g,
          /.+medium-zoom+/g,
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
