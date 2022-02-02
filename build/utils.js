const path = require('path')
const rm = require('rimraf')
const fs = require('fs')
const chalk = require('chalk')
const glob = require('glob')
const {ENTRY_FILE_NAME} = require('../config')
function resolvePathFromRoot(dir) {
  return path.join(__dirname, '..', dir)
}

exports.resolvePathFromRoot = resolvePathFromRoot

exports.clean = function (dir) {
  return new Promise((resolve,reject) => {
    rm(resolvePathFromRoot(dir), (err) => {
      if(err) {
        reject(err)
      }
      resolve()
    })
  })
}

exports.buildLog = function(name = '',resolve,reject) {
  return (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      console.log(chalk.red('❌❌❌'+ name +'构建失败!'))
      reject()
      return;
    }

    const info = stats.toJson()

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      hildren: false,
      chunks: false,
      errorDetails: true,
      chunkModules: false

    }) + '\n\n')

    if (err || stats.hasErrors()) {
      console.log(chalk.red('❌❌❌'+ name +'构建失败!'))
      reject()
      return
    }
    if(stats.hasWarnings()) {
      console.log(info.warnings)
    }
    console.log(chalk.green('🔥🔥✨✨'+ name +'构建成功'))
    resolve()
  }

}
function isScript(dir) {
  const {ext} = path.parse(dir)
  return ['.js', '.ts', 'jsx', 'vue'].includes(ext)
}
exports.isScript = isScript

exports.setEnvironment = function(env) {
  process.env.NODE_ENV = env
}


function isDirectory(dir) {
  return fs.statSync(dir).isDirectory()
}

function parseDirToArry(dir) {
  const rootDir = dir.split('/').filter(t => t !== '')
  return rootDir
}
function isEntryFile(dir) {
  return parseDirToArry(dir).includes(ENTRY_FILE_NAME)
}
function getPathFromDir(globDir, filePath) {
  const [rootDir] = parseDirToArry(globDir)
  const rootIndex = filePath.indexOf(rootDir)
  if(rootIndex === -1) {
    throw new Error(filePath+'下不存在'+globDir+'目录')
  }
  const subDir = filePath.slice(rootIndex + rootDir.length)
  const outputPath = subDir.replace(/^\/|\.js/g, '')
  const hasEntry = isEntryFile(subDir)
  return {
    hasEntry,
    outputPath
  }
}

function findScriptFile(globDir) {
  let list = []
  const files = glob.sync(globDir)
  const entryPath = files.find(t => getPathFromDir(globDir, t).hasEntry)

  if(entryPath) {
    list.push(entryPath)
  } else {
    files.forEach((item) => {

      if(isDirectory(item)) {
        const files = findScriptFile(item + '/*')
        list = list.concat(files)
      } else if(isScript(item)){
        list.push(item)
      }
    })
  }
  return list
}

//返回需要输出的文件
exports.globBySync = function(globDir) {
  const files = findScriptFile(resolvePathFromRoot(globDir))
  const contexts = files.map(item => {
    return {
      dir:item,
      ...getPathFromDir(globDir, item)
    }
  })
  return {
    origin: files,
    contexts
  }
}
exports.getBaseName = function(filePath) {
  return path.parse(filePath).name
}
exports.getLastDir = function(fileir) {
  const {parse} = path
  return parse(parse(fileir).dir).base
}
exports.setPackageVersion = function(version = '') {
  process.env.PACKAGE_VERSION = version
}
exports.getPackageVersion = function () {
  return process.env.PACKAGE_VERSION || ''
}

exports.formatBytes = function(bytes){
  if (bytes === 0) return '0 Byte'
  const k = 1000;
  const dm = 3;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

exports.ifFileExsit = function(dir) {
  return fs.existsSync(dir)
}

function toUpper(str) {
  return str.replace(/^\w/, p => p.toUpperCase())
}
exports.toUpperCamel = function(str) {
  let result = ''
  const [p1,p2] = str.split('-')
  result = toUpper(p1)
  if(p2) {
    result += toUpper(p2)
  }
  return result
}
