import Switch from './src/index.vue.js';
export { default } from './src/index.vue.js';

Switch.install = function (Vue) {
  Vue.component(Switch.name, Switch);
};
