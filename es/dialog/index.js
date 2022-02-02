import Dialog from './src/index.js';
export { default } from './src/index.js';

Dialog.install = function (Vue) {
  Vue.prototype.$dialog = Dialog;
  Vue.component(Dialog.Component.name, Dialog);
};
