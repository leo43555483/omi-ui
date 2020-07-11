const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBase = require('./webpack.base');
const resolve = path.resolve;
module.exports = merge(webpackBase, {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: {
    app: resolve(__dirname, '../examples/main'),
  },
  output: {
    path: resolve(__dirname, '../examples/dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    port: 8888,
    open: true,
    publicPath: '/',
    hot: true,
  },
  resolve: {
    alias: {
      // 'omi-ui': resolve(__dirname, '../src'),
      vue: 'vue/dist/vue.js',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      filename: './index.html',
      template: resolve(__dirname, '../examples/public/index.html'),
    }),
    new FriendlyErrorsPlugin(),
  ],
});
if (process.env.NODE_ENV === 'test') {
  module.exports.externals = [require('webpack-node-externals')()];
  module.exports.devtool = 'eval';
}
