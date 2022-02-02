import VueToast from './toast.js';
import toastType from './toast-type.js';
import { isServer, isFunction, isObject, isString } from '../../utils/shared.js';
import createInstance from '../../utils/createInstance.js';

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
  if (isObject(opt)) return opt;
  if (isString(opt)) return {
    content: opt
  };
  return {
    contente: ''
  };
}

var creator = createInstance({
  VueComponent: VueToast,
  defaultOption: DEFAULT_OPTION,
  replacement: false,
  appendToBody: true
});
var Toast = creator(function (getInstance, customOptions, typeOtionCache, zIndex) {
  return function (opt) {
    if (isServer) return {};
    var toast = getInstance();
    var type = opt.type || customOptions.type;

    var option = _extends({}, customOptions, typeOtionCache[type], getOption(opt));

    Object.assign(toast, option);

    if (!isFunction(toast.close)) {
      toast.close = function () {
        Object.assign(toast, {
          value: false
        });
      };
    }

    if (!isFunction(toast.onClose)) {
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
toastType.forEach(function (method) {
  Toast[method] = function (opt) {
    var option = _extends({
      type: method
    }, getOption(opt));

    return Toast(option);
  };
});
Toast.Component = VueToast;
var Toast$1 = Toast;

export { Toast$1 as default };
