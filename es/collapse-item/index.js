import CollapseItem from './src/index.vue.js';
export { default } from './src/index.vue.js';

CollapseItem.install = function (Vue) {
  Vue.component(CollapseItem.name, CollapseItem);
};
