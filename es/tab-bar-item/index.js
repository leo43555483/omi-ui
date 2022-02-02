import Tabbar from './src/index.vue.js';
export { default } from './src/index.vue.js';

Tabbar.install = function (Vue) {
  Vue.component(Tabbar.name, Tabbar);
};
