const through2 = require('through2')
function genBundle(file) {
  if(file && typeof file === 'string') {
    const banner = "@import '../common/index.scss';\n"+
                 "@import '../base.scss';\n\n"
    const result = banner + file
    return Buffer.from(result)
  }
  return file

}

module.exports = function() {
  return through2.obj((file = null,_,cb) => {
    if (file.isBuffer()) {

      file.contents = genBundle(file.contents.toString()) || null
    }
    cb(null,file)
  })
}
