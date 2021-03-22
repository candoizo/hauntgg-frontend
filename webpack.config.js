const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {
  GenerateSW
} = require('workbox-webpack-plugin');
const PUBLIC_PATH = 'https://haunt.gg/'; // webpack needs the trailing slash for output.publicPath

const webpack = require('webpack');

const path = require("path");
const glob = require('glob');
const env = process.env.NODE_ENV;
const PATHS = {
  src: path.join(__dirname, 'src')
}

const pug_files = () => {
  let files = glob.sync(`${path.resolve('.', 'src')}/pug/**/*.pug`, {
    nodir: true
  }).map(
    src => {

      let rel = src.split("src/pug/");
      let dest = rel[rel.length - 1].replace("pug", "html");
      return new HtmlWebpackPlugin({
        filename: "layouts/" + dest,
        template: src,
        inject: false, // maybe unless last index after / === 'partials/head.html'
        minify: false // breaks build, pointless since its just hugo .html
      });
    });
  return files
};

const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === 'release' ? 'production' : 'dev',
  // writeToDisk: true,
  // watch: true,
  entry: './src/webpack.js',

  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: "/", //'/js/',
    filename: "assets/" + (env === 'development' ? 'js/bundle.js' : 'js/bundle.js'),
    chunkFilename: 'js/[name].[contenthash].min.js', //(env === 'development' ? 'js/[name].js' : './static/js/static/js/[name].[contenthash].min.js'),
    clean: true,
    library: "EntryPoint"
  },

  // target: "es2021",
  target: "web",

  optimization: {
    // splitChunks: {
    //   chunks: 'all',
    //   name: 'vendor'
    // },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          sourceMap: true,
          ecma: "2018",
          format: {
            // comments: false,
          },
          warnings: true,
          mangle: true,
          compress: {
            passes: 2,
            drop_console: true
          }
        },
        extractComments: false,
      }),
    ],
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader'
      //   }
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          env === 'development' ? 'style-loader' :
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: true
            }
          },
        ]
      },


      {
        test: /\.pug$/,
        include: path.resolve(__dirname, 'src/pug'),
        use: [
          "raw-loader",
          "pug-html-loader"
        ]
      },

      // doesnt work properly for osme reason
      // {
      //   test: /\.(jpe?g|png|gif|svg|webp)$/,
      //   include: path.resolve(__dirname, 'src/assets'),
      //   use: [{
      //     loader: 'raw-loader',
      //   }, {
      //     loader: 'image-webpack?bypassOnDebug',
      //     options: {
      //       disable: true,
      //       mozjpeg: {
      //         progressive: true,
      //       },
      //       // optipng.enabled: false will disable optipng
      //       optipng: {
      //         enabled: false,
      //       },
      //       pngquant: {
      //         quality: [0.65, 0.90],
      //         speed: 4
      //       },
      //       gifsicle: {
      //         interlaced: false,
      //       },
      //       // the webp option will enable WEBP
      //       webp: {
      //         quality: 75
      //       }
      //     },
      //   }, ]
      // },

      {
        test: /\.(gif|png|jpg)$/,
        use: 'url-loader?limit=8192'
      } // inline base64 URLs for <=8k images, direct URLs for the rest
    ],
  },

  plugins: [

    new webpack.IgnorePlugin(/^\.\/wordlists\//,),
    new WebpackBuildNotifierPlugin(),

    // new SWPrecacheWebpackPlugin(
    //   {
    //     cacheId: 'hauntgg-v2',
    //     dontCacheBustUrlsMatching: /\.\w{8}\./,
    //     filename: 'service-worker.js',
    //     minify: true,
    //     navigateFallback: PUBLIC_PATH + 'index.html',
    //     staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    //   }
    // ),

    // new GenerateSW({
    //   exclude: [
    //     /assets.+/gi,
    //     /layouts.+/gi,
    //   ]
    // }),

    new MiniCssExtractPlugin({
      // maybe do output with no name so ican import , fingerprint on hugo
      // 'assets/css/[name].css'

      filename: 'assets/css/[name].css'
      // filename: 'css/[name].[contenthash].min.css'
    }),

    // new PurgeCSSPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    // }),

    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'src/html/index.html'
    // }),

    // new HtmlWebpackPlugin({
    //   filename: 'layouts/test.html',
    //   template: 'src/pug/test.pug'
    // }),

    ...pug_files(),

    new CopyPlugin({
      patterns: [{
          from: "./src/images/",
          to: "./assets/"
        },
        // {
        //   from: "./dist/layouts/",
        //   to: "../layouts/" // overwrite old layouts with new pug
        // },
      ],
    })

  ],
}
