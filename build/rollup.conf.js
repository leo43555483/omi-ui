const {nodeResolve} = require('@rollup/plugin-node-resolve')
const chalk = require('chalk')
const commonjs = require('@rollup/plugin-commonjs')
const analyze = require('rollup-plugin-analyzer')
const babel = require('rollup-plugin-babel')
const rollupVue = require('rollup-plugin-vue')
const { terser } = require('rollup-plugin-terser')
const {resolvePathFromRoot, formatBytes} = require('./utils')
const {LIB, ESMODULE, LIB_NAME} = require('../config')
function getExternals() {
  const pkg = require(resolvePathFromRoot('package.json'))
  const packages = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]
  return packages.map(packageName => new RegExp(`^${packageName}(\/.*)?`))
}


function onAnalysis(name) {
  return function ({bundleSize, modules}){
    console.log(chalk.green(`\n🎧 ${name} bundle analysis: \n`))
    modules.forEach(({id, size}) => {
      console.log(chalk.yellowBright(`[${name}:component] - size:${formatBytes(size)} ${id}`))
    })
    console.log(chalk.green('\n--------------------------------'))
    console.log(chalk.green('total size: '+ formatBytes(bundleSize) + '\n'))
  }
}

const baseConfig = {
  external: getExternals(),
  plugins:[
    rollupVue({
      css: false
    }),
    nodeResolve({ extensions: ['.vue', '.js', '.jsx', '.ts'] }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      externalHelpers: true,
    }),
    commonjs(),
  ]
}
function concatAnalysis(baseConfig, name) {
  const analysis = onAnalysis(name)
  return baseConfig.plugins.concat([analyze({skipFormatted: true, onAnalysis:analysis})])
}

function getUmdConfig() {
  const outputPath = `${LIB}/${LIB_NAME}`
  return Object.assign(baseConfig, {
    input: resolvePathFromRoot('src/index.js'),
    output: [
      {
        name: LIB_NAME,
        file: resolvePathFromRoot(`${outputPath}.js`),
        format: 'umd'
      },
      {
        name: LIB_NAME,
        file: resolvePathFromRoot(`${outputPath}.min.js`),
        plugins: [terser()],
        format: 'umd'
      }
    ],
    // plugins: concatAnalysis(baseConfig, 'umd')
  })
}

function getCompConfig(entry) {
  const preserveModulesRoot = resolvePathFromRoot('package')
  return Object.assign(baseConfig, {
    input: {
      index: entry
    },
    treeshake: true,
    output: [
      {
        dir: resolvePathFromRoot(LIB),
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot,
        format: 'cjs',
      },
      {
        dir: resolvePathFromRoot(ESMODULE),
        exports: 'auto',
        preserveModules: true,
        preserveModulesRoot,
        format: 'es'
      }
    ],
    // plugins: concatAnalysis(baseConfig, 'modules')
  })
}

function getComEntryConfig() {
  return Object.assign(baseConfig, {
    input: resolvePathFromRoot('src/index.js'),
    output: [
      {
      file: resolvePathFromRoot(LIB + '/index.js'),
      format: 'cjs'
    },
    {
      file: resolvePathFromRoot(ESMODULE + '/index.js'),
      format: 'es'
    }
  ],
  })
}


exports.getComEntryConfig = getComEntryConfig
exports.getCompConfig = getCompConfig
exports.getUmdConfig = getUmdConfig
