import Toast from './src';

Toast.install = function (Vue) {
  Vue.prototype.$toast = Toast;
  Vue.component(Toast.Component.name, Toast);
};
export default Toast;
