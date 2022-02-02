import Badge from './src/index.vue.js';
export { default } from './src/index.vue.js';

Badge.install = function (Vue) {
  Vue.component(Badge.name, Badge);
};
