const { series, src, dest } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const genStyleBundle = require('./plugins/gulpStyleBundle')
const {countTotal, genStyleEntry} = require('./plugins/buildStyleEntry')
const {resolvePathFromRoot} = require('./utils')
const {ESMODULE, LIB} = require('./constant')
const {browserslist} = require('../package.json')

function buildEntry(buildMode = LIB) {
  return function () {
    return src(resolvePathFromRoot('src/styles/index.scss'))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: browserslist,
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest(genStyleEntry(buildMode, true)))
  }

}

function buildComponents(buildMode = LIB) {
  return function() {
    const stylePath = resolvePathFromRoot('src/styles')
    const fileStream = src(stylePath + '/components/*.scss')
    return fileStream
      .pipe(genStyleBundle())
      .on('error', (error) => {console.error(error)})
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({
        overrideBrowserslist: browserslist,
        cascade: false
      }))
      .pipe(cssmin())
      .pipe(dest(genStyleEntry(buildMode)))
      .on('error', (error) => {console.error(error)})
      .on('finish', () => {
        console.log('\n----------------------')
        console.log(`构建数量: ${countTotal(buildMode)}\n`)
      });
  }
}
function buildBaseStyle(buildMode = LIB) {
  return function() {
    return src(resolvePathFromRoot('src/styles/common/index.scss'))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(rename({ extname:'.css',basename:'base'}))
    .pipe(dest(resolvePathFromRoot(buildMode + '/style')))
  }
}

function tasks(list = []) {
  const results = []
  for(let i = 0; i < list.length; ++i) {
    const task = list[i]
    results.push(task(LIB),task(ESMODULE))
  }
  return results
}


exports.buildEntry = series(...tasks([buildEntry, buildBaseStyle]))
exports.buildComponents = series(...tasks([buildComponents]))
