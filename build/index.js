
const chalk = require('chalk')
const rollup = require('rollup')
const {spawn} = require('child_process')
const { getCompConfig, getUmdConfig} = require('./rollup.conf')
const {clean, resolvePathFromRoot, setEnvironment, setPackageVersion, getPackageVersion} = require('./utils')

const version = require('../package.json').version
function buildLibUmd() {
  setEnvironment('lib')
  return genRollupBuild(getUmdConfig(), 'umd入口.')
}

function buildComponents() {
  const entryPath = resolvePathFromRoot('src/index.js')
  return genRollupBuild(getCompConfig(entryPath), '组件')
}


async function genRollupBuild(option, name) {
  try {
    console.log(chalk.green('🔥开始构建' + name))
    const {output, ...input } = option
    const bundle = await rollup.rollup(input)
    if(Array.isArray(output)) {
      await Promise.all(output.map(async option => {
        try {
          return await bundle.write(option)
        } catch (error) {
          console.error(error)
        }
      }))
    } else {
      await bundle.write(output)
    }

    console.log(chalk.green('🔥✨'+ name +'构建成功'))
  } catch (err) {
    console.log(chalk.red('❌'+ name +'构建失败!'))
    console.error(err)
  }
}
async function buildStyle() {
  return new Promise((resolve,reject) => {
    const cmdFile = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    const subProcess = spawn(cmdFile,['run', 'build:style'], {stdio: 'inherit'})
    subProcess.on('close', code => {
      if(code !== 0) reject(new Error('style building failed.'))
      resolve(code)
    })
  })
}

function logFinish() {
  console.log('\n')
  console.log(chalk.yellowBright('🔥🚀 - 构建完成 success!\n'))
  console.log(chalk.yellowBright('version:' + getPackageVersion()))
}
async function build() {
  try {
    await clean('lib')
    await clean('es')
    setPackageVersion(version)
    await buildLibUmd()
    await buildComponents()
    await buildStyle()
    logFinish()
  } catch (error) {
    console.error(error)
  }

}

build()
