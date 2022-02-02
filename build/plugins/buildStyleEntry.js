const fse = require('fs-extra')
const fs = require('fs')
const path = require('path')
const {resolvePathFromRoot, ifFileExsit} = require('../utils')
const {ESMODULE, LIB} = require('../constant')

const cacheStyles = {}
// const componentsCache = {}

// function genCompMap(map) {
//   const {components} = require('../../lib/src')
//   if(!components) return
//   Object.keys(components).forEach(key =>{
//     map[key] = false
//   })
// }
// genCompMap(componentsCache)

function getModuleDeclare(buildMode,uri) {
  if(buildMode === ESMODULE) {
    return `import '${uri}'`
  } else {
    return `require('${uri}')`
  }
}

function getEntryFile(buildMode, styleFile, dir) {
  const styleFilePath = `./${styleFile}`
  // if(!ifFileExsit(`${dir}/${styleFile}`)) return ''
  if(!buildMode) return getModuleDeclare(buildMode, styleFilePath)
  return ""+getModuleDeclare(buildMode,'../base.css')+"\n"
    +""+getModuleDeclare(buildMode,`./${styleFile}`)+"\n"
}
function buildEntry(buildMode,styleFile, filePath) {
  try {
    const outputPath = filePath + '/index.js'
    const content = getEntryFile(buildMode, styleFile, filePath)
    fse.outputFileSync(outputPath,content)
    const stat = fs.statSync(outputPath)
    return stat.size

  } catch (error) {
    console.error(error)
  }
}

function getLibRootFile(buildMode) {
  return buildMode === ESMODULE ? ESMODULE : LIB
}

exports.countTotal = function (name = '') {
  const map = name ? cacheStyles[name] : cacheStyles
  return Object.keys(map).length
}

exports.genStyleEntry = function(buildMode = '', isRootEntry = false) {
  if(!(buildMode in cacheStyles)) {
    cacheStyles[buildMode] = {}
  }
  return function(file) {
    const filename = path.basename(file.path, '.css')
    const baseDir = getLibRootFile(buildMode) + '/style/'
    let base = resolvePathFromRoot(baseDir)
    base = isRootEntry ? base : base + filename
    if(isRootEntry) {
      buildEntry(false,filename + '.css', base)
    } else {
      buildEntry(buildMode,filename + '.css', base)
    }
    const targetCss = `${base}/${filename}.css`
    if(!(targetCss in cacheStyles[buildMode])) {
      if(filename === 'address-picker.scss') {
        console.log('file.path', file)
      }
      console.log(`🚀[style:${buildMode}] - file:${targetCss}`)
      cacheStyles[buildMode][targetCss] = true
    }
    return base
  }
}
