module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', { libraryName: 'omi', styleLibraryDirectory: 'es/style', libraryDirectory: 'es' }]
  ]
}
