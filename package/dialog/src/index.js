import Vue from 'vue';
import VueDialog from './Dialog';
import createInstance from '../../../src/utils/createInstance';
import dialogType from './dialog-type';
import {
  isFunction, isPromise, isString, isObject,
} from '../../../src/utils/shared';

const isServer = () => Vue.prototype.$isServer;
const [alert] = dialogType;
const DEFAULT_OPTION = {
  type: alert,
  value: false,
  title: '',
  content: '',
  cancelText: '',
  confirmText: '',
  showCancel: false,
  showConfirm: true,
  onConfirm: () => {},
  onCancel: () => {},
};
const typeDefaultOption = {
  alert: {},
  confirm: {
    type: 'confirm',
    showCancel: true,
  },
  prompt: {
    type: 'prompt',
    showCancel: true,
  },
};
const getOption = (title, content) => {
  const opt = {};
  if (isString(title)) opt.title = title;
  if (isString(content)) opt.content = content;
  return opt;
};

const creator = createInstance({
  VueComponent: VueDialog,
  defaultOption: DEFAULT_OPTION,
  banMultiple: true,
});
const Dialog = creator((getInstance, customOptions, typeOtionCache) => (opt) => {
  if (isServer()) return {};
  const dialog = getInstance();
  const type = (opt && opt.type) || customOptions.type;
  const option = {
    ...customOptions,
    ...typeDefaultOption[type],
    ...typeOtionCache[type],
    ...opt,
  };
  Object.assign(dialog, option);

  const { onCancel, onConfirm } = dialog;
  dialog.$on('cancel', (e) => {
    if (isFunction(onCancel)) onCancel(e);
  });
  dialog.$on('confirm', (...args) => {
    const promise = onConfirm(...args);
    if (isPromise(promise)) {
      promise.then(() => dialog.close());
    } else {
      dialog.close();
    }
  });
  dialog.value = true;
  return dialog;
});
Dialog.alert = (title, content) => {
  if (isObject(title)) {
    Dialog(title);
  } else {
    Dialog({
      ...getOption(title, content),
    });
  }
};

Dialog.prompt = (title, content) => {
  if (isObject(title)) {
    Dialog({
      ...typeDefaultOption.prompt,
      ...title,
    });
  } else {
    Dialog({
      ...typeDefaultOption.prompt,
      ...getOption(title, content),
    });
  }
};
Dialog.confirm = (title, content) => {
  if (isObject(title)) {
    Dialog({
      ...typeDefaultOption.confirm,
      ...title,
    });
  } else {
    Dialog({
      ...typeDefaultOption.confirm,
      ...getOption(title, content),
    });
  }
};
Dialog.Component = VueDialog;
export default Dialog;
