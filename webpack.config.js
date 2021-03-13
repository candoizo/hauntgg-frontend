const path = require('path');

module.exports = {
  entry: {
    // polyfill: 'babel-polyfill',
    app: './assets/js/webpack/bootstrap.js',
  },
  output: {
    path: path.resolve(__dirname, './static/dist/'),
    publicPath: "/dist/",
    filename: "[name].bundle.js",
    library: "EntryPoint",
		// umdNamedDefine: false
  },
	// optimization: {
	// 	concatenateModules: false,
	// 	providedExports: false,
	// 	usedExports: false
	// },
  mode: 'production',
  // module: {
  //   rules: [{
  //     test: /\.js$/,
  //     exclude: "/home/jong/Code/web/coinvanity-gitlab/coinvanity-frontend/node_modules/",
  //     use: {
  //       loader: 'babel-loader',
  //       // options: {
  //         // presets: ['env'],
  //       // },
  //     },
  //   }, ]
  // },
  // module: {
  plugins: [
    // new webpack.IgnorePlugin(/^\.\/wordlists\/(?!english)/, /bip39\/src$/),
    // // new require('threads-plugin')(),
    // // new webpack.ProvidePlugin({
    // //         'Promise': 'bluebird'
    // //     }),
  ]
};
