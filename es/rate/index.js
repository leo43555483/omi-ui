import Rate from './src/index.vue.js';
export { default } from './src/index.vue.js';

Rate.install = function (Vue) {
  Vue.component(Rate.name, Rate);
};
