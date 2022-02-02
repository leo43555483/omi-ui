import Search from './src/index.vue.js';
export { default } from './src/index.vue.js';

Search.install = function (Vue) {
  Vue.component(Search.name, Search);
};
