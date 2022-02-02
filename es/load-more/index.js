import LoadMore from './src/index.vue.js';
export { default } from './src/index.vue.js';

LoadMore.install = function (Vue) {
  Vue.component(LoadMore.name, LoadMore);
};
