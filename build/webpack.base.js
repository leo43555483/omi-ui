const path = require('path');
module.exports = {
  entry: {},
  output:{},
  resolve:{},
  module:{
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|jsx|js)$/,
        exclude: /node_modules/,
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
        exclude: /node_modules/,
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
        query: {
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
