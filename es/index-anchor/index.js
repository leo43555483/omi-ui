import IndexAnchor from './src/index.vue.js';
export { default } from './src/index.vue.js';

IndexAnchor.install = function (Vue) {
  Vue.component(IndexAnchor.name, IndexAnchor);
};
