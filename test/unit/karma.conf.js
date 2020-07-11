const webpackConfig = require('../../build/webpack.test.js');

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],

    files: [
      './index.js',
    ],
    // plugins: [
    //   'karma-webpack', 'karma-coverage',
    // ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
      ],
    },

    browsers: ['Chrome', 'Safari'],
  });
};
