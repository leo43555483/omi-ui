'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toast = require('./toast.js');
var toastType = require('./toast-type.js');
var shared = require('../../utils/shared.js');
var createInstance = require('../../utils/createInstance.js');

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var DEFAULT_OPTION = {
  type: 'text',
  icon: '',
  content: '',
  durations: 2000,
  clickClose: false,
  noScroll: true,
  onClose: function onClose() {},
  onOpen: function onOpen() {}
};

function getOption(opt) {
  if (shared.isObject(opt)) return opt;
  if (shared.isString(opt)) return {
    content: opt
  };
  return {
    contente: ''
  };
}

var creator = createInstance["default"]({
  VueComponent: toast["default"],
  defaultOption: DEFAULT_OPTION,
  replacement: false,
  appendToBody: true
});
var Toast = creator(function (getInstance, customOptions, typeOtionCache, zIndex) {
  return function (opt) {
    if (shared.isServer) return {};
    var toast = getInstance();
    var type = opt.type || customOptions.type;

    var option = _extends({}, customOptions, typeOtionCache[type], getOption(opt));

    Object.assign(toast, option);

    if (!shared.isFunction(toast.close)) {
      toast.close = function () {
        Object.assign(toast, {
          value: false
        });
      };
    }

    if (!shared.isFunction(toast.onClose)) {
      toast.onClose = function () {
        clearTimeout(toast.timer);
        Toast.removeInstance(toast);
      };
    }

    Object.assign(toast, {
      value: true
    });
    toast.setZindex(zIndex);
    if (toast.timer) clearTimeout(toast.timer);
    var durations = option.durations;

    if (durations > 0) {
      toast.timer = setTimeout(function () {
        clearTimeout(toast.timer);
        toast.close();
      }, durations);
    }

    return toast;
  };
});
toastType["default"].forEach(function (method) {
  Toast[method] = function (opt) {
    var option = _extends({
      type: method
    }, getOption(opt));

    return Toast(option);
  };
});
Toast.Component = toast["default"];
var Toast$1 = Toast;

exports["default"] = Toast$1;
