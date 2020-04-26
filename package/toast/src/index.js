import Vue from 'vue';
import VueToast from './toast';
import toastType from './toast-type';
import { isObject, isString } from '../../../src/utils/shared';
import createInstance from '../../../src/utils/createInstance';

const isServer = () => Vue.prototype.$isServer;
const DEFAULT_OPTION = {
  type: 'text',
  icon: '',
  content: '',
  durations: 2000,
  clickClose: false,
  noScroll: true,
  onClose: () => {},
  onOpen: () => {},
};
function getOption(opt) {
  if (isObject(opt)) return opt;
  if (isString(opt)) return { content: opt };
  return { contente: '' };
}

const creator = createInstance({
  VueComponent: VueToast,
  defaultOption: DEFAULT_OPTION,
  replacement: false,
  appendToBody: true,
});
const Toast = creator((
  getInstance,
  customOptions,
  typeOtionCache,
  zIndex,
) => (opt) => {
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
  toast.onClose = () => {
    clearTimeout(toast.timer);
    option.onClose(toast);
    Toast.removeInstance(toast);
  };
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
});

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
