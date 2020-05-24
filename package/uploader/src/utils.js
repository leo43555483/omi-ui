export function parseFile(file, fileType) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (fileType === 'file') {
      resolve();
      return;
    }
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = () => {
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

export function isImage(file) {
  if (file.file && file.file.type) {
    return file.file.type.indexOf('image') >= 0;
  }
  const imgMime = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  if (file.url && imgMime.test(file.url)) return true;
  return false;
}
