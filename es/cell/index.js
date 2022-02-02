import Cell from './src/index.vue.js';
export { default } from './src/index.vue.js';

Cell.install = function (Vue) {
  Vue.component(Cell.name, Cell);
};
