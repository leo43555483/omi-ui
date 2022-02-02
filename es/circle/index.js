import Circle from './src/index.vue.js';
export { default } from './src/index.vue.js';

Circle.install = function (Vue) {
  Vue.component(Circle.name, Circle);
};
