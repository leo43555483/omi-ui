export function isArray(value) {
  return Array.isArray(value);
}

export function oneOf(val, expection) {
  if (!isArray(expection)) {
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
  if (isArray(classNames)) {
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
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function isString(value) {
  return typeof value === 'string';
}

export function throttle(fn, delay = 16) {
  let pre = 0;
  let timer = null;
  return function (...args) {
    const cur = Date.now();
    const remaining = delay - (cur - pre);
    if (remaining <= 0) {
      fn.apply(this, args);
      pre = Date.now();
    } else {
      timer = setTimeout(() => {
        clearTimeout(timer);
        fn.apply(this, args);
      }, remaining);
    }
  };
}

export function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}
export function isPromise(fn) {
  return fn instanceof Promise;
}
export function isNumber(value) {
  return typeof value === 'number';
}

export function unDef(value) {
  return value === null || value === undefined || value === '';
}

export function getRange(value, max, min) {
  if (unDef(max) || unDef(min)) return value;
  const floor = Math.max(min, value);
  return Math.min(floor, max);
}

export function getUid() {
  let uid = 0;
  return function (prex, reset) {
    if (reset) uid = 0;
    uid += 1;
    return `${prex}-${uid}`;
  };
}

export function clone(object) {
  const parents = [];
  const children = [];
  const { hasOwnProperty } = Object.prototype;
  const cloneObject = (parent) => {
    if (parent === null) return null;
    if (typeof parent !== 'object') return parent;

    let child; let proto;

    if (isArray(parent)) {
      child = [];
    } else {
      proto = Object.getPrototypeOf(parent);
      child = Object.create(proto);
    }
    const index = parents.indexOf(parent);

    if (index !== -1) {
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (const key in parent) {
      if (hasOwnProperty.call(parent, key)) {
        child[key] = cloneObject(parent[key]);
      }
    }

    return child;
  };
  return cloneObject(object);
}
