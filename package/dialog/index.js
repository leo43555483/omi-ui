import Dialog from './src';

Dialog.install = function (Vue) {
  Vue.component(Dialog.Component.name, Dialog.Component);
};
export default Dialog;
