const path = require('path');
const config = require('../config');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {},
  output:{},
  resolve:{
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    }
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
          cacheDirectory: true,
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
          name: 'fonts/[name].[hash:7].[ext]',
        }
      }
    ]
  },
  performance: {
    hints: false
  },
}
