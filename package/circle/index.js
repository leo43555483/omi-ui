import Circle from './src/index.vue';

Circle.install = function (Vue) {
  Vue.component(Circle.name, Circle);
};
export default Circle;
