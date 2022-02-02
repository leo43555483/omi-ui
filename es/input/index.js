import Input from './src/index.vue.js';
export { default } from './src/index.vue.js';

Input.install = function (Vue) {
  Vue.component(Input.name, Input);
};
