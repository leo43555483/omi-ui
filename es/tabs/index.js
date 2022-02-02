import Tabs from './src/index.vue.js';
export { default } from './src/index.vue.js';

Tabs.install = function (Vue) {
  Vue.component(Tabs.name, Tabs);
};
