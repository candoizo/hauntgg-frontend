const glob                   = require('glob');
const path                   = require('path');
const {merge}                  = require('webpack-merge');
const PurgeCssPlugin         = require('purgecss-webpack-plugin');
const HtmlWebpackPlugin      = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const purgeFromTailwind = content => content.match(/[\w-/:]+(?<!:)/g) || [];

const common = require('./webpack.config.js');
module.exports = merge(common, {
  mode: 'production',


  // optimization: {
  //   // splitChunks: {
  //   //   chunks: 'all',
  //   //   name: 'vendor'
  //   // },
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       test: /\.js(\?.*)?$/i,
  //       terserOptions: {
  //         sourceMap: true,
  //         ecma: "2018",
  //         format: {
  //           // comments: false,
  //         },
  //         warnings: true,
  //         mangle: true,
  //         compress: {
  //           passes: 2,
  //           drop_console: true
  //         }
  //       },
  //       extractComments: false,
  //     }),
  //   ],
  // },
  // output: {
  //   path: path.resolve(__dirname, './dist/'),
  //   publicPath: "/dist/",
  //   // filename: "[contenthash].bundle.js",
  //   library: "bin",
  // },

  watch: true,
  // devtool: false,

  plugins: [

    new CleanWebpackPlugin(),

    new PurgeCssPlugin({
      paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`, { nodir: true }),
      extractors: [
        {
          extractor: purgeFromTailwind,
          extensions: ['html', 'js']
        },
      ]
    }),

    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'src/html/index.html',
    //   minify: {
    //     collapseWhitespace: true,
    //     removeComments: true,
    //     removeRedundantAttributes: true,
    //     removeScriptTypeAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     useShortDoctype: true
    //   },
    // }),


    new WebpackManifestPlugin({
      fileName: "data/webpack.manifest.json"
    }),

  ],
});
