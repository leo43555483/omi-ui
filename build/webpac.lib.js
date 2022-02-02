const merge = require('webpack-merge')
const getBaseConfig = require('./webpack.base')
const utils = require('./utils')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

exports.getLibEntryWebpackConf = function(minimize = false) {
  return merge(getBaseConfig(), {
    entry: {
      [config.LIB_NAME]: utils.resolvePathFromRoot('src/index.js')
    },
    output:{
      path: utils.resolvePathFromRoot('./lib'),
      filename: minimize ? '[name].min.js' : '[name].js',
      library: config.LIB_NAME,
      umdNamedDefine: true,
      libraryTarget: 'umd',
      globalObject: "(typeof self !== 'undefined' ? self : this)",
    },
    devtool: "source-map",
    optimization: {
      minimize,
    },
    plugins: [
      // new BundleAnalyzerPlugin()
      new MiniCssExtractPlugin({
        filename: 'style/[name].css'
      })
    ]
  })
}

exports.getCjsWebpackEntry = function (entries) {
  return merge(getBaseConfig(), {
    entry: {
      ...entries
    },
    output:{
      path: utils.resolvePathFromRoot('./lib'),
      filename: '[name]/index.js',
      umdNamedDefine: true,
      libraryTarget: 'umd',
      globalObject: "(typeof self !== 'undefined' ? self : this)",
    },
    devtool: false,
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style/[name].css'
      })
    ]
  })
}
