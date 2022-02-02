const config = require('../config')
const utils = require('./utils')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = function() {
  return {
    mode: 'production',
    resolve:{
      extensions: ['.js', '.vue', '.json', '.jsx'],
      alias: {
        '@': utils.resolvePathFromRoot('src'),
      }
    },
    externals:{
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      },
    },
    module:{
      rules: [
        {
          enforce: 'pre',
          test: /\.(vue|jsx|js)$/,
          exclude: config.jsexclude,
          loader: 'eslint-loader'
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        },
        {
          test: /\.(js|jsx?)$/,
          loader: 'babel-loader',
          options: {
            cacheCompression: false,
            sourceMap: true,
          },
          exclude: config.jsexclude,
        },
        {
          test: /\.(scss|css)$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'statics/[name].[hash:7].[ext]',
          }
        }
      ]
    },
    performance: {
      hints: false
    },
    plugins: [
      new ProgressBarPlugin(),
      new VueLoaderPlugin()
    ]
  }
}
