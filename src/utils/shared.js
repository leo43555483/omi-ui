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
