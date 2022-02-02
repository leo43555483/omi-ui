const merge = require('webpack-merge')
const getBaseConfig = require('./webpack.base')
const utils = require('./utils')

module.exports = function (entries) {
  return merge(getBaseConfig(), {
    entry: {
      ...entries
    },
    output:{
      path: utils.resolvePathFromRoot('es'),
      filename: '[name]/index.js',
      module: true,
      // chunkFormat: 'module',
      // library: {
      //   type: 'module',
      // }
    },
    externals: ['vue'],
    experiments: {
      outputModule: true,
    },
    devtool: false,
    optimization: {
      minimize: false,
    },
    target: ['web','es2020']
  })
}
