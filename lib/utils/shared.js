'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function isArray(value) {
  return Array.isArray(value);
}
function oneOf(val, expection) {
  if (!isArray(expection)) {
    return val === expection;
  }

  return expection.some(function (item) {
    return val === item;
  });
}
function isKorean(text) {
  var reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
  return reg.test(text);
}
function isFunction(f) {
  return typeof f === 'function';
}
function getValueByName(model, name) {
  var keys = name.split('.');
  if (keys.length === 1) return model[name];
  var temp = model;

  for (var _iterator = _createForOfIteratorHelperLoose(keys), _step; !(_step = _iterator()).done;) {
    var key = _step.value;

    if (key in temp) {
      temp = temp[key];
    } else {
      throw new Error('please transfer a valid prop path to form item!');
    }

    break;
  }

  return temp;
}
function createClassMap(prefix, classNames) {
  var _ref;

  if (typeof classNames === 'string') return _ref = {}, _ref[classNames] = "" + prefix + classNames, _ref;

  if (isArray(classNames)) {
    return classNames.reduce(function (map, className) {
      // eslint-disable-next-line no-param-reassign
      map[className] = "" + prefix + className;
      return map;
    }, {});
  }

  return null;
}
function getSizeString(string) {
  if (string === null) return [];
  return /^\d+/.exec(string);
}
function isObject(value) {
  if (value === null) return false;
  return Object.prototype.toString.call(value) === '[object Object]';
}
function isString(value) {
  return typeof value === 'string';
}
function throttle(fn, delay) {
  if (delay === void 0) {
    delay = 16;
  }

  var pre = 0;
  var timer = null;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var cur = Date.now();
    var remaining = delay - (cur - pre);

    if (remaining <= 0) {
      fn.apply(this, args);
      pre = Date.now();
    } else {
      timer = setTimeout(function () {
        clearTimeout(timer);
        fn.apply(_this, args);
      }, remaining);
    }
  };
}
function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}
function isPromise(fn) {
  return fn instanceof Promise;
}
function isNumber(value) {
  return typeof value === 'number';
}
function unDef(value) {
  return value === null || value === undefined || value === '';
}
function getRange(value, max, min) {
  if (unDef(max) || unDef(min)) return value;
  var floor = Math.max(min, value);
  return Math.min(floor, max);
}
function getUid() {
  var uid = 0;
  return function (prex, reset) {
    if (reset) uid = 0;
    uid += 1;
    return prex + "-" + uid;
  };
}
function isUnitString(str) {
  if (!isString(str) || unDef(str)) return false;
  return /^\d+(px|rem|%|vw|em|vh|vmin|vmax)$/g.test(str);
}
function getCharacter() {
  var list = [];

  var _char = 'A'.charCodeAt(); // eslint-disable-next-line no-plusplus


  for (var i = 0; i < 26; i++) {
    list.push(String.fromCharCode(_char + i));
  }

  return list;
}
function noop() {}
var isServer = Vue__default["default"].prototype.$isServer;

exports.createClassMap = createClassMap;
exports.getCharacter = getCharacter;
exports.getRange = getRange;
exports.getSizeString = getSizeString;
exports.getUid = getUid;
exports.getValueByName = getValueByName;
exports.isArray = isArray;
exports.isDate = isDate;
exports.isFunction = isFunction;
exports.isKorean = isKorean;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isPromise = isPromise;
exports.isServer = isServer;
exports.isString = isString;
exports.isUnitString = isUnitString;
exports.noop = noop;
exports.oneOf = oneOf;
exports.throttle = throttle;
exports.unDef = unDef;
