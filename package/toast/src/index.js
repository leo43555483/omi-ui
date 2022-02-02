import VueToast from './toast';
import toastType from './toast-type';
import {
  isObject, isString, isServer, isFunction,
} from '../../utils/shared';
import createInstance from '../../utils/createInstance';

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
  if (isServer) return {};
  const toast = getInstance();
  const type = opt.type || customOptions.type;
  const option = {
    ...customOptions,
    ...typeOtionCache[type],
    ...getOption(opt),
  };
  Object.assign(toast, option);
  if (!isFunction(toast.close)) {
    toast.close = () => {
      Object.assign(toast, { value: false });
    };
  }
  if (!isFunction(toast.onClose)) {
    toast.onClose = () => {
      clearTimeout(toast.timer);
      Toast.removeInstance(toast);
    };
  }

  Object.assign(toast, { value: true });
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
Toast.Component = VueToast;
export default Toast;
