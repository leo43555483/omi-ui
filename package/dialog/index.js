import Dialog from './src';

Dialog.install = function (Vue) {
  Vue.prototype.$dialog = Dialog;
  Vue.component(Dialog.Component.name, Dialog);
};
export default Dialog;
