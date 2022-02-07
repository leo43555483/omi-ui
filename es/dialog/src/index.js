import VueDialog from './Dialog.js';
import createInstance from '../../utils/createInstance.js';
import dialogType from './dialog-type.js';
import { isServer, isObject, isString } from '../../utils/shared.js';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var alert = dialogType[0];
var DEFAULT_OPTION = {
  type: alert,
  value: false,
  title: '',
  content: '',
  cancelText: '',
  confirmText: '',
  showCancel: false,
  showConfirm: true,
  onConfirm: function onConfirm() {},
  onCancel: function onCancel() {}
};
var typeDefaultOption = {
  alert: {},
  confirm: {
    type: 'confirm',
    showCancel: true
  },
  prompt: {
    type: 'prompt',
    showCancel: true
  }
};

var getOption = function getOption(title, content) {
  var opt = {};
  if (isString(title)) opt.title = title;
  if (isString(content)) opt.content = content;
  return opt;
};

var creator = createInstance({
  VueComponent: VueDialog,
  defaultOption: DEFAULT_OPTION,
  banMultiple: true
});
var Dialog = creator(function (getInstance, customOptions, typeOtionCache) {
  return function (opt) {
    if (isServer) return {};
    var dialog = getInstance();
    var type = opt && opt.type || customOptions.type;

    var option = _extends({}, customOptions, typeDefaultOption[type], typeOtionCache[type], opt);

    Object.assign(dialog, option);
    dialog.value = true;
    return dialog;
  };
});

Dialog.alert = function (title, content) {
  if (isObject(title)) {
    Dialog(title);
  } else {
    Dialog(_extends({}, getOption(title, content)));
  }
};

Dialog.prompt = function (title, content) {
  if (isObject(title)) {
    Dialog(_extends({}, typeDefaultOption.prompt, title));
  } else {
    Dialog(_extends({}, typeDefaultOption.prompt, getOption(title, content)));
  }
};

Dialog.confirm = function (title, content) {
  if (isObject(title)) {
    Dialog(_extends({}, typeDefaultOption.confirm, title));
  } else {
    Dialog(_extends({}, typeDefaultOption.confirm, getOption(title, content)));
  }
};

Dialog.Component = VueDialog;

export { Dialog as default };
