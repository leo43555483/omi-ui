function parseFile(file, fileType) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    if (fileType === 'file') {
      resolve();
      return;
    }

    reader.onload = function (e) {
      resolve(e.target.result);
    };

    reader.onerror = function () {
      reader.abort();
      reject(file);
    };

    if (fileType === 'dataUrl') {
      reader.readAsDataURL(file);
    }

    if (fileType === 'text') {
      reader.readAsText(file);
    }
  });
}
function isImage(file) {
  if (file.file && file.file.type) {
    return file.file.type.indexOf('image') >= 0;
  }

  var imgMime = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  if (file.url && imgMime.test(file.url)) return true;
  return false;
}

export { isImage, parseFile };
