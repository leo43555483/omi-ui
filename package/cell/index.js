import Cell from './src/index.vue';

Cell.install = function (Vue) {
  Vue.component(Cell.name, Cell);
};
export default Cell;
