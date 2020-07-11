module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: ['prettier'],
  rules: {
    'func-names': 'off',
    'no-param-reassign': ['error', { props: false }],
    "max-len": ["error", {"code": 200, "ignoreUrls": true}],
    'no-restricted-syntax': 0,
    'import/export': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  overrides: [
    {
      files: ['**/__test__/*.{j,t}s?(x)', '**/test/unit/**/*.spec.{j,t}s?(x)'],
      // env: {
      //   jest: true,
      // },
    },
  ],
};
