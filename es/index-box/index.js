import IndexBox from './src/index.vue.js';
export { default } from './src/index.vue.js';

IndexBox.install = function (Vue) {
  Vue.component(IndexBox.name, IndexBox);
};
