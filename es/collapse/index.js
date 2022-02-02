import Collapse from './src/index.vue.js';
export { default } from './src/index.vue.js';

Collapse.install = function (Vue) {
  Vue.component(Collapse.name, Collapse);
};
