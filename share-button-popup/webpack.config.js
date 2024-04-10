const HtmlWebPackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});
module.exports = {
  mode: 'production',
  // devServer: {
  //   static: path.join(__dirname, "dist"),
  //   port: 3003,
  //   historyApiFallback:{
  //     index:'/public/index.html'
  //   },
  //   setup: function (devServer) {
  //     devServer.app.get(/\.br$/, (req, res, next) => {
  //       req.url = req.url + '.gz.br';
  //       res.set('Content-Encoding', 'br');
  //       next();
  //     });
  //   },
  // },
  output: {
    path: path.join(__dirname, "build"),
    filename: "sharePopup.[contenthash].js",
    clean: true
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
},
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }
    ]
  },
  plugins: [
    htmlPlugin,
    new ModuleFederationPlugin({
      name: "SharePopup",
      filename: "sharePopup.js",
      exposes: {
        "./Button": "./src/Button"
      }
    }),
    new CompressionPlugin({
      filename: "[file].br",
      algorithm: "brotliCompress",
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      // exclude: /.map$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  ]
};