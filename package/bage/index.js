import Bage from './src/index.vue';

Bage.install = function (Vue) {
  Vue.component(Bage.name, Bage);
};
export default Bage;
