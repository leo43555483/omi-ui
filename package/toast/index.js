import Toast from './src';

Toast.install = function (Vue) {
  Vue.component(Toast.name, Toast);
};
export default Toast;
