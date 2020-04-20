import Vue from 'vue';
import VueToast from './toast';
import toastType from './toast-type';
import { isObject, isString, isFunction } from '../../../src/utils/shared';
import { remoteElement } from '../../../src/utils/dom';

const isServer = () => Vue.prototype.$isServer;
const DEFAULT_OPTION = {
  type: 'text',
  icon: '',
  content: '',
  durations: 2000,
  clickClose: false,
  noScroll: true,
  onClose: null,
  onOpen: null,
};
let stack = [];
let customOptions = { ...DEFAULT_OPTION };
let typeOtionCache = {};
let isSingle = true;
let zIndex = 0;
function getOption(opt, type) {
  if (isObject(opt)) return opt;
  if (isString(opt)) return { content: opt };
  throw new Error(`[omi ui]: Expect valid arguments in Toast.${type}`);
}
function getInstance() {
  const instance = stack[stack.length - 1];
  if (instance && isSingle) return instance;
  const el = document.createElement('div');
  const toast = new (Vue.extend(VueToast))({ el });
  toast.$on('input', (show) => { toast.value = show; });
  document.body.appendChild(toast.$el);
  stack.push(toast);
  zIndex += 1;
  return toast;
}
function onClose(toast, option) {
  return () => {
    clearTimeout(toast.timer);
    if (isFunction(option.onClose)) {
      option.onClose(toast);
    }
    if (!isSingle && !isServer()) {
      stack = stack.filter((item) => item !== toast);
      toast.$destroy();
      remoteElement(toast.$el);
    }
  };
}
function onOpen(toast, option) {
  return () => {
    if (isFunction(option.onOpen)) {
      option.onOpen(toast);
    }
  };
}
function on(instance, event, cb) {
  instance.$on(event, cb);
}
function Toast(opt) {
  if (isServer()) return {};
  const toast = getInstance();
  const type = opt.type || customOptions.type;
  const option = {
    ...customOptions,
    ...typeOtionCache[type],
    ...getOption(opt),
  };
  Object.assign(toast, option);
  toast.close = () => { toast.value = false; };
  on(toast, 'close', onClose(toast, option));
  on(toast, 'open', onOpen(toast, option));
  toast.value = true;
  toast.setZindex(zIndex);
  if (toast.timer) clearTimeout(toast.timer);
  const { durations } = option;
  if (durations > 0) {
    toast.timer = setTimeout(() => {
      clearTimeout(toast.timer);
      toast.close();
    }, durations);
  }
  return toast;
}
Toast.setOptions = (type, opt) => {
  if (isObject(type)) {
    customOptions = { ...customOptions, ...type };
    typeOtionCache = {};
    return;
  }
  if (isString(type)) {
    typeOtionCache[type] = opt;
    return;
  }
  throw new Error('[omi ui]: Expect valid arguments in Toast.setOption');
};
Toast.single = (single) => {
  isSingle = single;
};
Toast.close = () => {
  if (isSingle) stack[0].close();
  else {
    const toast = stack.shift();
    toast.close();
  }
};
Toast.closeAll = () => {
  stack.forEach((toast) => toast.close());
};

toastType.forEach((method) => {
  Toast[method] = (opt) => {
    const option = {
      type: method,
      ...getOption(opt, method),
    };
    return Toast(option);
  };
});
export default Toast;
