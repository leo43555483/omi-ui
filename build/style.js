const {exec} = require('child_process')
const chalk = require('chalk')
const {resolvePathFromRoot} = require('./utils')


function complier(task = '') {
  return new Promise((resolve, reject) =>{
    if(!task) {
      throw new TypeError('需要传入构建类型.')
    }
    const gulpfile = resolvePathFromRoot('build/gulpfile.style.js')
    exec(`gulp ${task} --gulpfile ${gulpfile}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject()
      }

      if(stderr) {
        console.error(stderr)
        reject()
      }
      if(stdout) {
        console.log(stdout)
      }
      resolve()
    })
  })

}

async function buildLibStyleEntry() {
  try {
    console.log(chalk.yellowBright('\n🔥开始构建样式入口文件.'))
    await complier('buildEntry')
    console.log(chalk.green('✨样式入口文件构建成功.'))
  } catch (error) {

  }

}

async function buildComStyle() {
  try {
    console.log(chalk.yellowBright('\n🔥开始构建组件样式文件.'))
    await complier('buildComponents')
    console.log(chalk.green('✨建组件样式文件构建成功.'))
  } catch (error) {
  }

}
async function build() {
  try {
    await buildLibStyleEntry()
    await buildComStyle()
  } catch (error) {

  }

}

build()
