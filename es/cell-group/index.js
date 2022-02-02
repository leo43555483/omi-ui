import CellGrounp from './src/index.vue.js';
export { default } from './src/index.vue.js';

CellGrounp.install = function (Vue) {
  Vue.component(CellGrounp.name, CellGrounp);
};
