export function oneOf(val, expection) {
  if (!Array.isArray(expection)) {
    return val === expection;
  }
  return expection.some((item) => val === item);
}
export function isKorean(text) {
  const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
  return reg.test(text);
}

export function isFunction(f) {
  return typeof f === 'function';
}
export function getValueByName(model, name) {
  const keys = name.split('.');
  if (keys.length === 1) return model[name];
  let temp = model;
  for (const key of keys) {
    if (key in temp) {
      temp = temp[key];
    } else {
      throw new Error('please transfer a valid prop path to form item!');
    }
    break;
  }
  return temp;
}
export function createClassMap(prefix, classNames) {
  if (typeof classNames === 'string') return { [classNames]: `${prefix}${classNames}` };
  if (Array.isArray(classNames)) {
    return classNames.reduce((map, className) => {
      // eslint-disable-next-line no-param-reassign
      map[className] = `${prefix}${className}`;
      return map;
    }, {});
  }
  return null;
}
export function getSizeString(string) {
  if (string === null) return [];
  return /^\d+/.exec(string);
}
export function isObject(value) {
  if (value === null) return false;
  console.log('this.strokeColor', Object.prototype.toString.call(value), value);
  return Object.prototype.toString.call(value) === '[object Object]';
}
