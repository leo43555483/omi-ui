import Toast from './src/index.js';
export { default } from './src/index.js';

Toast.install = function (Vue) {
  Vue.prototype.$toast = Toast;
  Vue.component(Toast.Component.name, Toast);
};
